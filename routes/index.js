const { resourceUsage } = require('process');
const middlewareObj = require('../middleware');
const playlist = require('../models/playlist');

const express = require('express'),
      router = express.Router(),
      User = require('../models/user')
    //   TopFav = require('../models/topFav')
    //   Artist = require('../models/artist')
      Song = require('../models/song'),
      Playlist = require('../models/playlist')
      passport = require('passport');
      multer = require('multer'),
      path = require('path'),
      storage = multer.diskStorage({
                    destination:function(req, file, callback)
                    {
                        if(file.originalname.match(/\.(jpg|jpeg|png|gif)$/i))
                        {
                            callback(null,'./public/upload/image');
                        }
                        if(file.originalname.match(/\.(mp3)$/i))
                        {
                            callback(null,'./public/upload/song');
                        }
                    },
                    filename: function(req, file, callback)
                    {
                        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                    }
      }),
      songFilter = function(req, file, callback)
      {
             if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i) && file.fieldname === 'coverImage')
            {
                return callback(new Error('Only jpg ,jpeg, png and gif.'), false)
            } 
          
            if(!file.originalname.match(/\.(mp3)$/i) && file.fieldname === 'songFile')
            {
                return callback(new Error('Only mp3.'), false)
            } 
          
          callback(null, true)
      },
      upload = multer({storage: storage, fileFilter:songFilter}),
      middleware = require('../middleware/index')


router.get("/",function(req,res){
   
        res.render("landing.ejs");

});


router.get("/register",function(req,res)
{
    res.render("register.ejs")    
})


router.post('/register',function(req,res)
{
    let newUser = new User({username:req.body.username,firstName:req.body.firstName,lastName:req.body.lastName})
    if(req.body.adminCode ==='secret')
    {
        newUser.isAdmin = true
    }
    User.register(newUser,req.body.password, function(err, user)
    {
        if(err)
        {
            console.log(err)
            return res.redirect('/register')
        }
        else
        {
            passport.authenticate('local')(req, res, function()
                {
                    res.redirect('/');
                })
            
        }
    })
})

router.get("/login",function(req,res)
{

    res.render("login.ejs")    
})

router.post('/login', passport.authenticate('local',
    // Middleware is function ที่จะทำงาน before callback function
    {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash:true, 
        failureFlash:true,
        successFlash: 'Suceessfully login',
        failureFlash: 'Invalid username or password'
    })
    // Callback function 
    ,function(req, res)
        {
            
        }
)

router.get('/logout', function(req,res)
{
    req.logout();
    req.flash('success', 'Log out successfully')
    res.redirect('/');
})


router.get('/users/:id',middleware.isLoggedIn, function(req,res)
{
    User.findById(req.params.id,function(err,foundUser)
    {
        if(err)
        {
            req.flash('error','There is something wrong ')
            res.redirect('/')
            console.log(err)
        }
        else
        {
            
                        res.render('user/show.ejs',{user:foundUser})
                    
            
        }
    })
})

router.get('/users/:id/edit',middlewareObj.isLoggedIn,function(req,res)
{
    User.findById(req.params.id,function(err,foundUser)
    {
        if(err)
                {
                    req.flash('error', 'There is something wrong')
                    return res.redirect('/')
                }
                else
                    {
                        
                        res.render('user/edit.ejs',{user:foundUser})
                    }
    })
})

router.put('/users/:id',middlewareObj.isLoggedIn,upload.single('profileImage'),function(req,res)
{
    if(req.file)
    {
        req.body.user.profileImage = '/upload/image/' + req.file.filename
    }
    User.findByIdAndUpdate(req.params.id ,req.body.user,function(err,updareUser)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.redirect('/users/' + req.user._id)
        }
    })
})

router.get('/allUser',middlewareObj.isAdmin,function(req,res)
{
    User.find({},function(err,users){
        if(err)
        {
            req.flash('error', 'There is something wrong')
            return res.redirect('/')
        }
        else
        {
            
            res.render('user/delete.ejs',{users:users})
        }
    })
})

router.delete('/allUser/delete/:id',middlewareObj.isAdmin,function(req,res){
    
    User.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
           console.log('remove successfully')
        res.redirect('/allUser') 
        }
        
    })
})

router.post('/search', function(req, res){
    Artist.find({name:{$regex:req.body.searchButton, $options: "i"}}, function(err, foundArtist){
        if(err){
            console.log(err);
        }else {
            Song.find({name:{$regex:req.body.searchButton, $options: "i"}}, function(err, foundSong){
                res.render('search.ejs', {artists:foundArtist,songs:foundSong});
            })
           

        }
    });
})



module.exports = router;