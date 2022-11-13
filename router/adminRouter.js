const { checkAuthenticated, isAdmin } = require('./middlewares/auth');
const Question = require('./../db/models/questions')
const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render("admin");
})

router.get('/add-question',(req,res)=>{
    res.render('add-question');
})
router.post('/add-question',async (req,res)=>{
    const {question,op1,op2,op3,op4,correct,subject} = req.body;
    if(!question || !op1 || !op2 || !op3 || !op4 || !correct){
        res.send("fill all fields");
    }
    else
    {
    const question = new Question(req.body);
        try{
            await question.save();
            console.log(question);
            res.render('add-question');
        }
        catch(e){
            res.send(e);
        }
    }
})


module.exports = router;