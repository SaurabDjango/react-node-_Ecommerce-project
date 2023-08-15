const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const productSchema = new Schema({
  Name: String,
  Price: Number,
  Quantity: Number,
  Total: Number,
  ImageUrl: String,
  Category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const categorySchema = new Schema({
  Name: String,
  Products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const payment = new Schema({
  Name: String,
  Lastname: String,
  Email: String,
  State: String,
  City: String,
  Total: Number,
  Currency: String,
  PaymentID: String
});

const orderDetailSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  orderDetails: [orderDetailSchema],
  total: Number,
  status: String,
  date:'string',
});

const userSchema = new Schema({
  Name: {
    type: String,
    require: false
  },
  LastName: {
    type: String,
    require: false
  },
  Email: {
    type: String,
    require: true
  },
  Address: {
    type: String,
    require: false
  },
  Country: {
    type: String,
    require: false
  },
  State: {
    type: String,
    require: false
  },
  City: {
    type: String,
    require: false
  },
  Hash_password: {
    type: String,
    require: true
  },
  Image: {
    imageName: String,
    imageUrl: String,
  },
  OTP:{
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);
const Payment = mongoose.model('payment', payment);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

userSchema.methods.comparePassword = function (Password) {
  return bcrypt.compareSync(Password, this.Hash_password);
}

module.exports = { Product, Category, Payment, User, Order, OrderDetail };