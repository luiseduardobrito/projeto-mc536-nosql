'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

	controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	}])

	.controller('LoginCtrl', ['$scope', function($scope) {

		$scope.master = {};

		$scope.resetLogin = function() {
			$scope.user = angular.copy($scope.master);
		};

		$scope.resetSignup = function() {
			$scope.signup = angular.copy($scope.master);
		};

		$scope.performLogin = function() {
			alert("todo")
		};

		$scope.performSignup = function() {
			alert("todo")
		};

		$scope.resetLogin();
		$scope.resetSignup();

	}]);