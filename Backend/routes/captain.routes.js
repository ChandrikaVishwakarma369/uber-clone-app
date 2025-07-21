const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');

const {body} = require('express-validator');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 character'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be atleast 3 character'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 character'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 character'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity is must be at least 1 number'),
    body('vehicle.vehicleType').isIn(['car' , 'motorcycle' , 'auto']).withMessage('Invalid')
    
], captainController.registerCaptain)

module.exports = router;