(function () {

    function GtPlayerDirective()
    {


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
