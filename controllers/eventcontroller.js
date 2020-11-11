const router = require('express').Router();
const Event = require('../Db').import('../models/event');

const validateSession = require('../middleware/validate-session');

router.get('/', (req, res) => {
    Event.findAll()
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json({error: err}));
})

//router.post('/new',validateSession, (req, res) => {
router.post('/new', (req, res) => {
    const eventFromRequest = {
        name: req.body.name,
        sport: req.body.sport,
        location: req.body.location,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        currentPlayers: req.body.currentPlayers,
        maxPlayers: req.body.maxPlayers
    }

    Event.create(eventFromRequest)
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json({error: err}));
})

module.exports = router;