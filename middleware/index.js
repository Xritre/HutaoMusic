const   Artist = require('../models/artist'),
        index = require('../models/song');
const user = require('../models/user');
        
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash('error','You need to login first')
    res.redirect('/login')    
}

middlewareObj.isAdmin = function(req,res, next)
{
    if(req.isAuthenticated())
    {
        
        if(req.user.isAdmin)
        {
            return next();
        }  
        else
        {
         req.flash('error','You do not have permision')
        res.redirect('/')      
        }
        
    }
    else
    {
       req.flash('error','You need to login')
    res.redirect('/login')    
    }
    
}



module.exports = middlewareObj;