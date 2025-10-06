const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user.js");
const LocalStrategy = require("passport-local");

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req,res,next)=>{
     if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be log in!");
       return res.redirect("/login");}
       next();
    }

    module.exports.saveRedirectUrl=(req,res,next)=>{
      if(req.session.redirectUrl){
         res.locals.redirectUrl=req.session.redirectUrl;
      }
      next();
    }

    module.exports.isOwner=async(req,res,next)=>{
      let {id}=req.params;
      let listing=await Listing.findById(id);
      if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing ");
   return  res.redirect(`/listings/${id}`);
      }
       next();
    }

    
    module.exports.validateReview =(req,res,next)=>{
    let{error}=reviewschema.validate(req.body);
    if(error){
     return res.status(400).send(error.details.map(el => el.message).join(",")); 
     }else{
            next();
        }
    };
      module.exports.isReviewAuthor=async(req,res,next)=>{
      let {id,reviewId}=req.params;
      let review=await Review.findById(reviewId);
      if (!review) {
        req.flash('error', 'Review not found!');
        return res.redirect(`/listings/${id}`);
    }
      if(!review.author || !review.author.equals(req.user._id)){
        req.flash("error","you are not the owner of this listing ");
   return  res.redirect(`/listings/${id}`);
      }
       next();
    }