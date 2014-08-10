angular.module('orothaemuna').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/js/html5player/html5player.html',
    "<div class=\"gt-html5player\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <button ng-click=\"AudioCtrl.load()\">load init</button>\r" +
    "\n" +
    "    <button ng-click=\"AudioCtrl.play()\">Play</button>\r" +
    "\n" +
    "    <button ng-click=\"AudioCtrl.stop()\">Stop</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"gt-tracker\">\r" +
    "\n" +
    "        <div class=\"gt-progress\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/js/youtube/youtube.tpl.html',
    "<youtube width=\"{{YtCtrl.yt.width}}\" height=\"{{YtCtrl.yt.height}}\" videoid=\"{{YtCtrl.yt.videoid}}\" autoplay=\"{{YtCtrl.yt.autoplay}}\"></youtube>"
  );

}]);
