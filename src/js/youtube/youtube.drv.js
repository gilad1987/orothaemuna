(function () {

    function Youtube($window,YT_events)
    {

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        return {
            restrict:'E',
            template: "<div class='gt-youtube'></div>",

            scope:{
                height: '@',
                width: '@',
                videoid: '@',
                autoplay: '@'
            },

            compile:function(tElement, tAttrs, transclude){

                return{
                    post: function(scope, iElement, iAttrs, controller){

                        var player;

                        $window.onYouTubeIframeAPIReady = function() {
                            player = new YT.Player(iElement[0], {

                                playerVars: {
                                    autoplay: scope.autoplay,
                                    theme: "light",
                                    modesbranding: 0,
                                    color: "white",
                                    iv_load_policy: 3,
                                    showinfo: 1,
                                    controls: 1
                                },
                                events: {
                                    onStateChange: function(event) {

                                    }
                                 },
                                height: scope.height,
                                width: scope.width,
                                videoId: scope.videoid
                            });

                        };

                        scope.$watch('videoid',function(newVal,oldVal){
                           if(newVal == oldVal){
                               return;
                           }

                            player.cueVideoById(scope.videoid);
                        });

                        scope.$on(YT_events.STOP,function(){
                            player.seekTo(0);
                            player.stopVideo();
                        });

                        scope.$on(YT_events.PLAY,function(){
                            player.playVideo();
                        });

                        scope.$on(YT_events.PAUSE,function(){
                            player.pauseVideo();
                        });

                    }
                }
            }
        }
    }

    angular.module('youtube').directive('youtube',['$window','YT_events',Youtube]);

})();
