const express = require('express');
const dbController = require('../controllers/authController');

const router = express.Router();

router.post('/', dbController.createBooking)
router.get('/all', dbController.getAllBooking)
router.get('/:id', dbController.getBooking)
router.patch('/:id', dbController.updateBooking)
router.delete('/:id', dbController.deleteBooking)
router.delete('/engine', dbController.engine)

module.exports = router;
