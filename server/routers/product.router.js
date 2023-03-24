const express = require('express');
const ProductModel = require('../models/product.model');
const router = express.Router();
const { ObjectId } = require("mongodb");

router.post('/marsvinsdagboken/products/add', async (req, res) => {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
});

router.get('/marsvinsdagboken/products', async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).json(products);
});

router.get('/marsvinsdagboken/products/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.findById({"_id": new ObjectId(productId)});
    res.status(200).json(product);
});

module.exports = router