const express = require('express');
const orderRouter = express.Router();
const { Order, User } = require('../models/dataList')
const passport = require('../passport');
const jwt = require('jsonwebtoken');

orderRouter.post('/order', passport.authenticate('jwt', {session: false}),async function (req, res) {
    if(!req.headers.authorization) {
        return res.status(401).json({error: 'Authorization header missing'})
    }
    const cart = req.body.cart;
    const totalAmount = req.body.totalAmount;
    //console.log("======== cart data ", totalAmount);
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'ILove_Node');
        const userId = decode.id;
        const date = new Date().toUTCString().slice(5, 16);;
        const orderDetails = cart.map((product) => ({
            product: product._id,
        }));
        //console.log("======== cart data ", orderDetails);
        const newOrder = new Order({
            user: userId,
            orderDetails: orderDetails,
            total: totalAmount,
            status: '',
            date:date,
        })

        await newOrder.save()
        res.json("data inserted");
    } catch (error) {
        console.error(error)
    }
})

orderRouter.get('/', passport.authenticate('jwt', { session: false }), async function (req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
        const decode = jwt.verify(token, 'ILove_Node');
        const userId = decode.id;
        //console.log(token,"\n",userId)

        const orders = await Order.find({ user: userId }).populate('date').populate('orderDetails.product', 'Name Price ImageUrl');
        var Name,Price,ImageUrl,date;
        const productDetails = orders.flatMap((order) =>
            order.orderDetails.map((orderDetail) => {
                //const { name:Name, Price, ImageUrl, date} = orderDetail.product; 
                //return { Name, Price, ImageUrl, date };
                Name = orderDetail.product.Name
                Price = orderDetail.product.Price
                ImageUrl = orderDetail.product.ImageUrl
                date = order.date
                return { Name, Price, ImageUrl, date };
            })            
        );
        //console.log("=======",Name,Price,ImageUrl,date)
        res.json(productDetails);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

module.exports = orderRouter;