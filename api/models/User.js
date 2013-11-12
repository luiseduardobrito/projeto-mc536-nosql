/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
  	
		name: "string",
		login: "string",
		image: "url",
		hometown: "string",

		password: {

			type: "string",
			defaultsTo: "senha"
		},

		likes: "array",
		friends: "array",

		getFriends: function() {
			return null;
		},

		getRecommendation: function() {
			return null;
		},

		toJSON: function() {

			var obj = this.toObject();
			delete obj.password;
			return obj;
		}
	}
};
