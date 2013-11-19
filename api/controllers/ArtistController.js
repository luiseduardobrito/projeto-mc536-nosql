var request = require("request");
var redis = require("redis");

var redisClient = redis.createClient();
// handle errors
redisClient.on("error", function (err) {
	console.log("Error " + err);
});

module.exports = {

	index: function(req, res) {

		Artist
			.findByName(req.param("name"))
			.done(function(err, docs) {

				if(err) {

					res.json({
						result: "error",
						msg: "no artist found"
					}, 404)
				}

				else if(!docs.length) {

					Artist
						.create({
							name: req.param("name")
						})
						.done(function(err, doc) {
							res.json(doc)
						})
				}

				else
					res.json(docs[0])
			})
	},

	autocomplete: function(req, res) {

		var query = req.param("term");

		console.log("getting autocomplete from echonest...");

		var req_url = "http://developer.echonest.com/api/v4/artist/suggest?api_key=BB47HHMVRUJG6ZQSJ&results=5&name=" + query;

		request(req_url, function(err, response, body) {

			if(err) console.log(err);

			var artists = JSON.parse(body).response.artists || [];

			var arr = [];

			for(var i = 0; i < artists.length; i++)
				arr.push(artists[i].name);

			// save in cache
			redisClient.hset(query, "expires", Date.now() + 15 * 6000); // expires in 15 minutes
			redisClient.hset(query, "values", JSON.stringify(arr)); // expires in 15 minutes

			// serve response
			res.json(arr);
		});
	}
};
