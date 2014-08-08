angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/js/html5player/html5player.html',
    "<div id=\"html5player\">gt-player</div>"
  );


  $templateCache.put('src/js/youtube/youtube.tpl.html',
    "<youtube width=\"{{YtCtrl.yt.width}}\" height=\"{{YtCtrl.yt.height}}\" videoid=\"{{YtCtrl.yt.videoid}}\" autoplay=\"{{YtCtrl.yt.autoplay}}\"></youtube>"
  );

}]);
