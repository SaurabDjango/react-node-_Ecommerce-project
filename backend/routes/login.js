const express = require('express');
const loginRouter = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models/dataList');
const bcrypt = require('bcrypt');
const cors = require('cors');

loginRouter.use(cors());
loginRouter.post('/login', async function(req,res){
    
    const email =req.body.email; //"demo@gmail.com"
    const pass  =req.body.pass;
    try {
        const user = await User.findOne({Email:email})
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = bcrypt.compareSync(pass,user.Hash_password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({id: user._id}, 'ILove_Node', {expiresIn: '30m'})
        console.log("token generated at login time",token);
        res.json( {token,message:"login successfully"} )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

loginRouter.post('/logout',async function(req,res){
    const token = req.headers.authorization.split(' ')[1];
    console.log("token from logout",token);
    req.logOut();
    req.session.destroy(function(err){
        if(err) {
            return res.status(500).json({error:'Error: req#logout requires a callback function'})
        }
    })

    res.json({message: 'logout successfully'})
});
  
module.exports = loginRouter;