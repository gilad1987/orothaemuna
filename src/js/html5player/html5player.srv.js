(function () {

    function Audio5PlayerConfigService()
    {
        var params = {
            throw_errors:true,
            format_time:true
        };


        this.setThrowErrors = function(_boolean){
            params.throw_errors = _boolean;
        }

        this.setFormatTime = function(_boolean){
            params.format_time = _boolean;
        }

        this.$get = function(){
            return params;
        }
    }

    angular.module('html5player').provider('Audio5PlayerConfigService',Audio5PlayerConfigService);

})();