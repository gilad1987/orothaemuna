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

            var isRootScope = !isolate;

            function onChange(event, eventType,isIsolate, ctrlId){
                if(isIsolate && isRootScope){
                    return
                };
                scope.$broadcast(eventType,isRootScope,isIsolate, ctrlId);
            };

            scope.$on(PLAYER_EVENTS.change, onChange);

            if(isRootScope){
                rootScopeBindPlayerEvents = true;
            }
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
                var _ctrl = this;

                function initEvent(){
                    Audio5AudioService.get().audio.on('timeupdate',function(){
                        scope.$emit(PLAYER_EVENTS.change, PLAYER_EVENTS.timeUpdate,isolate, _ctrl.id);
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
                    scope.$emit(PLAYER_EVENTS.change,PLAYER_EVENTS.load, this.isolate, _ctrl.id);
                }

                this.play = function(){
                    scope.$emit(PLAYER_EVENTS.change,PLAYER_EVENTS.play, this.isolate, _ctrl.id);
                }

                this.stop = function(){
                    scope.$emit(PLAYER_EVENTS.change,PLAYER_EVENTS.stop, this.isolate,_ctrl.id);
                }

            }],

            link:function(scope, element, attrs, controller){

                var cache,
                    currentPositionPercent;

                element.attr('id','id_'+controller.id);

                cache = {
                    getProgressBar: (function(){
                        var elem;
                        elem = element.find('.gt-progress').attr('id','gt_player_progress_'+controller.id);
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
                    element.removeClass('play');
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

                function onTimeUpdate(event,targetRootScope,isolate, targetCtrlId){
                    var elem,
                        duration = Audio5AudioService.get().audio.audio.duration,
                        position = Audio5AudioService.get().audio.position;

                    for(var key in elements){
                        elem = elements[key].DOMelem.find('.gt-progress');
                        if(   !elements[key].ctrl.tracker
//                            ||(!targetRootScope && elements[key].ctrl.id != targetCtrlId)
                            || (elements[key].ctrl.isolate && targetRootScope)
                            || (!elements[key].ctrl.isolate && !targetRootScope)){
                            continue
                        }
                        elements[key].ctrl.currentPositionPercent  = updateProgressOnTimeUpdate(elem, duration, position, elements[key].ctrl);
                    }

                }

                scope.$on(PLAYER_EVENTS.stop,onStop);
                scope.$on(PLAYER_EVENTS.play,onPlay);
                scope.$on(PLAYER_EVENTS.load,onLoad);
                elements[controller.id]={
                    ctrl:controller,
                    DOMelem:element
                };

                if(controller.tracker){
                    scope.$on(PLAYER_EVENTS.timeUpdate,onTimeUpdate);
                }

            }
        };
    }

    angular.module('html5player').directive('gtPlayer',['Audio5AudioService','PLAYER_EVENTS','$rootScope',GtPlayerDirective]);

})();
