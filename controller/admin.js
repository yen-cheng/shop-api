exports.getProducts = (req, res, next) => {
    res.status(200).json({ message: "get products successful" });
}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    res.status(201).json({
        data: {
            title: title,
            price: price
        }
    });
}