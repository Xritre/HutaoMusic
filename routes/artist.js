const express = require('express'),
      router = express.Router(),
      User = require('../models/user')
    //   TopFav = require('../models/topFav')
        Artist = require('../models/artist')
      Song = require('../models/song')
      passport = require('passport')
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

router.get('/',function(req,res)
{
    Artist.find({},function(err,foundArtist)
    {
        if(err)
        {
            console.log(err)

        }
        else
        {
           res.render('artist/index',{artists:foundArtist}) 
        }
    })
    
})

router.get('/new',function(req,res)
{
    Song.find({},function(err,foundSong)
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    res.render('artist/new',{songs:foundSong})
                }
            })

})

router.post('/',upload.single('coverImage'),function(req,res)
{
    if(req.file)
    {
        req.body.artist.coverImage = '/upload/image/' + req.file.filename
    }
    Artist.create(req.body.artist,function(err,newArtist)
    {
        if(err)
        {
            req.flash('error','There something wrong in adding artist ')
            res.redirect('/artists')
            console.log(err)
        }
        else
        {
            
            res.redirect('/artists')
        }
    })
})

router.get('/:id',middleware.isLoggedIn,function(req,res)
{
    Artist.findById(req.params.id).populate('songs').exec(function(err,foundArtist)
    {
        if(err)
        {
            console.log(err)
            res.redirect('/artists')
        }
        else
        {
            res.render('artist/show.ejs',{artist:foundArtist})
        }
    })
})

router.get('/:id/edit',function(req,res)
{
    Artist.findById(req.params.id).populate('songs').exec(function(err,foundArtist)
    {
        if(err)
        {
            console.log(err)
            res.redirect('/artists')
        }
        else
        {
            res.render('artist/edit.ejs',{artist:foundArtist})
        }
    })
})

router.put('/:id',upload.single('coverImage'),function(req,res)
{
    if(req.file)
    {
        req.body.artist.coverImage = '/upload/image/' + req.file.filename
    }
    
    Artist.findByIdAndUpdate(req.params.id,req.body.artist,function(err,updatedArtist)
    {
        if(err)
        {
            console.log(err)
            res.redirect('/artists/'+ req.params.id)
        }
        else
        {   
            res.redirect('/artists/'+ req.params.id)
            
            }
            Artist.findById(req.params.id,function(err,updatedArtist)
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    if(updatedArtist.songs.length > 0)
                {
                updatedArtist.songs.forEach(function(song)
                    {
                        
                        Song.findById(song._id,function(err,foundSong)
                        {
                            if(err)
                            {
                                console.log(err)
                            }
                            else
                            {
                                foundSong.artist.name = updatedArtist.name
                                foundSong.save()
                            }
                            
                        })
                    })  
                }
                    
                }
            })
            
    })
})


router.delete('/:id',function(req,res)
{
    Artist.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            console.log(err)
            res.redirect('/artists')
        }
        else
        {
            res.redirect('/artists')
        }
    })
})
module.exports = router;