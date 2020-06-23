const Veggie = require("../models/Veggie");

async function quantityChangeHandler(req, res, next) {

  // Missing id or quantity -> 422
  // Item does not exists in the database -> 404
  // Items has been updated -> 200 


  try {
    const { id, quantity } = req.body;

    if (!id || !quantity) {
      throw Error;
    }

    const response = await Veggie.updateOne(
      { id },
      { quantity, dateLastStocked: Date.now() }
    );

    // ITEM DOES NOT EXIST IN THE DB
    if (response.n === 0) {
      throw Error;
    }

    res.status(200).json({ message: "Item has been updated" });
    next();
    return;
  } catch (error) {
    return next(error);
  }
}

module.exports = quantityChangeHandler;
