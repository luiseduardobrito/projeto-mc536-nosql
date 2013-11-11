angular.module('myApp.directives', []).directive('autoComplete', function($timeout) {
	return function(scope, iElement, iAttrs) {

			jQuery(iElement).autocomplete({

				source: "/api/artist/autocomplete",

				select: function(event, ui) {
					scope.$apply(function(){
						scope.submitArtistSearch(ui.item.value)
					})
				}
			});
	};
});