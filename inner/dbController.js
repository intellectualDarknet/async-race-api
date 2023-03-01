const Car = require('../models/carModel.js');
const Winner = require('../models/winnerModel.js');

class ViewsController {

  addCar = async (req, res) => {
    const { name, color } = req.body
    const car = await Car.create({ name, color})
    res.status(200).json({
      status: 'success',
      car
    })
  }

  updateCar = async (req, res) => {
    const doc = await Winner.findByIdAndUpdate(req.params.name || req.body.name, req.body, {
      new: true,
      runValidators: true
    });
  }

  engine = async (req, res) => {
    const state = { velocity: {}, blocked: {} };
    const { id, status } = req.query;

    if (!id || !status || !/^(started)|(stopped)|(drive)$/.test(status)) {
        return res.status(400).send('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"');
    }

    if (!db.garage.find(car => car.id === +id)) {
        return res.status(404).send('Car with such id was not found in the garage.')
    }

    const distance = 500000;
    if (status === 'drive') {
        const velocity = state.velocity[id];

        if (!velocity) return res.status(404).send('Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?');
        if (state.blocked[id]) return res.status(429).send('Drive already in progress. You can\'t run drive for the same car twice while it\'s not stopped.');
        
        state.blocked[id] = true;

        const x = Math.round(distance / velocity);

        if (new Date().getMilliseconds() % 3 === 0) {
            setTimeout(() => {
                delete state.velocity[id];
                delete state.blocked[id];
                res.header('Content-Type', 'application/json').status(500).send('Car has been stopped suddenly. It\'s engine was broken down.');
            }, Math.random() * x ^ 0);
        } else {
            setTimeout(() => {
                delete state.velocity[id];
                delete state.blocked[id];
                res.header('Content-Type', 'application/json').status(200).send(JSON.stringify({ success: true }));
            }, x);
        }
    } else {
        const x = req.query.speed ? +req.query.speed : Math.random() * 2000 ^ 0;

        const velocity = status === 'started' ? Math.max(50, Math.random() * 200 ^ 0) : 0;

        if (velocity) {
            state.velocity[id] = velocity;
        } else {
            delete state.velocity[id];
            delete state.blocked[id];
        }

        setTimeout(() => res.header('Content-Type', 'application/json').status(200).send(JSON.stringify({ velocity, distance })), x);
    }
  }

  addUpdateWinner = async (req, res) => {

  }

  removeWinner = async (req, res) => {

  }

  addWinner = async (req, res) => {
    const { name, color } = req.body
    const car = await Car.create({ name, color})
    res.status(200).json({
      status: 'success',
      car
    })
  }

  updateWinner = async (req, res) => {

  }
  
}

module.exports = new ViewsController();
