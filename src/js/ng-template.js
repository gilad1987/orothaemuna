angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/js/youtube/youtube.tpl.html',
    "<youtube width=\"{{YtCtrl.yt.width}}\" height=\"{{YtCtrl.yt.height}}\" videoid=\"{{YtCtrl.yt.videoid}}\" autoplay=\"{{YtCtrl.yt.autoplay}}\"></youtube>"
  );

}]);
