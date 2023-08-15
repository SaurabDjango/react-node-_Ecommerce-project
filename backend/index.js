const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const passport = require('./passport');
const mongoose = require('./dbconfig');
const getProducts = require('./routes/getProduct');
const insertCategory = require('./routes/insertProducts');
const paymentRoute = require('./routes/payment');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const orderRouter= require('./routes/orders');
const getUserRouter = require('./routes/getUser');
const addressRoute = require('./routes/address');
const otpRouter = require('./routes/otpRegistration');

mongoose.connect('mongodb://127.0.0.1:27017/products');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', getProducts);
app.use('/', insertCategory);
app.use('/', paymentRoute);
app.use('/', registerRouter);
app.use('/', loginRouter);
app.use('/', orderRouter);
app.use('/detail', orderRouter);
app.use('/',getUserRouter);
//app.use('/',otpRouter);
app.use('/',addressRoute);

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal server error' })
})

const server = app.listen(8080,function () {
    console.log('Server started on port 8080');
});

// process.on('SIGINT', () => {
//     console.log('Stopping server...');
//     server.close(() => {
//       console.log('Server stopped');
//       process.exit(0);
//     });
//   });