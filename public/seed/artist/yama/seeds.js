const mongoose = require("mongoose"),
        Song = require("./models/song"),
        Artist = require("./models/artist"),
        TopFav = require("./models/topFav")

const dataArtist = [
    {
        name:'Takayan',
        coverImage:'/seed/artist/takayan/takayan.jpg'
    },
    {
        name:'Haruno',
        coverImage:'/seed/artist/haruno/haruno.jpg'
    },
    {
        name:'Eve',
        coverImage:'/seed/artist/eve/eve.jpg'
    },
    {
        name:'Aimer',
        coverImage:'/seed/artist/aimer/aimer.jpg'
    },
    {
        name:'Yama',
        coverImage:'/seed/artist/yama/yama.jpg'
    },
    {
        name:'ZUTOMAYO',
        coverImage:'/seed/artist/zutomayo/zutomayo.jpg'
    }

]

const dataSong =
[
    {
        name:'As you like it',
        coverImage:'/seed/artist/eve/As you like it.jpg',
        songFile:'/seed/artist/eve/As you like it.mp3'
    },
    {
        name:'How to eat life',
        coverImage:'/seed/artist/eve/How to eat life.jpg',
        songFile:'/seed/artist/eve/How to eat life.mp3'
    },
    {
        name:'kaikaikitan',
        coverImage:'/seed/artist/eve/kaikaikitan.jpg',
        songFile:'/seed/artist/eve/kaikaikitan.mp3'
    },
    {
        name:'Outsider',
        coverImage:'/seed/artist/eve/Outsider.jpg',
        songFile:'/seed/artist/eve/Outsider.mp3'
    },
    {
        name:'Dramaturgy',
        coverImage:'/seed/artist/eve/Dramaturgy.jpg',
        songFile:'/seed/artist/eve/Dramaturgy.mp3'
    },
    {
        name:'Sister',
        coverImage:'/seed/artist/eve/sister.jpg',
        songFile:'/seed/artist/eve/sister.mp3'
    }, 
    {
        name:'The Secret About That Girl',
        coverImage:'/seed/artist/eve/The Secret About That Girl.jpg',
        songFile:'/seed/artist/eve/The Secret About That Girl.mp3'
    },
    {
        name:'raison d’etre',
        coverImage:'/seed/artist/eve/raison d’etre.jpg',
        songFile:'/seed/artist/eve/raison d’etre.mp3'
    },
    {
        name:'HACHI (cover)',
        coverImage:'/seed/artist/eve/HACHI (cover).jpg',
        songFile:'/seed/artist/eve/砂の惑星 / ハチ(cover).mp3'
    },
    {
        name:'Heart Forecast',
        coverImage:'/seed/artist/eve/Heart Forecast.jpg',
        songFile:'/seed/artist/eve/Heart Forecast.mp3'
    },
    {
        name:'Mabel (cover)',
        coverImage:'/seed/artist/eve/Mabel (cover).jpg',
        songFile:'/seed/artist/eve/Mabel (cover).mp3'
    },
    {
        name:'Gunjo Sanka',
        coverImage:'/seed/artist/eve/Gunjo Sanka.jpg',
        songFile:'/seed/artist/eve/Gunjo Sanka.mp3'
    },
    {
        name:'Taikutsuwo Saienshinaide',
        coverImage:'/seed/artist/eve/Taikutsuwo Saienshinaide.jpg',
        songFile:'/seed/artist/eve/Taikutsuwo Saienshinaide.mp3'
    },
    {
        name:'MIRROR TUNE',
        coverImage:'/seed/artist/zutomayo/MIRROR TUNE.jpg',
        songFile:'/seed/artist/zutomayo/MIRROR TUNE.mp3'
    },
    {
        name:'MILABO',
        coverImage:'/seed/artist/zutomayo/MILABO.jpg',
        songFile:'/seed/artist/zutomayo/MILABO.mp3'
    },
    {
        name:'Stay Foolish',
        coverImage:'/seed/artist/zutomayo/Stay Foolish.jpg',
        songFile:'/seed/artist/zutomayo/Stay Foolish.mp3'
    },
    {
        name:'Neko Reset',
        coverImage:'/seed/artist/zutomayo/Neko Reset.jpg',
        songFile:'/seed/artist/zutomayo/Neko Reset.mp3'
    },
    {
        name:'Ham',
        coverImage:'/seed/artist/zutomayo/Ham.jpg',
        songFile:'/seed/artist/zutomayo/Ham.mp3'
    },
    {
        name:'Mabushii DNA Dake',
        coverImage:'/seed/artist/zutomayo/Mabushii DNA Dake.jpg',
        songFile:'/seed/artist/zutomayo/Mabushii DNA Dake.mp3'
    },
    {
        name:'Nourijyouno Cracker',
        coverImage:'/seed/artist/zutomayo/Nourijyouno Cracker.jpg',
        songFile:'/seed/artist/zutomayo/Nourijyouno Cracker.mp3'
    },

    {
        name:'Byoushinwo Kamu',
        coverImage:'/seed/artist/zutomayo/Byoushinwo Kamu.jpg',
        songFile:'/seed/artist/zutomayo/Byoushinwo Kamu.mp3'
    },
    {
        name:'Seigi',
        coverImage:'/seed/artist/zutomayo/Seigi.jpg',
        songFile:'/seed/artist/zutomayo/Seigi.mp3'
    },
    {
        name:'D(evil)',
        coverImage:'/seed/artist/haruno/D(evil).jpg',
        songFile:'/seed/artist/haruno/D(evil).mp3'
    },
    {
        name:'Cinnaber',
        coverImage:'/seed/artist/haruno/Cinnaber.jpg',
        songFile:'/seed/artist/haruno/Cinnaber.mp3'
    },
    {
        name:'Kidding Me',
        coverImage:'/seed/artist/haruno/Kidding Me.jpg',
        songFile:'/seed/artist/haruno/Kidding Me.mp3'
    },
    {
        name:'September ',
        coverImage:'/seed/artist/haruno/Love Affair.jpg',
        songFile:'/seed/artist/haruno/Love Affair.mp3'
    },
    {
        name:'Love Affair ',
        coverImage:'/seed/artist/haruno/september.jpg',
        songFile:'/seed/artist/haruno/september.mp3'
    },
    {
        name:'Oz ',
        coverImage:'/seed/artist/yama/Oz.jpg',
        songFile:'/seed/artist/yama/Oz.mp3'
    },
    {
        name:'Ghost City Tokyo (cover)',
        coverImage:'/seed/artist/yama/Ghost City Tokyo (cover).jpg',
        songFile:'/seed/artist/yama/Ghost City Tokyo (cover).mp3'
    },

]

function seedDB(){
    Song.remove({},function(err)
                {
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                        console.log('Song Data deleted')
                    }
                })
    Artist.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Artist Data deleted");
            
        }
    dataArtist.forEach(function(artistSeed)
    {
        Artist.create(artistSeed,function(err, addArtist)
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log('Artist ' + addArtist.name + ' add')
            }
        })
    })
    dataSong.forEach(function(songSeed)
    {
        Song.create(songSeed,function(err, addSong)
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log('Song ' + addSong.name + ' add')
            }
        })
    })

    });
}

module.exports = seedDB;
    

