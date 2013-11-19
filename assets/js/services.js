'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])

.service('userService', function($http) {

	var _this = this;
	var _public = _this.exports = {};

	_this.me = null;

	_this.init = function() {
		return _public;
	}

	_public.set = function(u) {
		_this.me = u;
	}

	_public.get = function() {
		return _this.me;
	}

	return _this.init();
});