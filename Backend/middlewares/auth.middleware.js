const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//middleware
module.exports.authUser = async (req, res, next ) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    const isBlacklisted = await userModel.findOne({token : token});
    //agar token mil gai to vo decoded hoker try catch me jayega
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message : 'Unauthrized User'});

    }
}