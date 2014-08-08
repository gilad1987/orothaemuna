
GT.media.HTML5PlayerStateController = GT.media.AbstractPlayerStateController.extend({
	
	playing: false,
	
	_onStart: function() {
		this.playing = true;
		this.trigger("start");
	},

	_onStop: function() {
		this.playing = false;
		this.trigger("stop");
	},

	_unsubscribeToPlayerEvents: function() {
		var player = this._player;
		player.off('play',this._onStart);
		player.off('pause',this._onStop);
		player.off('ended',this._onStop);
	},

	_subscribeToPlayerEvents: function() {
		var player = this._player;
		player.on('play',this._onStart, this);
		player.on('pause',this._onStop, this);
		player.on('ended',this._onStop, this);
	},	

	/*
	 * Overrides the Abstract method  
	 */
	_start: function() {
		this._player.play();
//		return true;
	},
	
	/*
	 * Overrides the Abstract method  
	 */
	_stop: function() {
		this._player.pause();
//		return true;
	}
	
});