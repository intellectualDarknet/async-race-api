const mongoose = require('mongoose')

const WinnerSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    index: true
  },
  wins: Number,
  time: Number,
})


const Winner = mongoose.model('Booking', WinnerSchema)

module.exports = Winner