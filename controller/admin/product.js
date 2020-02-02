const Product = require('../../models/product');

const commonMethod = require('../../util/commonUtil');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then( products => {
        commonMethod.checkHasDataAndThrowErr(products);
        commonMethod.setStatusAndJsonData(res, products);
    })
    .catch(err => {
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    })
}

exports.getProduct = (req, res, next) => {
    const proId = req.params.productId;

    Product.findAll({where: {id: proId}})
    .then(products => {
        commonMethod.checkHasDataAndThrowErr(products);
        commonMethod.setStatusAndJsonData(res, products[0]);
    })
    .catch(err => {
        commonMethod.checkAndSetErrStatus(err);
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
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    })
}


exports.editProduct = (req, res, next) => {
    const proId = req.params.productId;
    const newTitle = req.body.title;
    const newPrice = req.body.price;
    const newImgUrl = req.body.imgUrl;
    const newDescription = req.body.description;

    Product.findAll({where: {id: proId}})
    .then(products => {
        commonMethod.checkHasDataAndThrowErr(products);

        products[0].title = newTitle;
        products[0].price = newPrice;
        products[0].imgUrl = newImgUrl;
        products[0].description = newDescription;
        return products[0].save();
    })
    .then(result => {
        res.status(200).json({
            message: "Edit product success!"
        });
    })
    .catch(err => {
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    })
}