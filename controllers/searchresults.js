(function() {

	var module = angular.module('PlayerApp');

	module.controller('SearchResultsController', function($scope, API, $location, PlayQueue, $routeParams) {
		$scope.query = $location.search().q || '';
		$scope.tracks = [];

        API.getSearchResults($scope.query).then(function(results) {
			console.log('got oa poop results', results);
            $scope.artists = results;

		});
	});

})();
