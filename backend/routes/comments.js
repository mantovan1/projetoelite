const express = require('express');
const router = express.Router();
const verifyUserToken = require('../helper/auth.js');
const CommentRepository = require('../models/Comment.js');

router.get('/:companyId', async (req, res) => {
    try {
		const companyId = req.params.companyId;
		const comments = await CommentRepository.listAllFrom(companyId);
		return res.status(200).json({comments: comments});
	} catch(err) {
		return res.status(500).send(err);
	}
});

router.post('/publish',
verifyUserToken,
async (req, res) => {
	try {
		const clientId = req.client.id;
		const companyId = req.body.companyId;
		const text = req.body.text;
		const comment = await CommentRepository.submit(clientId, companyId, text);
		if(comment) {
			return res.status(200).json({comment: comment});
		} else {
			return res.status(400).send('Algo deu errado');
		}
	} catch (err) {
		return res.status(500).send(err);
	}
});

module.exports = router;
