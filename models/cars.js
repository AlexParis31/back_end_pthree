const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    
    image: String,
    year: Number,
    make: String,
    model: String,
    class: String,
    price: String,
});



const Car = mongoose.model('Car', carSchema);

module.exports = Car;
