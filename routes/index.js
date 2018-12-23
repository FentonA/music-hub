
var express = require("express");
var router	= express.Router();
var passport	= require("passport");
var user 		= require("../models/user");

//INDEX
router.get("/", function(req, res){
	res.render("landing");
});

//=======================
//Auth Routes
//======================

router.get("/register", function(req, res){
	res.render("register");
});
router.post("/register", function(req, res){
		var newUser = new user ({username:req.body.username});
		if(req.body.adminCode ==='Shunkunton1983'){
			newUser.isAdmin = true;
		}
		user.register(newUser, req.body.password, function(err, user){
			if(err){
				req.flash("error", err.message);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Welcome to musicHub" + user.username);
				res.redirect("/lyrics");
			});
		});
	});

//Show login form 
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local",
{
	successRedirect: "/lyrics",
	failureRedirect: "/login"
}), function(req, res){

});

//Logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/lyrics");
});

function isLoggedIn(req, res, next){
	if(req.isAuthentcated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;