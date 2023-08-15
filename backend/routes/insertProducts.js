const express = require('express');
const categoryRoute = express.Router();
const { Product, Category } = require('../models/dataList')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'public/upload/',
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
})
const upload = multer({ storage })
categoryRoute.use('/public/upload', express.static(path.join(__dirname, 'public/upload')));

categoryRoute.post('/insert',upload.single('image'), async function (req, res) { //here 'image' is based on html file name attribute
  const { category, name, quantity, price, amount } = req.body;
  const {  path } = req.file;

  try {
    const productData = new Product({
      Name: name,
      Price: price,
      ImageUrl:path
    });

    const savedProduct = await productData.save();

    const categoryData = await Category.findOne({ Name: category });
    if (categoryData) {
      categoryData.Products.push(savedProduct._id);
      await categoryData.save();
    } else {
      const insertData = new Category({
        Name: category,
        Products: [savedProduct._id],
      });
      await insertData.save();
    }

    res.send('Data successfully inserted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});
module.exports = categoryRoute;