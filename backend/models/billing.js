const { Schema, default: mongoose } =require ('mongoose')
const { User } = require('./dataList')

const BillingData = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    Address: String,
    City: String,
    State: String,
    Country: String,
    Amount: Number,
    PaymentMethod: String
});

const Billing = mongoose.model('BillingAddress', BillingData)

module.exports = { Billing };