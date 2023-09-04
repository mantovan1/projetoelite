const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const session = require('express-session');
const verifyUserToken = require('../helper/auth.js');
const ClientRepository = require('../repositories/ClientRepository.js');

router.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

router.post('/signup', async (req, res) => {
	try {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const client = await ClientRepository.createClient(name, email, hashedPassword);
		if (client) {
		    delete client['password'];
		    const token = jwt.sign({client}, 'jwtSecret', {
		        expiresIn: '30d',
		    });
		    return res.status(200).json({auth: true, token: token, client: client});
		} else {
		    return res.status(400).send('something went wrong');
		}
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		let client = await Client.findOne({ where: {email: email} });
		if (client) {
			client = client.dataValues;
			if(await bcrypt.compare(password, client.password)) {	
				delete client['password'];
				const token = jwt.sign({client}, 'jwtSecret', {
					expiresIn: '30d',
				});				
		        return res.status(200).json({auth: true, token: token, client: client});
			} else {
				return res.status(400).send('Informações erradas');
			}	
		} else {
			return res.status(400).send('Algo deu errado');
		}
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.get('/yourinfo',
verifyUserToken,
async (req, res) => {
    try {
		return res.json({client: req.client});
	} catch(err) {
		return res.status(500).send(err);
	}
});

module.exports = router
