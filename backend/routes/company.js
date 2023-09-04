const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();
const { uuid } = require('uuidv4')
const CompanyRepository = require('../repositories/CompanyRepository');
const Company = require('../models/Company');

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
})

router.post('/signup',
upload.single('photo'),
async (req, res) => {
	try {
		const { filename, size } = req.file;
	  	const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const newCompany = {
			owner: req.body.owner,
			name: req.body.name,
			cnpj: req.body.cnpj,
			cep: req.body.cep,
			category: req.body.category,
			phone: req.body.phone,
			whatsapp: req.body.whatsapp,
			email: req.body.email,
			site: req.body.site,
			instagram: req.body.instagram,
			facebook: req.body.facebook,
			desc: req.body.desc,
			password: hashedPassword,
			profile_picture_address: filename 
		}
		const company = await CompanyRepository.createCompany(newCompany);
		if (company) {
			delete company['password'];
			const token = jwt.sign({company}, 'jwtSecret', {
				expiresIn: '30d',
			});
			return res.status(200).json({auth: true, token: token, company: company});
		} else {
		    res.status(400).send('a empresa não foi cadastrada!');
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post('/login', async (req, res) => {
	try {
		const name = req.body.name;
		const password = req.body.password;
		let company = await Company.findOne({
			where: {
				name: name
			}
		});
		if (company) {
			company = company.dataValues;
			if(await bcrypt.compare(password, company.password)) {
				delete company['password'];
				console.log(company)
				const token = jwt.sign({company}, 'jwtSecret', {
						expiresIn: '30d',
				});
				res.json({auth: true, token: token, company: company});
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

module.exports = router
