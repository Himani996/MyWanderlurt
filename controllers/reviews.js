const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.postReview=async (req, res, next) => {
  try {// Debug ke liye
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    let newReview = new Review(req.body.review);
     newReview.author=req.user._id;
   
    listing.reviews.push(newReview);
     await newReview.save();
    await listing.save();
req.flash("success","review is successfully added");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    next(err); // ek hi baar error bhejo
  }
};

module.exports.deletereview=async(req,res)=>{
let{id,reviewId}=req.params;
 await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
 await Review.findByIdAndDelete(reviewId);
req.flash("success","review is successfully deleted");
 res.redirect(`/listings/${id}`);
};