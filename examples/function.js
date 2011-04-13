/* ES5 polyfill for Function */

/* 
	Creates a function call forced into a particular context. 
	The first parameter is the context you wish to call the function in. 
	Any additional parameters are passed on as parameters to the function you’re 
	calling.
	
	Implementation from Mozilla:
		https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
*/
if (!Function.prototype.bind){
	Function.prototype.bind = function(context /*, arg1, arg2... */) {
		'use strict';
		if (typeof this !== 'function') {
			throw new TypeError();
		}
		var _slice = Array.prototype.slice,
				_concat = Array.prototype.concat,
				_arguments = _slice.call(arguments, 1),
				_this = this,
				_function = function() {
					return _this.apply(this instanceof _dummy ? this : context,
							_concat.call(_arguments, _slice.call(arguments, 0)));
				},
				_dummy = function() {};
			
			_dummy.prototype = _this.prototype;
			_function.prototype = new _dummy();
			return _function;
	};
}
