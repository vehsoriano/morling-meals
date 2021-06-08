const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Model
const Order = require("../../models/Order");
const Item = require("../../models/Menu");
const User = require("../../models/User");


// @route  POST api/order
// @desc   Register order
// @access Public
router.post(
  "/:user_id",
  async (req, res) => {

    const { 
        user_id 
    } = req.params;

    const { 
        date, 
        lunch, 
        dinner, 
        vegetarian,
    } = req.body;

    try {
        
        let user = await User.findOne({ _id: user_id }).where({ status: true });

        if (!user) {
            return res.json({ data: { status: "error", msg: "User not found" } });
        }

        order = new Order({
            user_id,
            date, 
            lunch, 
            dinner,
            vegetarian, 
        });

        await order.save();

        return res.json({
            data: {
                status: "success",
                msg: "Order has been successfully placed"
            }
        });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
  }
);


//get all order
router.get("/", async (req, res) => {
  try {
    const data = []
    const order = await Order.find();

    for (let index = 0; index < order.length; index++) {
        const user = await User.findById(order[index].user_id);

        data.push({
            order_id: order[index]._id,
            order_date: order[index].date,
            order_lunch: order[index].lunch,
            order_dinner: order[index].dinner,
            user_first_name: user.first_name,
            user_last_name: user.last_name,
            user_role: user.role,
            user_email: user.email,
        }) 
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//update order
router.put("/update/:order_id", async (req, res) => {
  const {
    lunch, 
    dinner, 
    vegetarian, 
  } = req.body;
  try {
    const order = await Order.findById(req.params.order_id);
    order.lunch = lunch, 
    order.dinner = dinner, 
    order.vegetarian = vegetarian,
    order.save();
    res.json({
      data: {
        status: "success",
        msg: "Order Updated!"
      },
      order
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get user order
router.get("/userorder/:user_id", async (req, res) => {
    try {
      const order = await Order.find();
      var myOrder = order.filter(item => item.user_id == req.params.user_id);
      res.json({
            myOrder,
            data: {
                status: "Success",
                msg: "Success!"
            }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});




//delete order
router.delete("/delete/:item_id", async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.item_id }).then(response => {
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