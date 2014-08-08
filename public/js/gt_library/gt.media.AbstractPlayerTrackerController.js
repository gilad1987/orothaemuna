
GT.media.AbstractPlayerTrackerController = GT.Event.extend({
	_player: null,

	init: function(player) {
		this._super();
		this.setPlayer(player);
	},

	setPlayer: function(player){
		if(!player){
			return;
		}
		
		if (this._player && this._unsubscribeToPlayerEvents) {
			this._unsubscribeToPlayerEvents(this.player);
		}

		this._player = player;
		if (player && this._subscribeToPlayerEvents){
			this._subscribeToPlayerEvents(player);
		}
	}
});
