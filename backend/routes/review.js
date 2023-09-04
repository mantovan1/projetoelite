const express = require('express');
const router = express.Router();
const verifyUserToken = require('../helper/auth.js');
const ReviewRepository = require('../repositories/ReviewRepository.js');

router.get('/check/:companyId',
verifyUserToken,
async (req, res) => {
	try {
		const clientId = req.client.id;
		const companyId = req.params.companyId;
		const review = await ReviewRepository.checkReview(clientId, companyId);
        if(review) {
			return res.status(200).json({note: review.note})
		} else {
			return res.status(400).send('não há avaliações');
		}
	} catch(err) {
		return res.status(500).send(err);
	}
})

router.post('/publish',
verifyUserToken,
async (req, res) => {
	try {
		const clientId = req.client.id;
		const companyId = req.body.companyId;
		const note = req.body.note;
		const review = await ReviewRepository.publish(clientId, companyId, note);
		if(review) {
			return res.status(200).json({review: review});
		} else {
			return res.status(400).send('Não foi possível avaliar essa empresa');
		}
	} catch(err) {
		return res.status(500).send(err);
	}
});

module.exports = router
