const es = require('../config/elastic.config');
// const { Client } = require('../models');

// async function run() {
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

const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const { firstName } = req.query;

  const { body } = await es.search({
    index: 'clients',
    body: {
      query: {
        match_phrase_prefix: {
          firstName,
        },
      },
    },
  });

  res.status(200).json(body.hits ? body.hits.hits : []);
});

module.exports = router;
