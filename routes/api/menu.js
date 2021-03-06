const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Model
const Item = require("../../models/Menu");

// @route  POST api/item
// @desc   Register item
// @access Public
router.post(
  "/",
  [
    check("date", "Date is required")
      .not()
      .isEmpty(),
    check("morning_tea", "Morning Tea is required")
      .not()
      .isEmpty(),
    check("lunch", "Lunch is required")
      .not()
      .isEmpty(),
    check("dinner", "Dinner is required")
      .not()
      .isEmpty(),
    check("afternoon_tea", "Afternoon Tea is required")
      .not()
      .isEmpty(),
    check("vegetarian", "Vegetarian is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        data: {
          status: "warning",
          msg: "Some field are required"
        }
      });
    }

    const { 
      date, 
      morning_tea, 
      lunch, 
      lunch_option_two,
      dinner, 
      dinner_option_two,
      vegetarian,
      afternoon_tea,
      isAdded,
     } = req.body;

    try {

      let item = await Item.findOne({ date });
  
      if (item) {
        return res.json({
          data: {
            status: "warning",
            msg: "There is already created menu for this date!"
          }
        });
      }

      item = new Item({
        date, 
        morning_tea, 
        lunch, 
        lunch_option_two,
        dinner, 
        dinner_option_two,
        vegetarian,
        afternoon_tea,
        isAdded,
      });

      await item.save();
      return res.json({
        data: {
          status: "success",
          msg: "Awesome item added"
        },
        item
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const item = await Item.find();

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//Get menu items from date
router.get("/:date", async (req, res) => {
  try {
    const menu = await Item.findOne({date: req.params.date});
    res.json(menu);
    res.json({
        data: {
          status: "success",
          msg: "Success"
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.put("/update/:item_id", async (req, res) => {
  const {
    morning_tea, 
    lunch, 
    lunch_option_two,
    dinner, 
    dinner_option_two,
    vegetarian, 
    afternoon_tea 
  } = req.body;
  try {
    const item = await Item.findById(req.params.item_id);
    item.morning_tea = morning_tea, 
    item.lunch = lunch, 
    item.lunch_option_two = lunch_option_two, 
    item.dinner = dinner, 
    item.dinner_option_two = dinner_option_two, 
    item.vegetarian = vegetarian,
    item.afternoon_tea = afternoon_tea,
    item.save();
    res.json({
      data: {
        status: "success",
        msg: "Menu Updated!"
      },
      item
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete/:item_id", async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.item_id }).then(response => {
      return res.json({
        data: {
          status: "success",
          msg: "Item Successfully Deleted"
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;