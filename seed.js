var mongoose = require("mongoose");
var user = require("./models/user");

var data = [
	{
		username:"nagatsumaAdmin",
		password: "Kayumu9317",
		isAdmin: true
	}
	]


function seedDB(){
	//create and seed the administrator into the Database
	data.forEach(function(seed){
		user.register(seed, function(err, user){
			if(err){
				console.log(err);
			} else {
				console.log("admin added/ logged in");
				passport.authenticate("seed")(req, res, function(){
					res.redirect("/lyrics");
				});
			}
		});
	});

}

module.exports = seedDB;