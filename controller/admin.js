const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    res.status(200).json({ message: "get products successful" });
}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    Product.create({
        title: title,
        price: price,
        imgUrl: imgUrl,
        description: description
    }).then( result => {
        console.log('create product success!');
        res.status(201).json({
            message: "success"
        });
    }).catch(err => {
        console.log(err);
    })
}