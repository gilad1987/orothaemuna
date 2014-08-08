

GT.media.PlayerTimeTrackerView = GT.Event.extend({

	_controller: null,
	_current_time: null,

	init: function(controller) {
		this._onControllerTimeUpdateBinded = this._onControllerTimeUpdate.bind(this);
//		this._onUserClickedTrackerBinded = this._onUserClickedTracker.bind(this);
		
		if(controller){
			this._controller = controller;
			this._subscribeToControllerEvents();
			this._subscribeToDomEvents();
		}
	},
	
	_onControllerTimeUpdate: function(){
		if(this._current_time == this._controller._player.position){
			return false;
		}
		
		this._current_time = this._controller._player.position;
		
		$('#time-elapsed').text(this._controller._player.position);
		
	},
	
	_subscribeToControllerEvents: function() {
		this._controller.subscribe("onTimeUpdate", this._onControllerTimeUpdateBinded);
	},
	
	_onUserClickedTracker: function(){},
	
	_subscribeToDomEvents: function(element) {}

});