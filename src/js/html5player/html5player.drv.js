(function () {

    function GtPlayerDirective(Audio5AudioService)
    {
        /**
         * Load Audio5js Library
         * @type {HTMLElement}
         */
        var tag = document.createElement('script');
        tag.src = '../lib/audio5.js';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        function onPathChange(event, path){
            Audio5AudioService.get().load(path);
        }

        function onStop(){
            Audio5AudioService.get().pause();
        }

        function onPlay(){
            Audio5AudioService.get().play();
        }

        function onTimeUpdate(){

        }



        return  {
            priority: 0,
            templateUrl: 'src/js/html5player/html5player.html', // in chase
            scope: {
                path: '@path'
            },
            controllerAs:'AudioCtrl',
            controller: ['$scope', '$element', '$attrs', function ctrl(scope, element, attrs) {

                var cache = {
                    currentPath:null
                };

                var subscribeOnReady = false;

                scope.$on('Audio:changePath',onPathChange);
                scope.$on('Audio:Stop',onStop);
                scope.$on('Audio:Play',onPlay);
                scope.$on('Audio:onTimeUpdate',onTimeUpdate);

                this.load = function(){
                    if(!subscribeOnReady){
                        Audio5AudioService.get().audio.on('timeupdate',function(){
                            scope.$emit('Audio:onTimeUpdate');
                        });
                    }
                    subscribeOnReady=true;
                    if(cache.currentPath == scope.path){
                        return;
                    }

                    cache.currentPath = scope.path;
                    scope.$emit('Audio:changePath',scope.path);
                }

                this.play = function(){
                    scope.$emit('Audio:Play');
                }

                this.stop = function(){
                    scope.$emit('Audio:Stop');
                }


            }],
            link:function(scope, element, attrs, controller){


            }
        };


    }

    angular.module('html5player').directive('gtPlayer',['Audio5AudioService',GtPlayerDirective]);

})();
