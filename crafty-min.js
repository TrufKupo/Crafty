(function(i,c){var k=function(n){return new k.fn.init(n)},h=1,l=50,f={},g={},d=[],b,m=Array.prototype.slice,j=/\s*,\s*/;k.fn=k.prototype={init:function(n){if(typeof n==="string"){var o=0;for(e in g){if(!g.hasOwnProperty(e)){continue}if(k(+e).has(n)){this[o++]=+e}}this.length=o}else{if(!(n in g)){this.length=0;return this}this[0]=n;this.length=1;this.extend(g[n]);if(!this.__h){this.__h={}}g[n]=this}return this},addComponent:function(q){if(!this.__c){this.__c=[]}if(arguments.length>1){var o=0,n=arguments.length;for(;o<n;o++){this.__c.push(arguments[o])}}else{if(q.indexOf(",")!==-1){var p=q.split(j),o=0,n=p.length;for(;o<n;o++){this.__c.push(p[o])}return this}else{this.__c.push(q)}}this.inherit();return this},inherit:function(){var o=0,n=this.__c.length;for(;o<n;o++){this.extend(f[this.__c[o]])}},has:function(q){var p=g[this[0]].__c,o=0,n=p.length;for(;o<n;o++){if(p[o]===q){return true}}return false},attr:function(n,o){if(arguments.length===1){if(typeof n==="string"){return this[n]}this.extend(n);return this}this[n]=o;return this},toArray:function(){return m.call(this,0)},bind:function(o,n){this.each(function(){if(!this.__h[o]){this.__h[o]=[]}this.__h[o].push(n)});return this},trigger:function(n){this.each(function(){if(this.__h&&this.__h[n]){var q=this.__h[n],p=0,o=q.length;for(;p<o;p++){q[p]()}}});return this},each:function(p){var o=0,n=this.length;for(;o<n;o++){p.call(k(this[o]),o)}return this}};k.fn.init.prototype=k.fn;k.extend=k.fn.extend=function(o){var n=this;if(!o){return n}for(key in o){if(n===o[key]){continue}n[key]=o[key]}return n};k.extend({init:function(n){if(n){l=n}b=setInterval(function(){k().trigger("enterframe")},1000/l)},stop:function(){clearInterval(b)},e:function(){var o=a(),n;g[o]=null;g[o]=n=k(o);if(arguments.length>0){n.addComponent.apply(n,arguments)}return o},c:function(o,n){f[o]=n},addLayer:function(){},debug:function(){if(console){console.log("Entities: ",g);console.log("Components: ",f);console.log("Cache: ",cache)}}});function a(){var n=h++;if(n in g){return a()}return n}i.Crafty=k})(window);