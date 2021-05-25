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
    dinner: {
        type: String
    },
    vegetarian: {
        type: String
    },
    afternoon_tea: {
        type: String
    },
    isDeleted: {
        type: Boolean
    },    
});

module.exports = Item = mongoose.model("item", ItemSchema);