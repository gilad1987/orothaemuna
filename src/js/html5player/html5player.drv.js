
(function (angular) {

    var _EVENTS;

    function getIsolateValue(scope){
        if(angular.isUndefined(scope.isolate)){
            return false;
        }else if(scope.isolate == 1 || scope.isolate == 0 || scope.isolate == true || scope.isolate == false){
            return scope.isolate;
        }

        throw new Error('Isolate Attr must boolean value');
    }


    var rootScopeInit=false;
    function bindEvents(scope,isolate,ctrl){

        if(!isolate && rootScopeInit){
            return false;
        }

        function onChangeState(aEvent,gt_event,isolate,ctrl){
            scope.$broadcast(gt_event,isolate, ctrl);
        }

        scope.$on(ctrl.getEventName(_EVENTS.changeState),onChangeState);

        if(!rootScopeInit && !isolate){
            rootScopeInit = true;
        }
    }

    function GtPlayerDirectiveController(scope, element, attrs,$rootScope,EVENTS,Audio5AudioService)
    {
        var isolate,
            _this;

        _this = this;

        this.getEventName = function(_event){
            return isolate ? _event+_this.id : _event;
        }

        this.id = '_'+Math.floor(Math.random()*9999999999);
        isolate = getIsolateValue(scope);
        bindEvents(isolate ? scope : $rootScope,isolate,this);


        this.play = function(){
//            Audio5AudioService.get().play();
            scope.$emit(_this.getEventName(EVENTS.changeState),_this.getEventName(EVENTS.play),isolate,_this);
        }

        function onPlay(aEvent,isoalte,ctrl){
            element.addClass('play');
        }
        scope.$on(_this.getEventName(EVENTS.play),onPlay);


        this.stop = function(){
//            Audio5AudioService.get().stop();
            scope.$emit(_this.getEventName(EVENTS.changeState),_this.getEventName(EVENTS.stop),isolate,_this);
        }

        function onStop(aEvent,isoalte,ctrl){
            element.removeClass('play');
        }
        scope.$on(this.getEventName(EVENTS.stop),onStop);

    }

    function GtPlayerDirective(Audio5AudioService,EVENTS,$rootScope)
    {
        /**
         * Load Audio5js Library
         * @type {HTMLElement}
         */
        var tag = document.createElement('script');
        tag.src = '../lib/audio5.js';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        tag.onload = function(){
            console.log('load script');
        }

        _EVENTS = EVENTS;

        return  {
            priority: 0,
            templateUrl: 'src/js/html5player/html5player.html', // in chase
            scope: {
                path: '@path',
                tracker: '=tracker',
                isolate: '@isolate'
            },
            controllerAs:'AudioCtrl',
            controller: ['$scope', '$element', '$attrs','$rootScope','PLAYER_EVENTS','Audio5AudioService', GtPlayerDirectiveController],
            link:function(scope,element,attrs){

            }
        };
    }

    angular.module('html5player').directive('gtPlayer',['Audio5AudioService','PLAYER_EVENTS','$rootScope',GtPlayerDirective]);

})(angular);
