/*** Canvas Components and Extensions*/Crafty.c("canvas", {	isCanvas: true,	buffer: 50,		init: function() {		//on change, redraw		this.bind("change", function(e) {			e = e || this;						//clear self			Crafty.context.clearRect(e._x, e._y, e._w, e._h);						//add to the DrawBuffer if visible			if((e._x + e._w > 0 - this.buffer && 			   e._y + e._h > 0 - this.buffer && 			   e._x < Crafty.viewport.width + this.buffer && 			   e._y < Crafty.viewport.height + this.buffer) ||			   			   (this._x + this._w > 0 - this.buffer && 			   this._y + this._h > 0 - this.buffer && 			   this._x < Crafty.viewport.width + this.buffer && 			   this._y < Crafty.viewport.height + this.buffer)) {			  				DrawBuffer.add(this,e);			}		});				this.bind("remove", function() {			//this.trigger("change");			Crafty.context.clearRect(this._x, this._y, this._w, this._h);			DrawBuffer.remove(this);		});	},		draw: function(x,y,w,h) {				var co = {}, //cached obj of position in sprite with offset			pos = { //inlined pos() function, for speed				_x: Math.floor(this._x),				_y: Math.floor(this._y),				_w: Math.floor(this._w),				_h: Math.floor(this._h)			},			coord = this.__coord;				//if offset		co.x = coord[0];		co.y = coord[1];		co.w = coord[2];		co.h = coord[3];				if(x !== undefined) {			co.x = coord[0] + x;			pos._x += x;						//if x is undefined, the rest of the arguments will be			if(y !== undefined) {				co.y = coord[1] + y;				pos._y += y;			}									if(w !== undefined) {				co.w = w;				pos._w = w;			}									if(h !== undefined) {				co.h = h;				pos._h = h;			}		}				if(this.__c.sprite) {			//don't draw if not loaded			if(!this.img.width) return;						try {			//draw the image on the canvas element			Crafty.context.drawImage(this.img, //image element									 co.x, //x position on sprite									 co.y, //y position on sprite									 co.w, //width on sprite									 co.h, //height on sprite									 pos._x, //x position on canvas									 pos._y, //y position on canvas									 pos._w, //width on canvas									 pos._h //height on canvas			);			} catch(e) {				console.log(e, pos, co);			}		} else if(this.has("color")) {			if(this._color) Crafty.context.fillStyle = this._color;			Crafty.context.fillRect(pos._x,pos._y,pos._w,pos._h);		} else if(this.has("image")) {			if(!this.img) return;			var i = 0, l, j = 0, k;			switch(this._repeat) {				case "repeat-x":					if(this.img.width === 0) return;					for(l = Math.floor(this.w / this.img.width); i < l; i++) {						Crafty.context.drawImage(this.img, this.x + this.img.width * i, this.y);					}					break;				case "repeat-y":					if(this.img.height === 0) return;					for(l = Math.floor(this.h / this.img.height); i <= l; i++) {						Crafty.context.drawImage(this.img, this.x, this.y + this.img.height * i);					}					break;				default:					if(this.img.width === 0 || this.img.height === 0) return;					for(l = Math.floor(this.w / this.img.width); i < l; i++) {						Crafty.context.drawImage(this.img, this.x + this.img.width * i, this.y);						for(j = 0, k = Math.floor(this.h / this.img.height); j <= k; j++) {							Crafty.context.drawImage(this.img, this.x + this.img.width * i, this.y + this.img.height * j);						}					}										break;			}		}	}});Crafty.extend({	context: null,	_canvas: null,	gz: 0,		/**	* Set the canvas element and 2D context	*/	canvas: function(elem,w,h) {		//can pass a string with an ID		if(typeof elem === "string") {			elem = document.getElementById(elem);		}				//check if is an actual canvas element		if(!('getContext' in elem)) return;		this.context = elem.getContext('2d');		this._canvas = elem;				var fullscreen = false;		//setup dimensions		if(!w || w == "fullscreen") { 			w = Crafty.window.width; 			fullscreen = true;		}		if(!h || (w && w == "fullscreen")) {			h = Crafty.window.height;			fullscreen = true;		}		//set canvas and viewport to the final dimensions		this._canvas.width = this.viewport.width = w;		this._canvas.height = this.viewport.height = h;				//stop scrollbars		if(fullscreen) {			document.body.style.overflow = "hidden";		}				Crafty.viewport.init();	},});