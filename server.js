const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortId = require('shortid')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// mongodb://localhost/react-shopping-cart-db
// mongodb+srv://khashayar:5100056053@shoppingcart.kxrb4.mongodb.net/test
mongoose.connect('mongodb+srv://khashayar:5100056053@shoppingcart.kxrb4.mongodb.net/shopping_cart_test')

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

const Order = mongoose.model('order', new mongoose.Schema({
    _id: {
        type: String,
        default: shortId.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }]
}, {timestamps: true}))

app.post('/api/orders', async (req, res) => {
    if(!req.body.email || !req.body.name || !req.body.address || !req.body.cartItems || !req.body.total){
        return res.send({message: 'Data is required'})
    }
    const order = await Order(req.body).save()
    res.send(order)
})

const port = process.env.Port || 5000
app.listen(port, () => console.log('serve at http://localhost:5000'))