const express = require('express');
const router = express.Router();
const verifyUserToken = require('../helper/auth.js');
const FavoriteRepository = require('../repositories/FavoriteRepository');

router.get('/check/:companyId',
verifyUserToken,
async (req, res) => {
	try {
		const clientId = req.client.id;
		const companyId = req.params.companyId;

		const check = FavoriteRepository.check(clientId, companyId);
		if(check) {
			return res.status(200);
		} else {
			return res.status(404);
		}
	} catch(err) {
		return res.status(500).send(err);
	}
});

router.get('/list/',
verifyUserToken,
async (req, res) => {
	try {
		const clientId = req.client.id;
		const favorites = await FavoriteRepository.list(clientId);
		return res.status(200).json({favorites: favorites});
	} catch(err) {
		return res.status(500).send(err);
	}
});

router.post('/add',
verifyUserToken,
async (req, res) => {
	try {
		const clientId = req.client.id;
		const companyId = req.body.companyId;
		const favorite = FavoriteRepository.add(clientId, companyId);
		if(favorite) {
			return res.status(200).json({favorite: favorite});
		}
	} catch(err) {
		return res.status(500).send(err);
	}
})

module.exports = router

