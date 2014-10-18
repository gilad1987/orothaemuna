(function () {

    function Html5PlayerController($scope, PLAYER_EVENTS)
    {
        this.player = {
            path : '../files/audio/0bf2d6de463070a01842acaa7a8f13f8_9424.mp3'
        };



        this.changePath = function(){
            this.player.path = '../files/audio/3a261737929931198c3219f941f5152e_1763.mp3'
        };
    }

    angular.module('html5player').controller('Html5PlayerController',['$scope','PLAYER_EVENTS', Html5PlayerController]);

})();