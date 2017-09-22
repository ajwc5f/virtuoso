(function() {

	var app = angular.module('PlayerApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.select']);

	app.config(function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/browse.html',
				controller: 'BrowseController'
			}).
			when('/artists/:artist', {
				templateUrl: 'partials/artist.html',
				controller: 'ArtistController'
			}).
            when('/artists/:artist/facebook.html', {
				templateUrl: 'partials/facebook.html',
				controller: 'ArtistController'
			}).
            when('/artists/:artist/soundcloud.html', {
				templateUrl: 'partials/soundcloud.html',
				controller: 'ArtistController'
			}).
    		when('/artists/:artist/spotify.html', {
				templateUrl: 'partials/spotify.html',
				controller: 'ArtistController'
			}).
            when('/artists/:artist/twitter.html', {
				templateUrl: 'partials/twitter.html',
				controller: 'ArtistController'
			}).
            when('/artists/:artist/youtube.html', {
				templateUrl: 'partials/youtube.html',
				controller: 'ArtistController'
			}).
			when('/search', {
				templateUrl: 'partials/searchresults.html',
				controller: 'SearchResultsController'
			}).
			otherwise({
				redirectTo: '/'
			});
	});

	app.controller('AppController', function($scope, /*Auth,*/ API, $location) {
		console.log('in AppController');

		console.log(location);

        $scope.showplayer = true;

		$scope.getClass = function(path) {
			if ($location.path().substr(0, path.length) == path) {
				return 'active';
			} else {
				return '';
			}
		};
	});

})();
