const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  color: String,
})


const Car = mongoose.model('Booking', carSchema)

module.exports = Car