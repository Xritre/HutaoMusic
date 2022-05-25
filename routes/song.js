const { append, render } = require('express/lib/response');
const middlewareObj = require('../middleware/index');

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
    Song.find({}, function(err,foundSong)
    {
        if(err)
        {
            console.log(err)
            req.flash('error', 'There is something wrong')
        }
        else
        {
             res.render('song/index.ejs',{songs:foundSong})
        }
    })
   
})

router.get('/new',function(req,res)
{
    Artist.find({},function(err,artists)
    {
        if(err)
        {
            console.log(err)
            res.redirect('/songs')
        }
        else
        {
            res.render('song/new.ejs',{artists:artists})
        }
    })
    
})

router.post('/',upload.fields([{name:'coverImage',maxCount:1},{name:'songFile',maxCount:1}]),function(req,res)
{
    if(req.files['coverImage'])
    {
        req.body.song.coverImage = '/upload/image/' + req.files['coverImage'][0].filename
    }
    if(req.files['songFile'])
    {
        req.body.song.songFile = '/upload/song/' + req.files['songFile'][0].filename
    }
    req.body.song.lyric = req.body.lyric
    Artist.findById(req.body.artist,function(err,foundArtist)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('ADD new song : ' +  req.body.song.name +' I found artist ' + foundArtist.name  )
            req.body.song.artist = {
                name:foundArtist.name,
                id:foundArtist._id
            }
            Song.create(req.body.song,function(err,songAdd)
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    foundArtist.songs.push(songAdd)
                    foundArtist.save()
                    res.redirect('/songs')
                }
            })
                }
            })
    

})

router.get('/:id',middleware.isLoggedIn,function(req,res)
{
    Song.findById(req.params.id,function(err,songAdd)
    {
        if(err)
        {
            req.flash('error','Could not find this song')
            console.log(err)
        }
        else
        {
            res.render('song/show.ejs',{song:songAdd})
        }

    })
})

router.get('/:id/edit',middleware.isAdmin,function(req,res)
{
   
    Song.findById(req.params.id,function(err,foundSong)
    {
        if(err)
        {
            req.flash('error','Something wromg')
            res.redirect('back')
            console.log(err)
        }
        else
        {
            Artist.find({},function(err,artists)
            {
                if(err)
                {
                    console.log(err)
                    res.redirect('back')
                }
                else
                {
                     res.render('song/edit',{song:foundSong,artists:artists})
                }
        })
           
        }
    })
})

router.put('/:id',middleware.isAdmin,upload.fields([{name:'coverImage',maxCount:1},{name:'songFile',maxCount:1}]),function(req,res)
{
    if(req.files['coverImage'])
    {
        req.body.song.coverImage = '/upload/image/' + req.files['coverImage'][0].filename
    }
    if(req.files['songFile'])
    {
        req.body.song.songFile = '/upload/song/' + req.files['songFile'][0].filename
    }
    req.body.song.lyric = req.body.lyric
    Artist.findById(req.body.artist,function(err,foundArtist)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            req.body.song.artist = {
                name:foundArtist.name,
                id:foundArtist._id
            }
            Song.findByIdAndUpdate(req.params.id,req.body.song, function(err, updatedSong)
            {
                if(err)
                {
                    console.log(err)
                    res.redirect('/songs/')
                }
                else
                {
                    foundArtist.songs.push(updatedSong)
                    foundArtist.save()
                    console.log('Edit song : ' +  updatedSong.name +' I found artist ' + foundArtist.name  )
                    res.redirect('/songs/' + req.params.id )
                }
            })
            
        }
    })
            
})

router.delete('/:id', function(req,res)
{
    Song.findById(req.params.id,function(err,foundSong)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            Song.findById(req.params.id,function(err,foundSong)
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    Artist.findById(foundSong.artist.id,function(err,foundArtist)
                    {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {
                            // foundArtist.update({songs:{_id: foundSong._id}, {"$pull":{}}})
                        }
                    })
                }
            })
                    
                     Song.findByIdAndRemove(req.params.id,function(err)
                    {
                        if(err)
                        {
                            console.log(err)
                            res.redirect('/songs/')
                        }
                        else
                        {
                            console.log('remove song  success')
                            res.redirect('/songs/')
                        }
                    })
                
            
               
            
        }
    })

    
})

module.exports = router;