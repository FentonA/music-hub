var mongoose = require("mongoose");
var lyricsSchema = new mongoose.Schema({
	name: String,
	image: String,
	lyric: String,
	translation: String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	},
	comments:[
	{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}
	]
});


module.exports = mongoose.model("Lyric", lyricsSchema);