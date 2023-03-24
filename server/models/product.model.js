const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true }
});

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel;