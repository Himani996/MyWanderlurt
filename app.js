const express = require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync=require("./utils/wrapAsync.js");
// const ExpressError=require("./utils/ExpressError.js")

main().catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("conected to DB");
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

app.get("/",(req,res)=>{
    res.send("yes working");
});

// app.get("/testlisting",async(req,res)=>{
// let samplelisting = new Listing({
// title:"my new villa",
// description:"by the beech",
// price:1200,
// location:"delhi",
// country:"India"
// });
// await samplelisting.save();
// res.send("successfull");
// });

app.get("/listings",async(req,res)=>{
    const allListing=await Listing.find();
res.render("listings/index.ejs",{allListing});
});


app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
   const listing=await Listing.findById(id);
      if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/show.ejs",{listing});
});

app.post("/listings",
    wrapAsync(async(req,res,next) => {
        const newlisting= new Listing(req.body.listing);
        await newlisting.save();
        res.redirect("/listings");
})
);

app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
   const listing=await Listing.findById(id);
     if (!listing) throw new ExpressError(404, "Listing not found");
    res.render("listings/edit.ejs",{listing});
});

app.put("/listings/:id",async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(404,"send valid data for listing");
    // }
       let{id}=req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const deletelisting=await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
});

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found!"));
// });

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something wrong!"}=err;
    res.status(statusCode).send (message);
});

app.listen(3000,()=>{
    console.log("working");
});