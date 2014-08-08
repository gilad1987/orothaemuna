
GT.media.PlayerStateView = GT.Event.extend({
	
	_loadFile:false,
	_controller: null,

	init: function(controller) {
		this._onUserClickedChangeStateBinded = this._onUserClickedChangeState.bind(this);
		this._onControllerStoppedBinded = this._onControllerStopped.bind(this);
		this._onControllerStartBinded = this._onControllerStarted.bind(this);
		if(controller){
			this._controller = controller;
			this._subscribeToControllerEvents();
			this._subscribeToDomEvents();
		}
	},
	
	//update the dom
	_onControllerStarted: function() {
//		if(!playerStateView._loadFile){
//			setTimeout(function(){
//				if(GT.media.audio5js.duration){
//					$('#time-duration').text(GT.media.audio5js.duration);
//					playerStateView._loadFile = true;
//				}
//				
//			},1000);
//		}
			
//		console.log('PlayerStateView got controller state start');
		$("#play-and-pause").addClass('pause').removeClass('play');
	},
	
	_onControllerStopped: function() {
//		console.log('PlayerStateView got controller state stop');
		$("#play-and-pause").removeClass('pause').addClass('play');
	},
	
	
	_subscribeToControllerEvents: function() {
		this._controller.subscribe("start", this._onControllerStartBinded);
		this._controller.subscribe("stop", this._onControllerStoppedBinded);
	},
	
	_onUserClickedChangeState: function(){
		if(!this._controller.playing){
			this._controller.start();
		}else{
			this._controller.stop();
		}
	},
	
	_subscribeToDomEvents: function(element) {
		$('#play-and-pause').on("click", this._onUserClickedChangeStateBinded);
	}

});