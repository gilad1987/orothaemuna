
GT.media.AbstractPlayerStateController = GT.Event.extend({
	_player: null,

	init: function(player) {
		this._super();
		this.setPlayer(player);
	},

	setPlayer: function(player){
		if (this._player && this._unsubscribeToPlayerEvents) {
			this._unsubscribeToPlayerEvents(this.player);
		}
		this._player = player;
		if (player && this._subscribeToPlayerEvents){
			this._subscribeToPlayerEvents(player);
		}
	},

	start: function() {
		if (this._start()) {
			this.trigger("start");
		}
	},

	stop: function() {
		if (this._stop()) {
			this.trigger("stop");
		}
	},

	/*
	 * Abstract method to override by implementation 
	 * of the extending classes. 
	 */
	_start: function() {
		throw new Error('Not implemented abstract  -- _start --  method');
	},

	/*
	 * Abstract method to override by implementation 
	 * of the extending classes. 
	 */
	_stop: function() {
		throw new Error('Not implemented abstract  -- _stop --  method');
	}
});