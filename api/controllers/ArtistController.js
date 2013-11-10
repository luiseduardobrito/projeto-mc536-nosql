var request = require("request");

module.exports = {

	autocomplete: function(req, res) {

		var query = req.param("term");
		var req_url = "http://developer.echonest.com/api/v4/artist/suggest?api_key=BB47HHMVRUJG6ZQSJ&results=5&name=" + query;

		request(req_url, function(err, response, body) {

			var artists = JSON.parse(body).response.artists || [];

			var arr = [];

			for(var i = 0; i < artists.length; i++)
				arr.push(artists[i].name);

			res.json(arr);
		});
	}
};
