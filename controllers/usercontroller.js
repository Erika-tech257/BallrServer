const router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const bcrpyt = require('bcryptjs'); 
const User = require('../Db').import('../models/User'); 
const cloudinary = require('cloudinary');

const validateSession = require('../middleware/validateSession');

router.post('/signup', (req, res) => {
    User.create({
        email: req.body.email, 
        password: bcrpyt.hashSync(req.body.password, 12),
        rating: req.body.rating, 
        displayname: req.body.displayname,
        description: req.body.description,
        profilepic: req.body.profilepic
    }) 
    .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' })

        res.status(200).json({
            user: user, 
            message: 'user created successfully', 
            sessionToken: token
        })
    })
    .catch(err => res.status(500).json({ error: err }))
}) 

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if (user) {
                bcrpyt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' }); 

                        res.status(200).json({
                            user: user, 
                            message: 'user successfully authenticated', 
                            sessionToken: token
                        })
                    } else {
                        res.status(500).json({ error: 'password mismatch' })
                    }
                })
            } else {
                res.status(500).json({ error: 'user not found' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
})


// add friend route using user displayname
// http://localhost:3000/user/search
// http://localhost:3000/user/search/(displayname)

router.get('/search/:displayname', (req, res) =>{
    User.findOne ({
        where: {
            displayname: req.params.displayname
    }
})
    .then(
        res.status("User Found!"))
        .catch(err => res.status(500).json({ error: err}))
})

// delete friend using email endpoint

router.delete('/search/:email',async (req, res) =>{
    try{
        const results = await User.destroy({
            where: { email: req.params.email}
        });
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error:err});
    }

})

// Profile Image Upload

router.get('/cloudsign', validateSession, async (req, res) => {
    try {
        const ts = Math.floor(new Date().getTime() / 1000).toString()
        

        const sig = cloudinary.utils.api_sign_request(
            {timestamp: ts, upload_preset: 'uuhz0rq7'},
            process.env.CLOUDINARY_SECRET

        )
        
        res.status(200).json({
            sig, ts
        })
    } catch (err) {
        res.status(500).json({
            message: 'sign failed'
        })
    }
})

router.put('/imageset', validateSession, async (req, res) => {
    try {
        const u = await User.findOne({where: {id: req.user.id}})

        const result = await u.update({
            avatar: req.body.url 
        })

        res.status(200).json({
            message: 'avatar url saved',
            result
        })
    } catch (err){
        res.status(500).json({
            message: 'failed to set image'
        })
    }
})

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    })
    .then(user => res.status(200).json({ user: user }))
    .catch(err => res.status(500).json({ error: err }))
})


module.exports = router; 