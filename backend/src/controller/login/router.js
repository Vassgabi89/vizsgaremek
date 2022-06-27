const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../user/model');
const router = express.Router();

router.post('/', async (req, res, next) => {
    /*
    //egy felhasználó mentése
    const newUser = new User({
        email: 'test@test.hu',
        lastName: 'Elek',
        firstName: 'Test',
        password: 'test789',
    });

    try {
        await newUser.save();
    } catch(e) {
        res.statusCode = 401;
        return res.json({error: 'Database Error!'});
    }

    return res.json({message: 'user created'});

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: 'jperrycosta@whitehouse.gov', password: '$2a$10$qKO3YDLLxTTJ2C3/y7RCUev/6k3nfcnVrtds5R7VCeH2srRL5WbYG'})
    })
    .then(r => r.json())
    .then(d => console.log(d))

    */

    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email
    });

    if (!user) {
        return res.sendStatus(404);
    }

    user.comparePassword(password, (err, isMatch) => {
        if (err) {
            return res.sendStatus(401)
        }

        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: 1,
        }, 'rendkívültitkosszöveg', {
            expiresIn: '1h',
        });

        res.json({
            success: true,
            accessToken,
            user: {
                ...user._doc,
                password: ''
            },
        });

    })
})

module.exports = router;