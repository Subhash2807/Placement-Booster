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

router.post('/get-flash',(req,res)=>{
    res.send({data:[
        {
            Heading:"Deadlocks",
            mainContent: "A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.",
            points: [
                "Deadlock is dead",
                "Deadlock is lock",
                "Deadlock should be avoided"
            ]
        },
        {
            Heading:"heading 2",
            mainContent: "A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.A deadlock in OS is a situation in which more than one process is blocked because it is holding a resource and also requires some resource that is acquired by some other process. The four necessary conditions for a deadlock situation to occur are mutual exclusion, hold and wait, no preemption and circular set.",
            points: [
                "point1",
                "point2",
                "point3"
            ]
        },
        {
            Heading:"heading 3",
            mainContent: "Main Content 3",
            points: [
                "point1",
                "point2",
                "point3"
            ]
        },{
            Heading:"heading 3",
            mainContent: "Main Content 3",
            points: [
                "point1",
                "point2",
                "point3"
            ]
        },
    ]})
})
module.exports = router;