const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use((req, res, next) => {
    User.findAll({
        where: {
            id: 1
    }}).then( user => {
        req.user = user[0];
        next();
    }).catch( err => {
        console.log(err);
    });
})

app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({message: message});
})

Product.belongsTo(User);
User.hasMany(Product);

sequelize
    //.sync({force: true})
    .sync()
    .then( result => {
        return User.findAll({where: {id: 1}});
}).then( user => {
    if(user.length == 0){
        return User.create({
            name: 'yen-cheng',
            email: 'dummy@gmail.com',
            password: 'dummypwd'
        })
    }
    return user;
}).then( result => {
    app.listen(3000);
}).catch( err => {
    console.log(err);
})