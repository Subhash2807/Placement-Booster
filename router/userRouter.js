const router = require('express').Router();
const {checkAuthenticated,loginCheck} = require('./middlewares/auth')

router.get('/',checkAuthenticated,(req,res)=>{
    console.log(req.user);
    res.render('home',{user:req.user});
})

module.exports = router;