'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'ngSanitize',
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
		.when('/me', {
			templateUrl: '../partials/user.html', 
			controller: 'UserCtrl'
		});

	$routeProvider
		.when('/artist/:name', {
			templateUrl: '../partials/artist.html', 
			controller: 'ArtistCtrl'
		});

	$routeProvider
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider
		.html5Mode(false)
		.hashPrefix('!');
}]);