const router = require('express').Router();
const Event = require('../Db').import('../models/event');
const EventSignUp = require('../Db').import('../models/eventSignUp');
const validateSession = require('../middleware/validateSession');

//GET ALL EVENTS
router.get('/', (req, res) => {
    Event.findAll()
        .then(event => res.status(200).json(event))
        .then(events => console.log(events))
        .catch(err => res.status(500).json({error: err}));
})

//GET ONE EVENT
router.get('/:id', (req, res) => {
    Event.findOne({
        where: { id: req.params.id }
    })
    .then(event => res.status(200).json({ event: event }))
    .catch(err => res.status(500).json({ error: err }))
})

//CREATE EVENT
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
        maxPlayers: req.body.maxPlayers,
        createdById: req.body.createdById
    }

    Event.create(eventFromRequest)
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json({error: err}));
})

//EDIT EVENT
router.put('/edit/:id', (req, res) => {
    Event.update(req.body, {
        where: { id: req.params.id }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))


});

//DELETE EVENT
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Event.destroy({
            where: { id: req.params.id }
        })

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

//GET EVENTS USER IS HOSTING
router.get('/my/:id', (req, res) => {
    Event.findAll(req.body, {
        where: { id: req.params.createdById }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({error: err}));
})

router.get( '/findEvents/:eventId', (req, res) => {
    EventSignUp.findAll({
        where: { eventId: req.params.eventId }
    })
    // .then(signUps => res.status(200).json(signUps))
    .then(signUpsObj => {
        res.status(200).json(signUpsObj)
        console.log('signUps:' + signUpsObj)})
    .catch(err => res.status(500).json({error: err}))
})

router.get('/findMyEvents/:eventId/:playerId', (req, res) => {
    EventSignUp.findAll({
        where: {
            eventId: req.params.eventId,
            playerId: req.params.playerId
        }
    })
    .then(signUps => {
        console.log(signUps.body)
        res.status(200).json(signUps)
    })
    .catch(err => res.status(500).json({error: err}));
})

//EVENT SIGN UP
router.post('/signup', (req, res) => {
    const signUpFromRequest = {
        playerId: req.body.playerId,
        eventId: req.body.eventId
    }

    EventSignUp.create(signUpFromRequest)
        .then(signUp => res.status(200).json(signUp))
        .catch(err => res.status(500).json({error: err}));
})

router.put('/updatePlayers/:eventId', (req, res) => {
    Event.update(req.body, {
        where: { id: req.params.eventId }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/deleteSignUp/:userId/:eventId', async (req, res) => {
    try {
        const result = await EventSignUp.destroy({
            where: { 
                playerId: req.params.userId,
                eventId: req.params.eventId 
            }
        })

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;