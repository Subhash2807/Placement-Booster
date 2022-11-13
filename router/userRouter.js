const router = require('express').Router();
const Question = require('./../db/models/questions')
const {checkAuthenticated,loginCheck} = require('./middlewares/auth')

router.get('/',checkAuthenticated,(req,res)=>{
    console.log(req.user);
    res.render('home',{user:req.user});
})
router.get('/take-test',(req,res)=>{
    res.render("test");
})
router.get('/get-question',(req,res)=>{
    Question.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        Question.findOne().skip(random).exec(
          function (err, result) {
            // Tada! random user
            console.log(result) 
            res.send(result)
          })
      })
})
module.exports = router;