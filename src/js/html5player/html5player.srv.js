(function () {

    function Audio5PlayerConfigService()
    {
        var params,
            audio;

        params = {
            throw_errors:true,
            format_time:true,
            codecs: ['mp4', 'vorbis', 'mp3']
        };


        this.setThrowErrors = function(_boolean){
            params.throw_errors = _boolean;
        }

        this.setFormatTime = function(_boolean){
            params.format_time = _boolean;
        }


        this.$get = function(){
            return {
                params:params,
                get:function(){
                    if(typeof audio === 'undefined'){
                        console.log('init audio');
                        audio = new Audio5js(params);
                    }

                    return audio;
                }
            };
        }
    }

    angular.module('html5player').provider('Audio5AudioService',[Audio5PlayerConfigService]);

})();