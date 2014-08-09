(function () {


    /**
     *
     * @param Audio5AudioService
     * @returns {{priority: number, templateUrl: string, scope: {path: string}, controller: ctrl, controllerAs: string, link: link}}
     * @constructor
     */
    function GtPlayerDirective(Audio5AudioService)
    {
        var tag = document.createElement('script');
        tag.src = "../lib/audio5.js";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


        function onPathChange(event, path){
            console.log('f');
            Audio5AudioService.get().load(path);
        }

        return  {
            priority: 0,
            templateUrl: 'src/js/html5player/html5player.html', // in chase
            scope: {
                path: '@path'
            },
            controllerAs:'AudioCtrl',
            controller: ['$scope', '$element', '$attrs', function ctrl(scope, element, attrs) {

                scope.$on('Audio:changePath',onPathChange);

                this.load = function(){
                    scope.$emit('Audio:changePath',scope.path);
                }

            }],
            link:function(scope, element, attrs, controller){

//                scope.$emit('Audio:changePath',scope.path);

            }
        };


    }

    angular.module('html5player').directive('gtPlayer',['Audio5AudioService',GtPlayerDirective]);

})();
