const User = require('../models/users').User;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../controllers/auth');

router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    if(user.length > 0) {
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin'
            }); 
        } else {
            resp.status(400);
            resp.send('Rejected');
        }
    } else {
        resp.send('Rejected');
    }
})

router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    if(user.length === 0) {
        let encryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send('Successfully registered');
    } else {
        resp.send('User already exists!');
    }
})

module.exports = router;