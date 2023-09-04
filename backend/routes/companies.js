const express = require('express');
const router = express.Router();
const CompanyRepository = require('../repositories/CompanyRepository');

router.get('/:category', async (req, res) => {
        try {
            const category = req.params.category;
            const companies = CompanyRepository.findByCategory(category);
            return res.status(200).json({companies: companies});
        } catch(err) {
                return res.status(500).send(err);
        }
})

/*
router.get('/consulta/destaque', async (req, res) => {
        const [results, metadata] = await db.sequelize.query("select m.id, m.nome_empresa, m.cep, m.categoria, m.telefone, m.whatsapp, m.email, m.site, m.instagram, m.facebook, m.descricao, m.foto_perfil, AVG(a.nota) from avaliacoes as a join microempresas as m on m.id = a.microempresaId group by a.microempresaId order by AVG(a.nota) desc limit 10");

        //console.log(results.microempresaId);

        res.json(results);

})
*/

router.get('/:category/:name', async (req, res) => {
        try {
            const category = req.params.category;
            const name = req.params.name;
            const companies = await CompanyRepository.findByCategoryAndName(category, name);
            return res.status(200).json({companies: companies});
        } catch(err) {
            return res.status(500).send(err);
        }
})


module.exports = router
