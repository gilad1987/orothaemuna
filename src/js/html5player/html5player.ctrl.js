(function () {

    function Html5PlayerController($scope, Audio5AudioService, $timeout, $log)
    {
        this.a= function(){}
//        console.log($scope);
//        function onPathChange(event, path){
//                Audio5AudioService.get().load(path);
//        }
//
//        $scope.$on('Audio:changePath',onPathChange);
//
//        this.load = function(){
//            $scope.$emit('Audio:changePath',scope.path);
//        }

    }

    angular.module('html5player').controller('Html5PlayerController',['$scope','Audio5AudioService','$timeout','$log', Html5PlayerController]);

})();