angular.module('myApp.directives', [])

.directive('autoComplete', function ($timeout) {
	return function (scope, iElement, iAttrs) {

		jQuery(iElement).autocomplete({
			source: "/api/artist/autocomplete",
			select: function (event, ui) {
				scope.$apply(function () {
					scope.submitArtistSearch(ui.item.value)
				})
			}
		});
	};
})

.directive('google', function ($http, userService) {
	return {
		restrict: 'A',
		scope: true,
		controller: ['$scope', '$attrs', 'userService', function ($scope, $attrs) {
			// Load the SDK Asynchronously
			(function () {
				var po = document.createElement('script');
				po.type = 'text/javascript';
				po.async = true;
				po.src = 'https://apis.google.com/js/client:plusone.js?onload=google_plus_sign_in_render';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(po, s);
			})();

			function fetch() {
				$http.post('/google/create', $scope.auth)

				.success(function (data) {
					window.location.reload(true);
					$scope.fetch_status = data.status;
				})

				.error(function (data) {
					console.log('error: ' + data);
					$scope.fetch_status = data.status;
				});
			}

			$scope.render = function () {
				gapi.signin.render('signinButton', {
					callback: function (authResult) {
						if (authResult['access_token']) {

							$scope.auth = authResult
							console.log(authResult);
							$scope.login_status = 'connected'

							gapi.client.load('plus', 'v1', function () {

								var request = gapi.client.plus.people.get({
									'userId': 'me'
								});

								request.execute(function (resp) {

									$http({

										url: "/user/create",
										method: "GET",
										params: {
											name: resp.displayName,
											login: resp.displayName.toLowerCase().split(' ').join(''),
											image: resp.image.url
										}

									}).success(function (data, status, headers, config) {
										
										$scope.user = data;
										$scope.user.logged_in = true;

										userService.set($scope.user);

									}).error(function (data, status, headers, config) {
										alert("Erro ao criar usuario");
									});
								});
							});

						} else if (authResult['error']) {
							// There was an error.
							// Possible error codes:
							//   "access_denied" - User denied access to your app
							//   "immediate_failed" - Could not automatially log in the user
							console.log('There was an error: ' + authResult['error']);
							$scope.login_status = authResult['error'];
						}
						$scope.$apply();
					},
					clientid: $attrs.google,
					cookiepolicy: "single_host_origin",
					// requestvisibleactions: "http://schemas.google.com/AddActivity",
					scopes: [
						"email",
						"https://www.googleapis.com/auth/plus.login"
					]

				});
			}
			$scope.fetch = function () {
				if ($scope.login_status == 'connected') {
					console.log('fetch');
					fetch();
				} else {
					console.log('cannot fetch. login first');
					//          login();
				}
			};

			$scope.revoke = function () {
				console.log('revoke');
				var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
					$scope.auth['access_token'];

				jQuery.ajax({
					type: 'GET',
					url: revokeUrl,
					async: false,
					contentType: "application/json",
					dataType: 'jsonp',
					success: function (nullResponse) {
						console.log('disconnected');
						// Do something now that user is disconnected
						// The response is always undefined.
						$scope.login_status = 'disconnected'
						$scope.$apply();
					},
					error: function (e) {
						console.log('error in revoke');
						// Handle the error
						console.log(e);
						// You could point users to manually disconnect if unsuccessful
						// https://plus.google.com/apps
					}
				});
			}
		}],
		link: function (scope, element, attrs, controller) {}
	}
});

function google_plus_sign_in_render() {
	angular.element(jQuery('#signinButton')).scope().render();
}