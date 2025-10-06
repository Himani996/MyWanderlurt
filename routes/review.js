const express = require("express");
const app=express();
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review = require('../models/review');
const Listing=require("../models/listing");
const{isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");




// post review route
router.post("/",isLoggedIn, reviewController.postReview);

// review delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deletereview));
 
module.exports=router;