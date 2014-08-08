
GT.media.HTML5PlayerTrackerController = GT.media.AbstractPlayerTrackerController.extend({
	
	playing: false,

	_onTimeUpdate: function(){
		this.trigger('onTimeUpdate');
	},
	
	_seek: function(seconds){
		
	},
	
	_unsubscribeToPlayerEvents: function() {
		
		var player = this._player;
		
		player.off('timeupdate',this._onTimeUpdate);
	},

	_subscribeToPlayerEvents: function() {
		
		var player = this._player;
		
		player.on('timeupdate',this._onTimeUpdate,this);
	}
});
