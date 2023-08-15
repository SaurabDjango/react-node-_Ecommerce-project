const express = require('express');
const paymentRoute = express.Router();
const { Product, Category, Payment } = require('../models/dataList');
const stripe = require('stripe')("sk_test_51NDPxlSJKAJpVQuk51cyZD6rQQ4HE8fzzetvCzmpU5agP3j03bLfkhfP6G3ZfeHjBoQ6veL1NBNUen6QvUk5rlav00JdOO7MCF");

// const cartItems = [];
// paymentRoute.post('/pay', async function (req, res) {
//   try {
//     const { id,amount } = req.body;
//     console.log("===",req.body)
//     //res.send(req.body);
//     const product = await Product.findOne({ _id: id });
//     cartItems.push(product);
  
//     let totalPrice = 0;
//     cartItems.forEach((item) => {
//       //totalPrice += item.Price * item.Quantity;
//       totalPrice += item.Total
//     });

//     const totals = cartItems.map((item) => item.Total);
//     const grandTotal = totals.reduce((acc, total) => acc + total, 0);

//     const totalsObject = {
//         totals: totals,
//         grandTotal: grandTotal,
//       };

//     const newPayment = new Payment({
//       Total: grandTotal,
//     });
//     //console.log(totalsObject);
//     await newPayment.save();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       payment_method: id,
//       confirm: true,
//     });

//     console.log("===",paymentIntent);
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

paymentRoute.post('/charge', async (req, res) => {
  const { paymentMethodId, amount, currency,name,last,email,state,city } = req.body;

  try {
    // Create a payment intent to charge the provided amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    });

    const paymetData = new Payment({
      Name:name,
      Lastname:last,
      Email:email,
      City:city,
      State:state,
      Total:amount,
      Currency:currency,
      PaymentID:paymentMethodId
    });

    await paymetData.save();
    // Payment successful, return the success response
    res.json({ success: true });
  } catch (error) {
    // Payment failed, return the error response
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = paymentRoute;
