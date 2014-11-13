angular.module('orothaemuna').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/js/html5player/html5player.html',
    "<div class=\"gt-html5player\">\n" +
    "    <button ng-click=\"AudioCtrl.load()\">load init</button>\n" +
    "    <button ng-click=\"AudioCtrl.play()\" class=\"play-button\">Play</button>\n" +
    "    <button ng-click=\"AudioCtrl.stop()\" class=\"stop-button\">Stop</button>\n" +
    "    <div class=\"gt-tracker\">\n" +
    "        <div class=\"gt-progress\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('src/js/youtube/youtube.tpl.html',
    "<youtube width=\"{{YtCtrl.yt.width}}\" height=\"{{YtCtrl.yt.height}}\" videoid=\"{{YtCtrl.yt.videoid}}\" autoplay=\"{{YtCtrl.yt.autoplay}}\"></youtube>"
  );

}]);
