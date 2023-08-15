const express = require('express');
const { Billing } = require('../models/billing');
const addressRoute = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/dataList');
const cors = require('cors');
const axios = require('axios');

addressRoute.use(cors());
addressRoute.post('/billing', passport.authenticate('jwt', { session: false }), async function (req, res) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Authorization headers missing' });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'ILove_Node');
    const userId = decode.id;

    const user = await User.find({ _id: userId });
    //const {BillingAddress,BillingCity,BillingState,BillingCountry} = req.body;
    var address = req.body.BillingAddress
    var address = req.body.BillingCity
    console.log("===========",req.body);
    if (user) {
      const address = new Billing({
        user: userId,
        Address:BillingAddress,
        City:BillingCity,
        // Country:BillingCountry,

      });

      await address.save();
      res.status(200).json({ message: 'Billing address saved successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const sendOTP = async () => {
  try {
    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      params: {
        authorization: 'FBJHltPeT76jG2ucpihUZ9RqIv5WVK4CwxnM0ka1SfOdz3QEsbPasLRBg9itZ2C8pJVhmKME6rvjOudI',
        variables_values: '5599',
        route: 'otp',
        numbers: '7567358252'
      },
      headers: {
        'cache-control': 'no-cache'
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send OTP');
  }
};

// Route handler
addressRoute.get('/send-otp', async (req, res) => {
  try {
    await sendOTP();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});


module.exports = addressRoute;
