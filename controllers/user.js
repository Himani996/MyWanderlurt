
const User = require("../models/user");

module.exports.newForm=async(req,res)=>{
    res.render("users/form");
};

module.exports.signup=async(req,res)=>{
    try{
let{username,email,password}=req.body;
const newUser=new User({email,username});
const registerUser=await User.register(newUser,password);
console.log(registerUser);
req.login(registerUser,(err)=>{
    if(err){
        next(err);
    }
      req.flash("success","you successfully login!");
    res.redirect("/listings");
})
  }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.login=async(req,res)=>{
  req.flash("success", "welcome to wanderlust! you loged in !");
  let redirectUrl=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);

};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","you are log out!");
        res.redirect("/listings");
    });
};
