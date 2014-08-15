angular.module('orothaemuna').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/js/html5player/html5player.html',
    "<div class=\"gt-html5player\">\r" +
    "\n" +
    "    <button ng-click=\"AudioCtrl.load()\">load init</button>\r" +
    "\n" +
    "    <button ng-click=\"AudioCtrl.play()\" class=\"play-button\">Play</button>\r" +
    "\n" +
    "    <button ng-click=\"AudioCtrl.stop()\" class=\"stop-button\">Stop</button>\r" +
    "\n" +
    "    <div class=\"gt-tracker\">\r" +
    "\n" +
    "        <div class=\"gt-progress\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/js/youtube/youtube.tpl.html',
    "<youtube width=\"{{YtCtrl.yt.width}}\" height=\"{{YtCtrl.yt.height}}\" videoid=\"{{YtCtrl.yt.videoid}}\" autoplay=\"{{YtCtrl.yt.autoplay}}\"></youtube>"
  );

}]);
