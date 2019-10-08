const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then( products => {
        if(!products.length){
            const error = new Error("Products not found!");
            error.satatusCode = 404;
            throw error;
        }
        res.status(200).json({ 
            data: {
                products: products
            },
            message: "get products success" 
        });
    })
    .catch(err => {
        if(!err.satatusCode){
            err.satatusCode = 500;
        }
        next(err);
    })
}

exports.getProduct = (req, res, next) => {
    const proId = req.params.productId;
    Product.findAll({where: {id: proId}})
    .then(products => {
        if(!products.length){
            const error = new Error("Single product not found!")
            error.satatusCode = 404;
            throw error;
        }
        res.status(200).json({
            data: {
                product: products[0]
            },
            message: "get single product success"
        })
    })
    .catch(err => {
        if(!err.satatusCode){
            err.satatusCode = 500;
        }
        next(err);
    });
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
        res.status(201).json({
            message: "Create product success!"
        });
    }).catch(err => {
        if(!err.satatusCode){
            err.satatusCode = 500;
        }
        next(err);
    })
}


exports.editProduct = (req, res, next) => {
    const proId = req.params.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateImgUrl = req.body.imgUrl;
    const updateDescription = req.body.description;
    Product.findAll({where: {id: proId}})
    .then(products => {
        if(!products.length){
            const error = new Error("Product to add not found!")
            error.satatusCode = 404;
            throw error;
        }
        products[0].title = updateTitle;
        products[0].price = updatePrice;
        products[0].imgUrl = updateImgUrl;
        products[0].description = updateDescription;
        return products[0].save();
    })
    .then(result => {
        res.status(200).json({
            message: "Edit product success!"
        });
    })
    .catch(err => {
        if(!err.satatusCode){
            err.satatusCode = 500;
        }
        next(err);
    })
}