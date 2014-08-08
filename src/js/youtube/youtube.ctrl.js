(function () {

    function YouTubeController($scope, YT_events){

        this.YT_events = YT_events;

        this.yt = {
            height:100,
            width:100,
            videoid:'GYLU9leTAjE',
            autoplay:0
        };

        this.sendControlEvent = function(YT_event){
            $scope.$broadcast(YT_event);
        }

    }

    angular.module('youtube').controller('YouTubeController',['$scope','YT_events', YouTubeController]);

})();