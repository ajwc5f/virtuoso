(function() {

	var module = angular.module('PlayerApp');

	module.controller('ArtistController', function($scope, $sce, $rootScope, API, $routeParams) {
		$scope.artist = $routeParams.artist;
		$scope.data = null;
    $scope.artistName = null;
    $scope.artistFactCard = null;
    $scope.artistImages = [];
    $scope.sourcedata = null;
    $scope.mbzId = null;
    $scope.mbzData = null;
    $scope.spotId = null;
		$scope.spotUrl = null;
		$scope.spotUsername = null;
		$scope.spotFollowers = null;
    $scope.spotEmbedUrl = null;
    $scope.SpotTopTracks = null;
    $scope.scId = null;
    $scope.scUser = null;
		$scope.scUsername = null;
		$scope.scUrl = null;
		$scope.scFollowers = null;
    $scope.scUserWidgetUrl = null;
    $scope.scUserTracks = null;
    $scope.genResults = null;
    $scope.genId = null;
    $scope.genArtist = null;
    $scope.twitterUrl = null;
		$scope.twitterUsername = null;
		$scope.twitterFollowers = null;
    $scope.fbUrl = null;
    $scope.fbUsername = null;
    $scope.fbPicUrl = null;
    $scope.fbFanCount = null;
    $scope.fbFeed = [];
    $scope.fbPosts = [];
    $scope.ytUrl = null;
		$scope.ytVideos = null;
		$scope.ytUsername = null;
		$scope.subscribers = null;
    $scope.wikiId = null;
		$scope.discog = [];
		$scope.albums = [];
		$scope.singles = [];
		$scope.appearson = [];

		$scope.tracks = [];

    var posts = [];

    var facebookUrl = null;

		var ytId = null;

    $('#nav li a').click(function (e) {
      e.preventDefault();
      /*console.log($(this).closest('a')[0].className);*/
      $(this).closest('li').addClass('active').siblings().removeClass('active');
    });

		$scope.renderHtml = function(html_code) {
    	return $sce.trustAsHtml(html_code);
		};

		API.getArtist($scope.artist).then(function(artist) {
			console.log('got poop openaura artist', artist);
			$scope.data = artist;
      $scope.artistName = artist.name;
      $scope.artistFactCard = artist.fact_card.media[0].data;

      var dob = $scope.artistFactCard.birthdate;
      $scope.birthdate = dob.split(' ')[0];
      if ($scope.birthdate == '') {
        $scope.birthdate = 'Unknown';
      }
      $scope.birthname = $scope.artistFactCard.birthname;
      if ($scope.birthname == '') {
        $scope.birthname = 'Unknown';
      }
      $scope.birthplace = $scope.artistFactCard.birthplace;
      if ($scope.birthplace == '') {
        $scope.birthplace = 'Unknown';
      }
      $scope.hometown = $scope.artistFactCard.hometown;
      if ($scope.hometown == '') {
        $scope.hometown = 'Unknown';
      }
      $scope.website = $scope.artistFactCard.website;
      if ($scope.website == '') {
        $scope.website = 'Unknown';
      }
      $scope.yearfrom = $scope.artistFactCard.years_active[0].yearfrom;
      $scope.yearto = $scope.artistFactCard.years_active[0].yearto;
			if ($scope.yearto == '') {
        $scope.yearto = 'Present';
      }
			$scope.members = $scope.artistFactCard.members;

      for (var i = 0; i < artist.artist_images.length; i++) {
        $scope.artistImages[i] = artist.artist_images[i].media[0].url;
      }

			$scope.mbzId = artist.musicbrainz_gid;
      console.log('got mbzId', $scope.mbzId);
      API.getArtistMbzInfo($scope.mbzId).then(function(mbzData) {
				console.log('got poop mbz data', mbzData);
				$scope.mbzData = mbzData;

        for (var i = 0; i < $scope.mbzData.relations.length; i++) {
          var current_rel = $scope.mbzData.relations[i];
          if (current_rel.type == "streaming music") {
            var url = current_rel.url.resource;
            var split_url = url.split('/');
            var id = split_url.pop();
						console.log('spot id', id);
            $scope.spotId = id;

						API.getArtistSpotify($scope.spotId).then(function(artist) {
							$scope.spotUsername = artist.name;
							$scope.spotFollowers = artist.followers.total;
							$scope.spotUrl = artist.external_urls.spotify;
						});

            API.getArtistSpotifyAlbums($scope.spotId).then(function(albums) {
              console.log('got spot artist albums', albums);
              $scope.albumUrls = [];
              $scope.singleUrls = [];
              $scope.appearsonUrls = [];
              albums.items.forEach(function(album) {
                console.log(album);
				      	if (album.album_type == 'album') {
									var url = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + album.uri + '&theme=white');
                  console.log('album embed url', url)
					      	$scope.albumUrls.push(url);
				      	}
				      	if (album.album_type == 'single') {
					      	var url = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + album.uri + '&theme=white');
                  console.log('single embed url', url)
					        $scope.singleUrls.push(url);
								}
				        if (album.album_type == 'appears-on') {
					     		var url = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + album.uri + '&theme=white');
                	console.log('appearson embed url', url)
					        $scope.appearsonUrls.push(url);
				        }
              })
            });
          }
        }
			});
		});

		API.getArtistSources($scope.artist).then(function(sources) {
			console.log('got poop openaura sources', sources);
			$scope.sourcedata = sources;

			for (var i=0; i < $scope.sourcedata.total_sources; i ++) {
				var current_source = $scope.sourcedata.sources[i]
				if (current_source.provider_name == "SoundCloud") {
					console.log('got scId', current_source.uid)
					$scope.scId = current_source.uid;

					API.getArtistScInfo($scope.scId).then(function(scUser) {
						console.log('got poop sc user info', scUser);
						$scope.scUser = scUser;
						$scope.scUsername = scUser.username;
						$scope.scUrl = scUser.permalink_url;
						$scope.scFollowers = scUser.followers_count;
						$scope.scUserWidgetUrl = $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=http://api.soundcloud.com/users/' + $scope.scId);
						console.log('sc userwidget url', $scope.scUserWidgetUrl)
					});
					API.getArtistScTracks($scope.scId).then(function(scTracks) {
						console.log('got controller sc user tracks', scTracks);
						$scope.scUserTracks = scTracks;
					});
				}
				if (current_source.provider_name == "Twitter") {
					console.log('got twitterUrl', current_source.url)
					var urlTemp = current_source.url;
					console.log(urlTemp);
					var urlParts = urlTemp.split('/');
					var username = urlParts.pop();
					//console.log("twitter username " + username);
					$scope.twitterUsername = username;
					$scope.twitterUrl = $sce.trustAsResourceUrl(current_source.url);
					API.getArtistTwitter($scope.twitterUsername).then(function(twitterUser) {
						$scope.twitterFollowers = twitterUser.followers_count;
					});
				}
				if (current_source.provider_name == "Facebook") {
					console.log('got fbUrl', current_source.url)
					$scope.fbUrl = $sce.trustAsResourceUrl(current_source.url);
					facebookUrl = $sce.trustAsResourceUrl(current_source.url);
				}
				if(current_source.provider_name == "YouTube") {
						console.log('got ytUrl', current_source.url)
						$scope.ytUrl = current_source.url;
						var urlTemp = current_source.url;
						//console.log(urlTemp);
						var urlParts = urlTemp.split('/');
						var id = urlParts.pop();
						console.log("youtube id " + id);
						ytId = id;
				}
			}
		});

		$('.yt').click(function() {
			API.getArtistYoutube(ytId).then(function(ytUser) {
				$scope.ytUsername = ytUser.items[0].snippet.title;
				$scope.ytSubscribers = ytUser.items[0].statistics.subscriberCount;
			});
			API.getArtistYoutubeVideos(ytId).then(function(videos) {
				$scope.ytVideos = videos;
			});
		});

		$('.fb').click(function() {
			var urlTemp = facebookUrl;
			urlTemp = urlTemp.toString().slice(0, -1);
			console.log(urlTemp);
			var urlParts = urlTemp.split('/');
			var username = urlParts.pop();
			$scope.fbUsername = username;
			console.log(username);
			var fbPicUrl = null;
			var fbFanCount = null;
			var allPosts = [];

			API.getFbPic(username).then(function(pic) {
				console.log('got fb pic', pic);
				var url = pic.picture.data.url;
				console.log(url);
				fbPicUrl = url;
				console.log(fbPicUrl);
				$scope.fbPicUrl = $sce.trustAsResourceUrl(pic.picture.data.url);
			});

			API.getFbFanCount(username).then(function(fans) {
				console.log('got fb fans', fans);
				var count = fans.fan_count;
				fbFanCount = count;
				console.log(fbFanCount);
				$scope.fbFanCount = fans.fan_count;
			});

			API.getFbFeed(username).then(function(feed) {
				$scope.fbPosts = feed;
			});
		});
	});



})();
