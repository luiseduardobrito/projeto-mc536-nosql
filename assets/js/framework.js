'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.controllers',
	'myApp.services',
	'myApp.directives',
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: '../partials/home.html', 
			controller: 'HomeCtrl'
		});
	
	$routeProvider
		.when('/login', {
			templateUrl: '../partials/login.html', 
			controller: 'LoginCtrl'
		});

	$routeProvider
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider
		.html5Mode(false)
		.hashPrefix('!');
}]);