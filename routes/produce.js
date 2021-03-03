const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const Veggie = require("../models/Veggie");

const verifyToken = require("../middlewares/verifyToken");
// const quantityChangeHandler = require("../middlewares/quantityChangeHandler");

// GET ALL PRODUCE
router.get("/", async (req, res, next) => {
  try {
    const payload = await Veggie.find({}, { _id: 0, __v: 0 });
    res.json(payload);
  } catch (error) {
    next(error);
    return;
  }
});

// CREATE NEW VEGGIE ITEM
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const dateLastStocked = Date.now();
    const quantity = req.body.quantity;
    const inSeason = req.body.inSeason;

    // CHECK IS ITEM ALREADY EXISTS
    const redundancyCheck = await Veggie.findOne({ id });

    if (redundancyCheck) {
      throw createError(409, "Item already exists in database");
    }

    //  BUILD A VEGGIE MODEL
    const newVeggie = new Veggie({
      id,
      name,
      price,
      dateLastStocked,
      quantity,
      inSeason,
    });

    // SAVE TO DB
    await newVeggie.save();

    res.status(201).json({ message: "Item has been created" });
  } catch (error) {
    next(error);
  }
});

// Update contents of specific veggie item
router.post("/update", verifyToken, async (req, res, next) => {
  try {
    const { id } = req.body;
    let updateObject = {};

    for (let attr in req.body) {
      if (attr !== "id") {
        updateObject[attr] = req.body[attr];
      }
    }
    if (id === undefined) {
      throw createError(404, "Missing Id");
    }
    await Veggie.updateOne({ id }, updateObject);
    res.status(200).json({ message: "Item Updated" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
