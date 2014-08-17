
(function (angular) {

    angular.module('html5player').constant('PLAYER_EVENTS',{
        changePath:'Gt-Audio:changePath',
        stop:'Gt-Audio:Stop',
        play:'Gt-Audio:Play',
        timeUpdate:'Gt-Audio:onTimeUpdate',
        changeState:'Gt-Audio:changeState'
    });

})(angular);