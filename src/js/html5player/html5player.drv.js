(function () {

    /**
     * @returns {{priority: number, templateUrl: string, scope: {}, controller: controller, controllerAs: string, link: link}}
     * @constructor
     */
    function GtPlayerDirective()
    {
        var tag = document.createElement('script');
        tag.src = "../lib/audio5.js";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return  {
            priority: 0,
            templateUrl: 'src/js/html5player/html5player.html',
            scope: {

            },
            controller: function ($scope, $element, $attrs) {

            },
            controllerAs: 'stringAlias',
            link:function(scope, element, attrs, controller){

            }
        };


    }

    angular.module('html5player').directive('gtPlayer',GtPlayerDirective);

})();

