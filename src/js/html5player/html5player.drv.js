(function () {

    function GtPlayerDirective(Audio5AudioService,PLAYER_EVENTS)
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
                STOP:1,
                PAUSE:2,
                PLAYER:3
        };

        function onPathChange(event, path){
            Audio5AudioService.get().load(path);
        }

        function onStop(){
            Audio5AudioService.get().pause();
        }

        function onPlay(){
            Audio5AudioService.get().play();
        }

        function onTimeUpdate(elem, duration, position, currentPositionPercent){
            var percent,
                positionPercent;

            duration = Math.round(duration);
            position = Math.round(position);

            percent = duration/100;
            positionPercent = Math.round( position / percent );

            if(currentPositionPercent == positionPercent){
                return positionPercent;
            }

            elem.css('width',positionPercent+'%');

            return positionPercent;
        }




        return  {
            priority: 0,
            templateUrl: 'src/js/html5player/html5player.html', // in chase
            scope: {
                path: '@path',
                tracker: '=tracker'
            },
            controllerAs:'AudioCtrl',
            controller: ['$scope', '$element', '$attrs', function ctrl(scope, element, attrs) {

                var cache = {
                    getProgress: (function(){
                        var elem;
                        elem = element.find('.gt-progress');
                        return function(){
                            return elem;
                        }
                    })()
                };

                var player = {
                    path:null,
                    state: PLAYER_EVENTS.stop,
                    volume:1
                };

                var subscribeOnReady = false,
                    currentProgressBarPositionPercent;

                scope.$on(PLAYER_EVENTS.changePath, onPathChange);
                scope.$on(PLAYER_EVENTS.stop,onStop);
                scope.$on(PLAYER_EVENTS.play,onPlay);

                if(scope.tracker){
                    scope.$on(PLAYER_EVENTS.timeUpdate,function(){
                        var elem = cache.getProgress(),
                            duration = Audio5AudioService.get().audio.audio.duration,
                            position = Audio5AudioService.get().audio.position;

                        currentProgressBarPositionPercent = onTimeUpdate.call(this, elem, duration, position, currentProgressBarPositionPercent);
                    });
                }

                if(!scope.tracker){
                    element.find('.gt-tracker').remove();
                }


                this.load = function(){
                    if(!subscribeOnReady){
                        Audio5AudioService.get().audio.on('timeupdate',function(){
                            scope.$emit(PLAYER_EVENTS.timeUpdate);
                        });
                    }
                    subscribeOnReady=true;
                    if(player.path == scope.path){
                        return;
                    }

                    player.path = scope.path;
                    scope.$emit(PLAYER_EVENTS.changePath,scope.path);
                }

                this.play = function(){
                    scope.$emit(PLAYER_EVENTS.play);
                }

                this.stop = function(){
                    scope.$emit(PLAYER_EVENTS.stop);
                }


            }],
            link:function(scope, element, attrs, controller){

            }
        };


    }

    angular.module('html5player').directive('gtPlayer',['Audio5AudioService','PLAYER_EVENTS',GtPlayerDirective]);

})();
