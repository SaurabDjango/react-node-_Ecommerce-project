const express = require('express');
const getProducts = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const { Product,Category,User } = require('../models/dataList')

getProducts.get('/getProducts',passport.authenticate('jwt', { session: false }), async function(req,res) {
  if(!req.headers.authorization) {
    return req.statusCode(401).json({error: 'Authorization headers missing'}); 
  }
  const token = req.headers.authorization.split(' ')[1];
  //console.log("===get token for getProduct route",token)
  try {
    const data = await Product.find() // to get all data
    res.send(data)
  } catch (error) {
    console.error(error)
  }
})
// getProducts.get('/getProduct', async function (req, res) {
  
//   if(!req.headers.authorization) {
//     return res.status(401).json({error: 'Authorization header missing' });
//   }
//   const token = req.headers.authorization.split(' ')[1];
//   const categoryId = req.params.categoryId;
//   console.log(categoryId)
  
//   try {
//     const category = await Category.findById({_id:categoryId}).populate('Products')
//     console.log("=====",category)
//     if (category) {
//       const products = category.Products;
//       res.send(products);
//     } else {
//       res.status(404).send("Category not found");
//     }
//     const prod = await Product.find()
//     //console.log(prod)
//     res.send("===",prod)    
//   } catch (error) {
//     console.error(error)
//     res.status(500).send("Internal server error");
//   }
// });

getProducts.get('/getCategory', async function (req, res) {
    try {
      const categories = await Category.find();
      res.send(categories);
      //console.log(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving categories");
    }
  });

module.exports = getProducts;