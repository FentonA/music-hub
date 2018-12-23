var mongoose = require("mongoose");

var notesSchema = mongoose.Schema({
	name:String,
	note:String,

})

model.exports = mongoose.model("notes", notesSchema);

