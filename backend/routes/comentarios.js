const express = require('express');
const router = express.Router();

const db = require('../db');
const verificarTokenCliente = require('../helper/auth.js');

router.get('/consulta/:microempresaid', async (req, res) => {
        const [results, metadata] = await db.sequelize.query('SELECT clientes.email, comentarios.texto from clientes inner join comentarios on clientes.id = comentarios.clienteId where microempresaId = ' + req.params.microempresaid + ';');

        if(results.length > 0) {
                res.json(results);
        } else {
                res.status(500);
        }
});

router.post('/publicacao', verificarTokenCliente, async (req, res) => {
	try {
		const clienteId = req.userId;
		const microempresaId = req.body.microempresaId;
		const texto = req.body.texto;
		await db.sequelize.query(
			`insert into comentarios values (?, ?, ?);`,
			{
				replacements: [clienteId, microempresaId, texto]
			}
		);
		res.send('Enviado');
	} catch (e) {
		res.status(500);
	}
});

module.exports = router;
