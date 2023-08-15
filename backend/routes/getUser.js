const express = require('express');
const getUserRouter = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/dataList');
const cors = require ('cors');
const bcrypt = require('bcrypt');

getUserRouter.use(cors());
getUserRouter.get('/userData', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
  
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
  
    try {         
      const decoded = jwt.verify(token, 'ILove_Node'); // Verify and decode the token
      const userId = decoded.id; // Extract the user ID from the payload
  
      // Retrieve the user data based on the user ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  });

  getUserRouter.post('/update', passport.authenticate('jwt', { session: false }), async function(req,res) {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1]; // Extract the token
    try {
      const {Name,LastName,Address,State} = req.body;
      const decoded = jwt.verify(token, 'ILove_Node'); // Verify and decode the token
      const userId = decoded.id; // Extract the user ID from the payload

      const user = await User.findById(userId);
       if(!user) {
        return res.status(404).json({ error: 'User not found' });
       }
       //update the code
       user.Name = Name;
       user.LastName= LastName;
       user.Address = Address;
       user.State= State;
       await user.save();
      res.json("Data Updated")
    } catch (error) {
      console.error(error)
    }
  })

  getUserRouter.post('/resetPassword', passport.authenticate('jwt', { session: false }), async function(req,res) {
    if(!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const {currentPass,newPass,confirmPass} =  req.body;
      const decode = jwt.verify(token,'ILove_Node');
      const userId = decode.id;
      const user = await User.findById(userId);

      if(!user) {
        return res.status(404).json({ error: 'User not found from update password' });
      }
      const newPassword = confirmPass;
      const hashPass = await bcrypt.hash(newPassword, 10)
      user.Hash_password = hashPass;
      user.save();
      res.json("password updated");
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }    
  });
  module.exports = getUserRouter;