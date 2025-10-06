const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review");
const listingSchema=new Schema({
  title: String,
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
 },
});

listingSchema.pre("save", async function (next) {
  if (!this.isModified("location")) return next(); // only if location changed
  try {
    const query = encodeURIComponent(this.location);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyWanderlurtApp", // Nominatim requires a User-Agent
      },
    });
    const data = await response.json();
    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      this.coordinates = [lon, lat]; // [lng, lat] for maps
    } else {
      this.coordinates = [0, 0]; // fallback if not found
    }
    next();
  } catch (err) {
    next(err);
  }
});

//middleweare  jo ki un reviews ko bhi delete karta h jinki listing delte ka di jati h 
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}});
}});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
