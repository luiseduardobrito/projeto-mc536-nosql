/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
	index: function(req, res) {

		var params = {}

		if(req.param("name"))
			params.name = req.param("name")

		User
			.find(params)
			.done(function(err, docs) {

				if(err) {

					res.json({
						result: "error",
						msg: "no user found"
					}, 404)
				}

				else if(!docs.length) {

					User
						.create({
							name: req.param("name"),
							image: req.param("image") || null,
							login: req.param("login")
						})
						.done(function(err, doc) {
							res.json(doc)
						})
				}

				else
					res.json(docs[0])
			})
	},

	addFriend: function(req, res) {
		
		User
			.findOne()
	}
  
};
