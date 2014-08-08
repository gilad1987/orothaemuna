

var playerStateController,
    playerStateView,
    playerTrackerController,
    playerTrackerView,
    playerTimeTrackerView;



$(document).ready(function(){
    GT.media.audio5js = new Audio5js();

    playerStateController = new GT.media.HTML5PlayerStateController(GT.media.audio5js);
    playerStateView = new GT.media.PlayerStateView(playerStateController);
    playerTrackerController = new GT.media.HTML5PlayerTrackerController(GT.media.audio5js);
    playerTrackerView = new GT.media.PlayerTrackerView(playerTrackerController);
    playerTimeTrackerView = new GT.media.PlayerTimeTrackerView(playerTrackerController);
});




//GT.media.audio5js = new Audio5js({
//	ready: function () {
//		this.load('public/mp3_uploads/0549a919f3457eaa12ac3f82bb4d2664_8405.mp3');
//		this.volume(0);
//	}
//});