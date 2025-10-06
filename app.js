if(process.env.NODE_ENV !='Producation'){
require('dotenv').config();}

const express = require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const ExpressError=require("./utils/ExpressError.js");
const wrapAsync=require("./utils/wrapAsync.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter= require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const MongoStore=require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

main().catch((err)=>{
    console.log(err);
});
;

async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("conected to DB");
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

const Store=MongoStore.create({
    mongoUrl:process.env.ATLASDB_URL,
    crypto:{
        sceret:process.env.SCERET,
    },
    touchAfter:24*3600,
});
Store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE");
});

const sessionOptions={
   Store=Store,
secret:process.env.SCERET,
resave:false,
saveUninitialized:true,
Cookie:{
expire:Date.now()+7*24*60*60*1000,
maxAge:7*24*60*60*1000,
httpOnly:true
},
};
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

// app.get("/demouser",async(req,res)=>{
//     try{
// let fakeUser=new User({
//     email:"himanigautam2109@gmail.com",
// username:"himani99656546464"
// })
// let registeredUser =await
//   res.status(200).send(registeredUser);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).send(err.message || "Something went wrong!");
});


app.use((err,req,res,next)=>{
    let {statusCode=500,message="something wrong!"}=err;
    res.status(statusCode).send (message);
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("working");
});
