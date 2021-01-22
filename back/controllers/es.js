const es = require('../config/elastic.config');

// const { Client } = require('../models');

// async function createIndex() {
//   const clients = await Client.findAll({ where: {} });

//   clients.forEach(async (client) => {
//     await es.index({
//       index: 'clients',
//       body: {
//         firstName: client.firstName,
//         companyName: client.companyName,
//       },
//     });
//   });

//   await es.indices.refresh({ index: 'clients' });

// }
// createIndex();

const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const { query, index, field } = req.body;
  console.log(query, index, field);

  const { body } = await es.search({
    index,
    body: {
      query: {
        match_phrase_prefix: {
          [field]: query,
        },
      },
    },
  });

  res.status(200).json(body.hits ? body.hits.hits : []);
});

module.exports = router;
