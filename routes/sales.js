const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const Sales = require("../models/Sales");
// Make schema

const verifyToken = require("../middlewares/verifyToken");
const { json } = require("body-parser");

/* 

  Alright so post sales data
  
  JSON
  {
    date: date object? [ISO Date String]
    sales: number optional
    expense: number optional
  }

  You may want to submit these at two different times

  Expense: Morning
  Sales: Night

  Morning/Night = m/n

  Potential Bugs:

    Duplicate Dates
      need to check if that day already exists
      if it exists just use that object
      else create a new object 
    
      [figure out sending one piece of data [m/n]

  Am I allowing you to updated them twice? 
  Yeah i should, dad checks the box more than just at night

  How do i do that?
  Check if that value exists in mongo
  if it does pull it down, add, push up

  else create that data point




*/

// Post new sales data

// BUG : same day but different times, will be seen as different documents

router.post("/", verifyToken, async (req, res, next) => {
  let { date, expense, sales } = req.body;

  let tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  date = tempDate.toISOString();

  try {
    const redundancyCheck = await Sales.findOne({ date: date });

    if (redundancyCheck !== null) {
      sales += redundancyCheck.sales;
      expense += redundancyCheck.expense;

      await Sales.updateOne({ date }, { sales, expense });

      res.status(200).json({ message: "Sales Data Updated" });
    } else {
      const newSales = new Sales({
        date,
        sales,
        expense,
      });

      await newSales.save();
      res.status(201).json({ message: "New Sales Data Recorded" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const payload = await Sales.find({});
    res.json(payload);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
