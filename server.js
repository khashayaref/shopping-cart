const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortId = require('shortid')

const app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/react-shopping-cart-db')

const Product = mongoose.model('products', new mongoose.Schema({
    _id: {type: String, default: shortId.generate},
    title: String,
    description: String,
    price: Number,
    image: String,
    availableSizes: [String]
}))

app.get("/api/products", async(req, res) => {
    const products = await Product.find({})
    res.send(products)
})

app.post('/api/products', async(req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete('/api/products/:id', async(req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

const port = process.env.Port || 5000
app.listen(port, () => console.log('serve at http://localhost:5000'))