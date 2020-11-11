const router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const bcrpyt = require('bcryptjs'); 
const User = require('../Db').import('../models/User'); 

router.post('/signup', (req, res) => {
    User.create({
        email: req.body.email, 
        password: bcrpyt.hashSync(req.body.password, 10),
        rating: req.body.rating, 
        displayname: req.body.displayname
    })
    .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).json({
            user: user, 
            message: 'user created successfully', 
            sessionToken: token
        })
    })
    .catch(err => res.status(500).json({ error: err }))
})


// friend request route
// http://localhost:3000/user/search

router.get('/search/:displayname', (req, res) =>{
    User.findOne ({
        where: {
            displayname: req.body.displayname
    }
    .then(
        res.send("It Works!")
    )
})

})

module.exports = router; 