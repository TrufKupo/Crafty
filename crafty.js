(function(window, undefined) {

var Crafty = function(selector) {
		return new Crafty.fn.init(selector);
	},
	
	GUID = 1, //GUID for entity IDs
	FPS = 50,
	components = {}, //map of components and their functions
	entities = {}, //map of entities and their data
	layers = [],
	interval,
	
	slice = Array.prototype.slice,
	rlist = /\s*,\s*/;

Crafty.fn = Crafty.prototype = {

	init: function(selector) {
		//select entities by component
		if(typeof selector === "string") {
			var elem = 0; //index elements
			
			//loop over entities
			for(e in entities) {
				if(!entities.hasOwnProperty(e)) continue; //skip
				if(Crafty(+e).has(selector)) this[elem++] = +e; //convert to int
			}
			
			this.length = elem; //length is the last index (already incremented)
			
		} else { //Select a specific entity
			
			//if not exists, return undefined
			if(!(selector in entities)) {
				this.length = 0;
				return this;
			}
			
			this[0] = selector;
			this.length = 1;
			
			//update from the cache
			this.extend(entities[selector]);
			
			//create a collection of handlers and components if not exists
			if(!this.__h) this.__h = {};
			
			entities[selector] = this; //update to the cache
		}
		
		return this;
	},
	
	addComponent: function(id) {
		if(!this.__c) this.__c = [];
		//add multiple arguments
		if(arguments.length > 1) {
			var i = 0, l = arguments.length;
			for(;i<l;i++) {
				this.__c.push(arguments[i]);
			}
		} else if(id.indexOf(',') !== -1) {
			var comps = id.split(rlist), i = 0, l = comps.length;
			for(;i<l;i++) {
				this.__c.push(comps[i]);
			}
			return this;
		} else this.__c.push(id);
		
		this.inherit();
		return this;
	},
	
	inherit: function() {
		var i = 0, l = this.__c.length;
		for(;i<l;i++) {
			//extend the prototype with the components functions
			this.extend(components[this.__c[i]]);
		}
	},
	
	has: function(id) {
		var ent = entities[this[0]].__c, i = 0, l = ent.length;
		//loop over components
		for(;i<l;i++) {
			//if component equals component
			if(ent[i] === id) return true;
		}
		return false;
	},
	
	attr: function(key, value) {
		if(arguments.length === 1) {
			//if just the key, return the value
			if(typeof key === "string") {
				return this[key];
			}
			
			//extend if object
			this.extend(key);
			return this;
		}
		//if key value pair
		this[key] = value;
		return this;
	},
	
	toArray: function() {
		return slice.call(this, 0);
	},
	
	bind: function(event, fn) {
		this.each(function() {
			if(!this.__h[event]) this.__h[event] = [];
			this.__h[event].push(fn);
		});
		return this;
	},
	
	trigger: function(event) {
		this.each(function() {
			if(this.__h && this.__h[event]) {
				var fns = this.__h[event], i = 0, l = fns.length;
				for(;i<l;i++) {
					fns[i]();
				}
			}
		});
		return this;
	},
	
	each: function(fn) {
		var i = 0, l = this.length;
		for(;i<l;i++) {
			fn.call(Crafty(this[i]),i);
		}
		return this;
	}
};
//give the init instances the Crafty prototype
Crafty.fn.init.prototype = Crafty.fn;

/**
* Extension method to extend the namespace and
* selector instances
*/
Crafty.extend = Crafty.fn.extend = function(obj) {
	var target = this;
	//don't bother with nulls
	if(!obj) return target;
	
	for(key in obj) {
		if(target === obj[key]) continue; //handle circular reference
		target[key] = obj[key];
	}
	return target;
};

Crafty.extend({
	init: function(f) {
		if(f) FPS = f;
		interval = setInterval(function() {
			Crafty().trigger("enterframe");
		}, 1000 / FPS);
	},
	
	stop: function() {
		clearInterval(interval);
	},
	
	e: function() {
		var id = UID(), craft;
		
		entities[id] = null; //register the space
		entities[id] = craft = Crafty(id);
		
		if(arguments.length > 0) {
			craft.addComponent.apply(craft, arguments);
		}
		return id;
	},
	
	c: function(id, fn) {
		components[id] = fn;
	},
	
	addLayer: function() {
	
	},
	
	debug: function() {
		if(console) {
			console.log("Entities: ", entities);
			console.log("Components: ", components);
			console.log("Cache: ", cache);
		}
	}
});

/**
* Return a unique ID
*/
function UID() {
	var id = GUID++;
	//if GUID is not unique
	if(id in entities) {
		return UID(); //recurse until it is unique
	}
	return id;
}


//make Crafty global
window.Crafty = Crafty;
})(window);