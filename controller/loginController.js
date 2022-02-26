const { usergame } = require ('../models/usergame');


module.exports = {
    
    index: (req,res)=>{
        res.render('signin')
    },
    auth: (req,res)=>{
        if(usergame.findOne({
            where: {username: req.body.username},
        })) {
            res.send("success").redirect('/dashboard')
        }
        else {
            res.send('login invalid')
        }
    }
}