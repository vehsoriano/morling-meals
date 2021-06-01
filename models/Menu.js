const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    date: {
        type: Date
    },
    morning_tea: {
        type: String
    },
    lunch: {
        type: String
    },
    lunch_option_two: {
        type: String
    },
    dinner: {
        type: String
    },
    dinner_option_two: {
        type: String
    },
    vegetarian: {
        type: String
    },
    afternoon_tea: {
        type: String
    },
    isAdded: {
        type: Boolean
    },
    isDeleted: {
        type: Boolean
    },    
});

module.exports = Item = mongoose.model("item", ItemSchema);