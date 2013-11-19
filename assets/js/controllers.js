'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

	.controller('HomeCtrl', [

		'$scope', '$http', '$location',
		function($scope, $http, $location, $FB) {

			$scope.submitArtistSearch = function(val){

				if(val) $scope.artist = val;
				$location.path("artist/" + encodeURI($scope.artist));
			};
		}
	])

	.controller('UserCtrl', [

		'$scope', '$http', '$location', 'userService',
		function($scope, $http, $location, userService) {

			$scope.user = userService.get();

			if(!$scope.user)
				$location.path("")
		}
	])

	.controller('ArtistCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

		$scope.artist = {
			name: null,
			bio: null,
			img: null
		}

		$http({method: 'GET', url: '/artist?name=' + $routeParams.name}).

			success(function(data, status, headers, config) {

				$scope.artist = {
					name: data.name,
					bio: data.bio,
					img: data.img
				};
			}).

			error(function(data, status, headers, config) {
				alert("Artist não encontrado!");
				$location.hash("#!/");
			})
	}])

	.controller('LoginCtrl', ['$scope', '$location', 'userService', function($scope, $location, $userService) {

		$scope.userService = $userService;

		$scope.$watch('userService.get()', function(me)  {

			if(me)
				$location.path("me");

		}, true);

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