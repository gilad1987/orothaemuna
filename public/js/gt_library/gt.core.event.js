
GT.Event = GT.createClass({

	events: null,
	
	init:function(){
		this.events = {};
	},
	
	subscribe:function(name, handler) {
		var eventMap = this.events[name] || (this.events[name] = []);

		if ('function' === typeof handler)
			eventMap.push(handler);
	},

	unsubscribe:function(name, handler) {
		
		var len,
			i = 0,
			evetnMap = this.events[name];
		
		if (!evetnMap)
			return;

		if (!handler) {
			this.events[name] = null;
			return;
		}
		
		len = evetnMap.length;
		
		for (; i < len; i++) {
			if (evetnMap[i] === handler) {
				//TODO: proper remove (use array methods, splice, slice, etc)
				evetnMap[i] = null;
			}
		}

	},
	//trigger("open", filename, location, mode)
	trigger:function(evt /*, argument1, argument2, etc */){
		var i = 0,
			len,
			handler,
			evetnMap = this.events[evt];
		
		if(evetnMap) {
			len = evetnMap.length;
			for(; i < len; i++){
				handler = evetnMap[i]; 
				if(handler) {

//					console.log("invokeing handler: " + handler + ", at index: " + i);
					var args = Array.prototype.slice.call(arguments, 1);
					handler.apply(window, args );
				}
			}
		}
	}
});