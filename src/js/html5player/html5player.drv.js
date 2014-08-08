(function () {

    function GtPlayerDirective()
    {
        var tag = document.createElement('script');
        tag.src = "../lib/audio5.js";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return  {
            priority: 0,
            template: '<div> moshe</div>',
            scope: {

            },
            controller: function ($scope, $element, $attrs) {

            },
            controllerAs: 'stringAlias',
            compile: function compile(tElement, tAttrs, transclude) {

                return {
                    post: function postLink(scope, iElement, iAttrs, controller) {

                    }
                }
            }
        };


    }

    angular.module('html5player').directive('gtPlayer',GtPlayerDirective);

})();
