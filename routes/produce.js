const express = require("express");

const router = express.Router();

const Veggie = require("../models/Veggie");

const verifyToken = require("../middlewares/verifyToken");
const quantityChangeHandler = require("../middlewares/quantityChangeHandler");

// GET ALL PRODUCE

router.get("/", async (req, res) => {
  try {
    const payload = await Veggie.find({}, { _id: 0, __v: 0 });
    res.json(payload);
  } catch (error) {
    res.json(error);
  }
});

// CREATE NEW VEGGIE ITEM
router.post("/", verifyToken, async (req, res) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const dateLastStocked = Date.now();
    const quantity = req.body.quantity;

    // CHECK IS ITEM ALREADY EXISTS
    const redundancyCheck = await Veggie.findOne({ id });

    if (redundancyCheck) {
      throw Error("Item already exists");
    }

    //  BUILD A VEGGIE MODEL
    const newVeggie = new Veggie({
      id,
      name,
      price,
      dateLastStocked,
      quantity,
    });

    // SAVE TO DB
    await newVeggie.save();

    res.status(201).json({ message: "Item has been created" });
  } catch (error) {
    res.json(error);
  }
});

// UPDATE VEGGIE QUANTITY

router.post("/update", verifyToken, quantityChangeHandler, (req, res) => {});

module.exports = router;