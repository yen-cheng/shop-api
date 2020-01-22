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
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateImgUrl = req.body.imgUrl;
    const updateDescription = req.body.description;

    Product.findAll({where: {id: proId}})
    .then(products => {
        commonMethod.checkHasDataAndThrowErr(products);

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
        commonMethod.checkAndSetErrStatus(err);
        next(err);
    })
}