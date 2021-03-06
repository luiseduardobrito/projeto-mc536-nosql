var request = require("request");

var LASTFM_API_KEY = "8d081b73906ac02eb5471fb169844012";
var LASTFM_SIMILAR_URL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&api_key="+LASTFM_API_KEY+"&format=json&artist="
var LASTFM_ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key="+LASTFM_API_KEY+"&format=json&artist="

var ECHONEST_API_KEY = "BB47HHMVRUJG6ZQSJ";
var ECHONEST_ARTIST_SEARCH = "http://developer.echonest.com/api/v4/artist/search?api_key="+ECHONEST_API_KEY+"&format=json&results=1&name=";

module.exports = {

	attributes: {

		name: {

			type: "string",
			index: true,
			unique: true
		},

		url: {

			type: "url",
			index: true,
			unique: true
		},

		bio: "string",
		img: "url",
		
		tags: "array",
		members: "array",
		stats: "json",

		getSimilar: function(cb) {

			request(LASTFM_SIMILAR_URL + encodeURI(this.name), function(err, response, body) {
				var artists = JSON.parse(body).similarartists.artist;
				cb(artists);
			})
		}
	},

	beforeCreate: function(values, cb) {

		var artist_name = values.name;

		request(ECHONEST_ARTIST_SEARCH + encodeURI(artist_name), function(err, response, body) {

			var artists = JSON.parse(body).response.artists;

			if(artists && artists.length) {
				artist_name = artists[0].name;
			}

			request(LASTFM_ARTIST_URL + encodeURI(artist_name), function(err, response, body) {

				var artist = JSON.parse(body).artist;

				// data mining
				values.name = artist.name;
				values.url = artist.url;
				values.tags = artist.tags && artist.tags.tag ? artist.tags.tag : [];
				values.bio = artist.bio && artist.bio.content ? artist.bio.content : null;

				if(artist.image.length)
					values.img = artist.image[artist.image.length - 1]["#text"];

				cb();
			});
		});
	},

	beforeUpdate: function(values, cb) {

		var artist_name = values.name;

		request(ECHONEST_ARTIST_SEARCH + encodeURI(artist_name), function(err, response, body) {

			var artists = JSON.parse(body).response.artists;

			if(artists && artists.length) {
				artist_name = artists[0].name;
			}

			request(LASTFM_ARTIST_URL + encodeURI(artist_name), function(err, response, body) {

				var artist = JSON.parse(body).artist;

				// data mining
				values.name = artist.name;
				values.url = artist.url;
				values.tags = artist.tags && artist.tags.tag ? artist.tags.tag : [];
				values.bio = artist.bio && artist.bio.content ? artist.bio.content : null;

				if(artist.image.length)
					values.img = artist.image[artist.image.length - 1]["#text"];

				cb();
			});
		});
	}
};

