const express = require("express");
const router = express.Router();
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const wrapAsync=require("../utils/wrapAsync.js");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const{saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");


const sessionOptions={
secret:"mysupersecretstring",
resave:false,
saveUninitialized:true,
Cookie:{
expire:Date.now()+7*24*60*60*1000,
maxAge:7*24*60*60*1000,
httpOnly:true
},
};


router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(session(sessionOptions));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash())


//newsignup
router.get("/signup",userController.newForm);

//sinup
router.post("/signup",wrapAsync(userController.signup));

//login
router.get("/login",async(req,res)=>{
    res.render("users/login");
});

//login
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login);

//logout
router.get("/logout",userController.logout);

module.exports=router;