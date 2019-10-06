const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    res.status(200).json({ message: "get products successful" });
}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;

    req.user.createProduct({
        title: title,
        price: price,
        imgUrl: imgUrl,
        description: description
    }).then( result => {
        console.log('Create product success!');
        res.status(201).json({
            message: "Create product success!"
        });
    }).catch(err => {
        console.log(err);
    })
}