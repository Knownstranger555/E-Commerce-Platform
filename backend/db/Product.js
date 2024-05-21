// schema define krta hai ki apne models kese honge
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId:String,
    comapny:String
});

module.exports = mongoose.model("products", productSchema);
// this is imported in the index vaali file 