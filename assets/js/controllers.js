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

			$scope.friends = [];
			$scope.artists = [];

			if(!$scope.user)
				$location.path("")

			$scope.addFriend = function() {

				$http({method: "GET", url: "/user/add_friend?login=" + $scope.newFriend})

					.success(function(data, status, headers, config) {
						$scope.friends.push($scope.newFriend);
						$scope.newFriend = "";
					})

					.error(function(data, status, headers, config) {
						alert("Erro ao adicionar novo amigo")
					})
			}

			$scope.addArtist = function() {

				$http({method: "GET", url: "/user/add_artist?login=" + $scope.newArtist})

					.success(function(data, status, headers, config) {
						$scope.artists.push($scope.newArtist);
						$scope.newArtist = "";
					})

					.error(function(data, status, headers, config) {
						alert("Erro ao curtir artista")
					})
			}
		}
	])

	.controller('ArtistCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

		$scope.artist = {
			name: null,
			bio: null,
			img: null,
			tags: []
		}

		$http({method: 'GET', url: '/artist?name=' + $routeParams.name}).

			success(function(data, status, headers, config) {

				$scope.artist = {
					name: data.name,
					bio: data.bio,
					img: data.img,
					tags: data.tags
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