const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const Listing = require("../models/listing.js"); // ✅ add this

// ✅ 1. Add JSON route FIRST
router.get("/json", async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

router.get("/",(req, res) => {
    res.render('index.js'); // home.ejs file views folder me honi chahiye
});

// ✅ 2. index + create
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// ✅ 3. new form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ 4. edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

// ✅ 5. show + update + delete
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
