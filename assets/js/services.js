'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])

.service('userService', function() {

	var me = false;

	this.sayHello = function() {
		return "Hi " + me.name + "!";
	};

	this.set = function(u) {
		me = u;
	}

	this.get = function() {
		return me;
	}
});