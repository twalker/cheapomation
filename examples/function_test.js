$(document).ready(function(){

	module("Function");
	
	test("bind", function(){
		expect(6);
		
		var objA = {
			method1: function(){
				return this.message;
			},
			message: "i am objA"
		};
		var objB = {
			method1: function(){
				return this.message;
			},
			message: "i am objB"
		};		
		equal(objA.method1.bind(objB)(), 'i am objB', "Should bind within Object literals");

		var one = {
			name:"one",
			size: 1,
			say: function(greeting, punctuation){
				return this.name + " says " + greeting + (punctuation || '');
			},
			add: function(){
				var intArgs = Array.prototype.slice.call(arguments),
						i, 
						sum = 0;
				for(i = intArgs.length; i--;){
					sum += intArgs[i];
				}
				return this.size + sum;
			}
		};
		
		var two = {
			name:"two",
			size: 2
		};
		
		equal(
			( one.say.bind(two, "Hello")() ), 'two says Hello', 
			"Should partially apply an additional argument when bound.");
		equal(
			( one.say.bind(two, "Hello", "!")() ), 'two says Hello!', 
			"Should partially apply multiple arguments when bound.");
		equal(
			( one.say.bind(two)("Hello") ), 'two says Hello', 
			"Should allow an additional argument when called.");
		equal(
			( one.say.bind(two)("Hello", "!") ), 'two says Hello!', 
			"Should allow multiple arguments when called.");
		equal(
			( one.add.bind(two, 1, 1)(1, 1) ), 6,
			"Should allow multiple appllied and multiple calling arguments.");
		
	});
	
	test("bind (as an event listener)", function(){
		expect(6);

		// test using constructor
		function C(msg){
			this.message = msg;
		};
		C.prototype.handleClick = function(event){
			equal(event.type, 'click', "jQuery event should be passed to bound event handlers.");
			ok(event.target == $('a#lnkTest').get(0), "Target elements (event.target) should be passed to bound event handlers.");
			equal(this.message, "Hello", "'this' should be set to the proper context--the object instance.");
		};
		// Most common use of event binding
		var c = new C("Hello");
	
		$('a#lnkTest').one('click', c.handleClick.bind(c));
		$('a#lnkTest').click(); // fire the tests by calling click.
	
		// test using object literal
		var obj = {
			linkClick: function(num1, num2, event){
				deepEqual(event.data, {extra:'data'}, 
					"jQuery event data should be available in bound event handlers.")
				equal(this, obj, 
					"'this' should be set to the proper context--the object literal.");
				equal((num1 + num2), 2, 
					"Additional arguments should be passed before the event argument.");
			}
		};
		
		$('a#lnkTest').one('click', {extra:'data'}, (obj.linkClick.bind(obj,1,1)));
		$('a#lnkTest').click();
		
	});
	

});
