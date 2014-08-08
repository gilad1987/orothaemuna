

GT.media.PlayerTrackerView = GT.Event.extend({

	_controller: null,
	_currentPositionPercent: null,
	
	init: function(controller) {
		this._onControllerTimeUpdateBinded = this._onControllerTimeUpdate.bind(this);
		this._onUserClickedTrackerBinded = this._onUserClickedTracker.bind(this);
		
		if(controller){
			this._controller = controller;
			this._subscribeToControllerEvents();
			this._subscribeToDomEvents();
		}
	},
	
	_onControllerTimeUpdate: function(){
		var duration,
			position,
			percent;
		
		duration = Math.round(this._controller._player.audio.duration);
		position = Math.round(this._controller._player.audio.position);
		
		percent = duration/100;
		positionPercent =Math.round( position / percent );
		
//		console.log(this._controller._player.audio.position);
		
		if(this._currentPositionPercent == positionPercent){
			return false;
		}
		
		this._currentPositionPercent = positionPercent;
		
		$('#tracker .progress-live').css('width',positionPercent+'%');
		
	},
	
	_subscribeToControllerEvents: function() {
		this._controller.subscribe("onTimeUpdate", this._onControllerTimeUpdateBinded);
	},
	
	_onUserClickedChangeState: function(){},
	
	_onUserClickedTracker: (function(){
		var $player,
			$tracker,
			tracker_width,
			player_offset,
			playerX,
			pointerX,
			progress_in_pixel,
			percent,
			duration,
			get_second_by_percent;
		
		
		$(document).ready(function(){
			$player = $("#audio-player");
			$tracker = $('#tracker');
		});

		get_second_by_percent = function(percent){
			duration = Math.round(this._controller._player.audio.duration);
			
			return (duration/100)*percent;
		};
		
		return function(e){
			player_offset = $player.offset();
			playerX = player_offset.left;
			tracker_width = $tracker.width();
			pointerX = e.clientX;
			progress_in_pixel = pointerX-playerX;
			
			percent = Math.round( progress_in_pixel/ (tracker_width/100) );
			second = get_second_by_percent.call(this, percent);
			
			GT.media.audio5js.seek(second);
		};
	})(),
	
	_subscribeToDomEvents: function(element) {
		$("#tracker").on("click",this._onUserClickedTrackerBinded);
	}

});