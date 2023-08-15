const mongoose =  require('mongoose');
const connectToDataBase = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/products', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('successfully connected to the database')
    } catch (error) {
        console.error(error);
    }
}

connectToDataBase();

module.exports = mongoose;