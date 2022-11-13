const router = require('express').Router();
const User = require('./../db/models/user')
const Question = require('./../db/models/questions')
const {checkAuthenticated,loginCheck} = require('./middlewares/auth')

router.get('/',checkAuthenticated,(req,res)=>{
    // console.log(req.user);
    res.render('home',{user:req.user});
})
router.get('/take-test',(req,res)=>{
    res.render("test");
})
router.post('/get-question',(req,res)=>{
    // console.log(req.body);
    Question.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        Question.findOne({subject:req.body.subject}).skip(random).exec(
          function (err, result) {
            // Tada! random user
            // console.log(result) 
            res.send(result)
          })
      })
})

router.post('/savescore',checkAuthenticated,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        console.log(user);
        user.scores.push({subject:req.body.subject,marks:req.body.score});
        const u = await user.save();
        console.log(u);
    }
    catch(e){
        console.log(e);
    }
    console.log(req.user,req.body);
    res.render('login');
    
})
module.exports = router;