var express = require("express");
var router 	= express.Router();
var Lyric	= require("../models/lyrics");
var Comment 	= require("../models/comments");
var middleware	= require("../middleware");

router.get("/", function(req, res){
	//get all featured lyrics
	Lyric.find({}, function(err, alllyrics){
		if(err){
			console.log(err);
		}else {
			res.render("lyrics/index", {lyrics:alllyrics, currentUser: req.user});
		}
	});
	
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("lyrics/new");
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){

	var name = req.body.name;
	var image = req.body.image;
	var lyric = req.body.lyric;
	var transl = req.body.translation;
	var author	={
		id: req.user._id,
		username: req.user.username
	};
	var newLyric = {name: name, image: image, translation: transl, lyric: lyric, author: author};
	
	Lyric.create(newLyric, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
		res.redirect("/lyrics");
	}
	});
});
//SHOW
router.get("/:id",function(req, res){
	//find the campground with provided ID
	Lyric.findById(req.params.id).populate("comments").exec(function(err, foundLyric){
		if(err){
			console.log(err);
		} else {
			res.render("lyrics/show", {lyric: foundLyric});
		}
	});
});

//Edit lyrics route 
router.get("/:id/edit",  function(req, res){
	Lyric.findById(req.params.id, function(err, foundLyric){
		res.render("lyrics/edit", {lyric: foundLyric});
	});
});

//Update
router.put("/:id/", function(req, res){
	Lyric.findByIdAndUpdate(req.params.id, req.body.lyric, function(err, updatedLyric){
		if(err){
			res.redirect("/lyrics");
		} else{
			res.redirect("/lyrics/" + req.params.id);
		}
	});
});

//Destory lyric route
router.delete("/:id", function(req, res){
	Lyric.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/lyrics");
		} else{
			res.redirect("/lyrics");
		}
	})
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}res.redirect("/login");
	
}

module.exports = router;

