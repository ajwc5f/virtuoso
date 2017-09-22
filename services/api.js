(function() {

	var module = angular.module('PlayerApp');

	module.factory('API', function($q, $http) {
				var spotifyBaseUrl = 'https://api.spotify.com/v1';
				var spotifyAccessToken = 'BQAPCzhjn02oCxKRIDosbzxeUQ7_XqxmyyPdraCClbTOoxR4fmGxt9op10Eo8xHxmE5AmGSawOlbZI0zR81Law';

				var twitterBaseUrl = 'https://api.twitter.com/1.1';
				var twitterAccessToken = 'AAAAAAAAAAAAAAAAAAAAADCp2QAAAAAAK%2FmdK2IkyvO74HZk39l4LyJ61dc%3Db9gu2O1ZUxouINxeluVrpC3juqtLdGHt5D6tBLfCaYuf1sOeKz';

        var mbrainzBaseUrl = 'https://musicbrainz.org/ws/2';

        var oaBaseUrl = 'http://api.openaura.com/v1';
        var oaApiKey = '91cd7ba5921416a8351f35b01fec97601a3b4403';

        var wikiBaseUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts';

        var scBaseUrl = 'http://api.soundcloud.com';
        var scClientId = 'I6a0W6fGJlNxowC1ZuKTPUcr4nHK1Dhf';

				var ytBaseUrl = 'https://www.googleapis.com/youtube/v3';
				var ytKey = 'AIzaSyBqIBvlY_2-uMxKbmHp3JDwA-cNRirZ5ww';

        var fbBaseUrl = 'https://graph.facebook.com/v2.10';
        var fbAccessTok = '1504637726223673|tluJNcepwFQntYm-PhglsXD3tKk';


		return {

			getTrack: function(trackid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/tracks/' + encodeURIComponent(trackid), {
					headers: {
						'Authorization': 'Bearer ' + spotifyAccessToken
					}
				}).success(function(r) {
					console.log('got track', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getTracks: function(trackids) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/tracks/?ids=' + encodeURIComponent(trackids.join(',')), {
					headers: {
						'Authorization': 'Bearer ' + spotifyAccessToken
					}
				}).success(function(r) {
					console.log('got tracks', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getAlbum: function(albumid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/albums/' + encodeURIComponent(albumid), {
					headers: {
						'Authorization': 'Bearer ' + spotifyAccessToken
					}
				}).success(function(r) {
					console.log('got album', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getAlbumTracks: function(albumid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/albums/' + encodeURIComponent(albumid) + '/tracks', {
					headers: {
						'Authorization': 'Bearer ' + spotifyAccessToken
					}
				}).success(function(r) {
					console.log('got album tracks', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getArtist: function(artistid) {
				var ret = $q.defer();
				$http.get(oaBaseUrl + '/info/artists/' + encodeURIComponent(artistid) + '?id_type=oa%3Aartist_id&api_key=' + oaApiKey, {
				}).success(function(r) {
					console.log('got openaura artist info', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getArtistSources: function(artistid) {
				var ret = $q.defer();
				$http.get(oaBaseUrl + '/source/artists/' + encodeURIComponent(artistid) + '?id_type=oa%3Aartist_id&api_key=' + oaApiKey, {
				}).success(function(r) {
					console.log('got openaura artist sources info', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getArtistScInfo: function(scid) {
				var ret = $q.defer();
				$http.get(scBaseUrl + '/users/' + encodeURIComponent(scid) + '?client_id=' + scClientId, {
				}).success(function(r) {
					console.log('got sc user info', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getArtistScTracks: function(scid) {
				var ret = $q.defer();
				$http.get(scBaseUrl + '/users/' + encodeURIComponent(scid) + '/tracks?client_id=' + scClientId, {
				}).success(function(r) {
					console.log('got sc user tracks', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getArtistMbzInfo: function(mbzid) {
				var ret = $q.defer();
				$http.get(mbrainzBaseUrl + '/artist/' + encodeURIComponent(mbzid) + '?inc=url-rels&fmt=json', {
				}).success(function(r) {
					console.log('got mbz artist info', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getSpotArtist: function(spotid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/artists/' + encodeURIComponent(spotid), {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					console.log('got artist', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getFbPic: function(fbUsername) {
        var ret = $q.defer();
				$http.get(fbBaseUrl + '/' + encodeURIComponent(fbUsername) + '?fields=picture&access_token=' + fbAccessTok, {
				}).success(function(r) {
					console.log('got facebook profile pic', r);
					ret.resolve(r);
				});
				return ret.promise;
      },

      getFbFeed: function(fbUsername) {
        var ret = $q.defer();
				const fbFeed = [];
				$http.get(fbBaseUrl + '/' + encodeURIComponent(fbUsername) + '/posts?access_token=' + fbAccessTok, {
				}).success(function(r) {
					console.log('got facebook feed', r);
					const tempFeed = r.data;
					var num_posts = tempFeed.length;
					for (var i=0; i < num_posts; i++) {
						const ind = i;
						const postId = tempFeed[ind].id;
						const message = tempFeed[ind].message;
						const time = tempFeed[ind].created_time;
						if (tempFeed[ind].message) {
							$http.get(fbBaseUrl + '/' + encodeURIComponent(postId) + '/likes?summary=true&access_token=' + fbAccessTok, {
							}).success(function(r) {
								//console.log('got post likes', r);
								const likes = r.summary.total_count;
								$http.get(fbBaseUrl + '/' + encodeURIComponent(postId) + '/comments?summary=true&access_token=' + fbAccessTok, {
								}).success(function(r) {
									//console.log('got facebook post comments', r);
									const comments = r.summary.total_count;
									$http.get(fbBaseUrl + '/' + encodeURIComponent(postId) + '/attachments?access_token=' + fbAccessTok, {
									}).success(function(r) {
										//console.log('got facebook post attachments', r.data[0]);
										const attachment = r.data[0];
										var post = {date:"", message:"", likes:"", comments:"", attachmentSrc:"", attachmentType:"", attachmentUrl: "", attachmentTitle: ""};
										var date = new Date(time);
										post.date = date.toDateString();
										post.message = message;
										post.likes = likes;
										post.comments = comments;
										if (attachment && attachment.media) {
											console.log('got facebook post attachments', attachment);
											post.attachmentSrc = attachment.media.image.src;
											//console.log(attachment.media.image.src);
											post.attachmentType = attachment.type;
											//console.log(attachment.media.type);
											post.attachmentUrl = attachment.url;
											//console.log(attachment.media.url);
											post.attachmentTitle = attachment.title;
											//console.log(attachment.media.title);
										}
										//console.log(post.message + " " + post.likes + " " + post.comments);
										fbFeed.push(post);
									});
								});
							});
						}
					}
					ret.resolve(fbFeed);
				});
				return ret.promise;
      },

      getFbFanCount: function(fbUsername) {
        var ret = $q.defer();
				$http.get(fbBaseUrl + '/' + encodeURIComponent(fbUsername) + '?fields=fan_count&access_token=' + fbAccessTok, {
				}).success(function(r) {
					console.log('got facebook fan count', r);
					ret.resolve(r);
				});
				return ret.promise;
      },

      getFbPost: function(postId) {
        var ret = $q.defer();
				$http.get(fbBaseUrl + '/' + encodeURIComponent(postId) + '?access_token=' + fbAccessTok, {
				}).success(function(r) {
					console.log('got facebook post', r);
					ret.resolve(r);
				});
				return ret.promise;
      },

      getFbPostAttachments: function(postId) {
        var ret = $q.defer();
				$http.get(fbBaseUrl + '/' + encodeURIComponent(postId) + '/attachments?access_token=' + fbAccessTok, {
				}).success(function(r) {
					console.log('got facebook post attachments', r);
					ret.resolve(r);
				});
				return ret.promise;
      },

			getArtistSpotify: function(spotid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/artists/' + encodeURIComponent(spotid), {
					headers: {
						'Authorization': 'Bearer ' + spotifyAccessToken
					}
				}).success(function(r) {
					console.log('got artist albums', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistSpotifyAlbums: function(spotid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/artists/' + encodeURIComponent(spotid) + '/albums?market=us', {
					headers: {
						'Authorization': 'Bearer ' + spotifyAccessToken
					}
				}).success(function(r) {
					console.log('got artist albums', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistTwitter: function(twitterUsername) {
				var ret = $q.defer();
				$http.get(twitterBaseUrl + '/users/show.json?screen_name=' + encodeURIComponent(twitterUsername), {
					headers: {
						'Authorization': 'Bearer ' + twitterAccessToken
					}
				}).success(function(r) {
					console.log('got twitter followers count', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistYoutube: function(channelId) {
				var ret = $q.defer();
				$http.get(ytBaseUrl + '/channels?part=snippet,statistics&id=' + encodeURIComponent(channelId) + '&key=' + ytKey, {
				}).success(function(r) {
					console.log('got youtube info', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistYoutubeVideos: function(channelId) {
				const videos = [];
				var ret = $q.defer();
				$http.get(ytBaseUrl + '/search?order=date&part=snippet&channelId=' + encodeURIComponent(channelId) + '&maxResults=10&key=' + ytKey, {
				}).success(function(r) {
					console.log('got youtube videos', r);
					var num_videos = r.items.length;
					for (var i = 0; i < num_videos; i++) {
						const id = r.items[i].id.videoId;
						const title = r.items[i].snippet.title;
						//console.log(id);
						//https://www.googleapis.com/youtube/v3/videos?part=player&id={videoId}&key=api key
						$http.get(ytBaseUrl + '/videos?part=player&id=' + id + '&key=' + ytKey, {
						}).success(function(r) {
							console.log(r);
							var curr_video = {title:"", iframe:""};
							curr_video.title = title;
							curr_video.iframe = r.items[0].player.embedHtml;
							videos.push(curr_video);
						});
					}
					ret.resolve(videos);
				});
				return ret.promise;
			},

			getArtistTopTracks: function(spotid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/artists/' + encodeURIComponent(spotid) + '/top-tracks', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					console.log('got spot top tracks', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

			getArtistRelatedArtists: function(artistid) {
				var ret = $q.defer();
				$http.get(spotifyBaseUrl + '/artists/' + encodeURIComponent(artistid) + '/related-artists', {
					headers: {
						'Authorization': 'Bearer ' + Auth.getAccessToken()
					}
				}).success(function(r) {
					console.log('got related artists', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getOaSearchResults: function(query) {
				var ret = $q.defer();
				$http.get(oaBaseUrl + '/search/artists?q=' + encodeURIComponent(query) + '&api_key=' + oaApiKey, {
				}).success(function(r) {
					console.log('got openaura search results', r);
					ret.resolve(r);
				});
				return ret.promise;
			},

      getSearchResults: function(query) {
				var ret = $q.defer();
				$http.get(oaBaseUrl + '/search/artists?q=' + encodeURIComponent(query) + '&api_key=' + oaApiKey, {
				}).success(function(r) {
					console.log('got openaura search results', r);
					ret.resolve(r);
				});
				return ret.promise;
			}
		};
	});

})();
