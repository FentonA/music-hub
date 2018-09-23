//=====================================
//COMMENTS
//====================================
var express = 	require("express");
var router 	=	express.Router({mergeParams:true});
var	Lyric	= require("../models/lyrics");
var Comments 	= require("../models/comments");
var middleware	= require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
	Lyric.findById(req.params.id, function(err, lyric){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {lyric: lyric});
		}
	});
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	Lyric.findById(req.params.id, function(err, lyric){
		if(err){
			console.log(err);
			res.redirect("/lyrics");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user.id;
					comment.author.username = req.user.username;
					comment.save();
					//
					lyric.comments.push(comment);
					lyric.save();
					res.redirect("/lyrics/" + lyric._id);
				}
			});
		}
	});
});
//Comments edit route

	router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");

			}else{
				res.render("comments/edit", {lyric_id: req.params.id, comment: foundComment});
			}
		});

	});

//Comment update	
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back")
		}else{
			res.redirect("/lyrics/" + req.params.id);
		}
	});
});

//COmment destroy 
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/lyrics/" + req.params.id);
        }
    });
});

module.exports = router;