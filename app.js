const express        = require('express'),
      app            = express(),
      bodyParser     = require("body-parser")
      mongoose       = require("mongoose"),
      passport       = require("passport");
      LocalStrategy  = require("passport-local"),
      flash          = require('connect-flash'),
      methodOverride   = require('method-override'),
      Artist        = require("./models/artist"),
      Song             = require("./models/song"),
      User           = require("./models/user"),
      seedDB         = require("./seeds.js")
    
      

const indexRoutes = require('./routes/index'),
       artistRoutes = require('./routes/artist'),
      songRoutes = require('./routes/song')
    //   ,topFavRoutes = require('./routes/topfav')

mongoose.connect('mongodb://localhost/HutaoMusic');      
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//seedDB();

app.use(require('express-session')
({
    secret: 'secret word',
    resave: false,
    saveUnintialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next)
{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();
})


app.use('/', indexRoutes);
app.use('/songs', songRoutes);
app.use('/artists', artistRoutes);

app.listen(3000, function(){
    console.log("Activated");
});
