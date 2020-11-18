const router = require('express').Router();
const Event = require('../Db').import('../models/event');

const validateSession = require('../middleware/validateSession');

//GET ALL EVENTS
router.get('/', (req, res) => {
    Event.findAll()
        .then(event => res.status(200).json(event))
        .catch(err => res.status(500).json({error: err}));
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
        maxPlayers: req.body.maxPlayers
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

module.exports = router;