const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: {
        type: String,
    },
    date: {
        type: Date
    },
    lunch: {
        type: String
    },
    dinner: {
        type: String
    },
    vegetarian: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
      },
})

module.exports = Order = mongoose.model("order", OrderSchema)