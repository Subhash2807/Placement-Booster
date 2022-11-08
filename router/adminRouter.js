const { checkAuthenticated, isAdmin } = require('./middlewares/auth');
const router = require('express').Router();

router.get('/',isAdmin,(req,res)=>{
    res.render("admin");
})

module.exports = router;