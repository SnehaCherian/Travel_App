const CallbackRequest = require('../models/callback-requests').CallbackRequest;
const uniqid = require('uniqid');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await CallbackRequest.find());
});
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    }) 
    await newRequest.save()
    resp.send('Accepted');
});
router.delete('/:id', authMiddleware, async (req, resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;