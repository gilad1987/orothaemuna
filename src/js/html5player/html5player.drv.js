var m;

(function () {

    function GtPlayerDirective(Audio5AudioService,PLAYER_EVENTS,$rootScope)
    {
        /**
         * Load Audio5js Library
         * @type {HTMLElement}
         */
        var tag = document.createElement('script');
        tag.src = '../lib/audio5.js';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var PLAYER_STATES = {
                stop:1,
                pause:2,
                play:3
        };

        var rootScopeBindPlayerEvents = false;

        function initBindEvents(scope,isolate)
        {
            if(!isolate && rootScopeBindPlayerEvents)return;

            var isRootScope = isolate ? false : true;

            if(isRootScope){
                rootScopeBindPlayerEvents = true;
            }

            function onChange(event, eventType,isIsolate){
                if(isIsolate && isRootScope){
                    return
                };
                scope.$broadcast(eventType,isRootScope,isIsolate);
            };

            scope.$on(PLAYER_EVENTS.change, onChange);
        }

        function updateProgressOnTimeUpdate(elem, duration, position, controller){
            var percent,
                positionPercent;

            duration = Math.round(duration);
            position = Math.round(position);

            percent = duration/100;
            positionPercent = Math.round( position / percent );

            if(controller.currentPositionPercent == positionPercent){
                return positionPercent;
            }

            elem.css('width',positionPercent+'%');

            return positionPercent;
        }

        var player = {
                path:null,
                state: PLAYER_EVENTS.stop,
                volume:1
        };

        var elements = [];

        return  {
            priority: 0,
            templateUrl: 'src/js/html5player/html5player.html', // in chase
            scope: {
                path: '@path',
                tracker: '=tracker',
                isolate: '@isolate'
            },
            controllerAs:'AudioCtrl',
            controller: ['$scope', '$element', '$attrs', function ctrl(scope, element, attrs) {

                var init = false,
                    _player,isolate;

                this.isolate = isolate = (typeof scope.isolate != 'undefined') ? Number(scope.isolate) : false;
                this.tracker = (typeof scope.tracker != 'undefined') ? Number(scope.tracker) : false;

                this.id=Math.random();

                function initEvent(){
                    Audio5AudioService.get().audio.on('timeupdate',function(){
                        scope.$emit(PLAYER_EVENTS.change, PLAYER_EVENTS.timeUpdate,isolate);
                    });
                    init = true;
                }

                _player = {
                    path:null,
                    state: PLAYER_EVENTS.stop,
                    volume:1
                };

                this.player = this.isolate ? _player : player;

                this.load = function(){
                    if(!init) initEvent();
                    if(this.player.path == scope.path) return;
                    scope.$emit(PLAYER_EVENTS.change,PLAYER_EVENTS.load, this.isolate);
                }

                this.play = function(){
                    scope.$emit(PLAYER_EVENTS.change,PLAYER_EVENTS.play, this.isolate);
                }

                this.stop = function(){
                    scope.$emit(PLAYER_EVENTS.change,PLAYER_EVENTS.stop, this.isolate);
                }

            }],

            link:function(scope, element, attrs, controller){

                var cache,
                    currentPositionPercent;

                element.attr('id','id_'+Math.random());

                cache = {
                    getProgressBar: (function(){
                        var elem;
                        elem = element.find('.gt-progress').attr('id',Math.random());
                        return function(){
                            return elem;
                        }
                    })()
                };

                function doPrevent(targetRootScope){
                    return controller.isolate && targetRootScope;
                }

                initBindEvents(controller.isolate ? scope : $rootScope ,controller.isolate);

                function onStop(event,targetRootScope){
                    if(doPrevent(targetRootScope)) return false;
                    Audio5AudioService.get().pause();
                }

                function onPlay(event,targetRootScope){
                    if(doPrevent(targetRootScope)) return false;
                    element.addClass('play');
                    Audio5AudioService.get().play();
                }

                function onLoad(event,targetRootScope){
                    if(controller.player.path == scope.path) return;
                    if(doPrevent(targetRootScope)) return false;
                    controller.player.path = scope.path;
                    Audio5AudioService.get().load(controller.player.path);
                }

                function onTimeUpdate(event,targetRootScope){
//                    if(doPrevent(targetRootScope)) return false;

                    var elem,
                        duration = Audio5AudioService.get().audio.audio.duration,
                        position = Audio5AudioService.get().audio.position;

                    for(var key in elements){
                        elem = elements[key].e.find('.gt-progress');
                        if((elements[key].c.isolate && targetRootScope) || (!elements[key].c.isolate && !targetRootScope)){
                            continue
                        }
                        elements[key].c.currentPositionPercent  = updateProgressOnTimeUpdate(elem, duration, position, elements[key].c);
                    }

                }

                scope.$on(PLAYER_EVENTS.stop,onStop);
                scope.$on(PLAYER_EVENTS.play,onPlay);
                scope.$on(PLAYER_EVENTS.load,onLoad);
                elements[controller.id]={
                    c:controller,
                    e:element,
                    i:controller.isolate
                };

                if(controller.tracker){
                    scope.$on(PLAYER_EVENTS.timeUpdate,onTimeUpdate);
                }
            }
        };
    }

    angular.module('html5player').directive('gtPlayer',['Audio5AudioService','PLAYER_EVENTS','$rootScope',GtPlayerDirective]);

})();
