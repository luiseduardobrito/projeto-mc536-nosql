angular.module('myApp.directives', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {

           jQuery(iElement).autocomplete({

                source: "/api/artist/autocomplete",

                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});