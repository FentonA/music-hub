var express 	= require("express"),
	bodyParser  = require("body-parser"),
	mongoose 	= require("mongoose"),
	Lyric		= require("./models/lyrics"),
	Comments 	= require("./models/comments"),
	passport	= require("passport"),
	localStrategy	= require("passport-local"),
	methodOverride	= require("method-override"),
	user 			= require("./models/user"),
	seedDB			= require("./seed"),
	flash			= require("connect-flash");
	app			= express();

var commentRoutes		= require("./routes/comments"),
	lyricRoutes	= require("./routes/lyrics"),
	indexRoutes			= require("./routes/index");


mongoose.connect("mongodb://musicHub_Alpha:Yulia1716@ds111993.mlab.com:11993/music_hub");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

seedDB();

// var Lyric = mongoose.model("Lyric", lyricsSchema);

app.use(require("express-session")({
	secret:"Deal the Diamond",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error =	req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/lyrics", lyricRoutes);
app.use("/lyrics/:id/comments", commentRoutes);

//server 
app.listen(3000);
console.log("server is listening");