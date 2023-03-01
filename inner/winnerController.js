const Winner = require('../models/winnerModel.js');

class WinnerController {

  getWinners = async (req, res) => {
    const winners = await Winner.findById()

    res.status(200).json({
      status: 'success',
      winners
    })
  }

  addUpdateWinner = async (req, res) => {
    const winner = await Winner.findById(req.params.id)

    if (winner) {
      winner.body.time > req.body.time ? req.body.time = winner.body.time : null
      req.body.wins = winner.wins + 1;
      const winner = await Winner.findByIdAndUpdate(req.params.id || req.body.name, req.body, {
        new: true,
        runValidators: true
      });

    } else {
      const { name, wins, time } = req.body
      const car = await Car.create({ name, wins, time })
    }

    res.status(winner ? 201 : 200).json({
      status: 'success',
      data: winner
    });
  }

  removeWinner = async (req, res) => {
    const winner = await Winner.findByIdAndDelete(req.params.id);
  
    res.status(201).json({
      status: 'success',
      data: null
    });
  }
}

module.exports = new WinnerController();
