
(function (angular) {

    angular.module('html5player').constant('PLAYER_EVENTS',{
        changePath:'Audio:changePath',
        stop:'Audio:Stop',
        play:'Audio:Play',
        timeUpdate:'Audio:onTimeUpdate'
    });

})(angular);