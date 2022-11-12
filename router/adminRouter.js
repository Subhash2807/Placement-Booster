const { checkAuthenticated, isAdmin } = require('./middlewares/auth');
const router = require('express').Router();

router.get('/',isAdmin,(req,res)=>{
    res.render("admin");
})

router.get('/add-question',(req,res)=>{
    res.render('add-question');
})

module.exports = router;