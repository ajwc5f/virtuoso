'use strict';

var app = angular.module('PlayerApp');

app.controller('DemoCtrl', function ($scope, API, $http, $timeout, $interval, $routeParams) {
    var vm = this;
    
    vm.artist = '';
    
    console.log("in DemoCtrl");
    
    vm.refreshArtists = function(artist) {
        console.log("in refeshArtists");
        API.getSearchResults(artist).then(function(results) {
			console.log('got oa poop results', results);
            console.log(results);
            vm.artists = results;
		});
    };
});