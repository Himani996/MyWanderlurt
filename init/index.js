const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("conected to DB");
};

const initDB = async()=>{
await Listing.deleteMany({});
initData.data=initData.data.map((obj)=>({
    ...obj,owner:'68b5cbbb16a9adbced1befbe',
}));
await Listing.insertMany(initData.data);
    console.log("database was initialized");
};

initDB();

// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// main().catch((err) => console.log(err));

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
//     console.log("Connected to DB");
// }

// const initDB = async () => {
//     await Listing.deleteMany({});

//     // 👇 yahan apna user ka _id daalo
//     const ownerId = "64f5b3a8f1d2a91f8b5d7c3e";  

//     const listingsWithOwner = initData.data.map((obj) => ({
//         ...obj,
//         owner: ownerId,
//     }));

//     await Listing.insertMany(listingsWithOwner);
//     console.log("Database was initialized with new listings");
//     mongoose.connection.close();
// };

// initDB();
