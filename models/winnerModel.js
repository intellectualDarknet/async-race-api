const mongoose = require('mongoose')

const WinnerSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  color: String
})


const Winner = mongoose.model('Booking', WinnerSchema)

module.exports = Winner