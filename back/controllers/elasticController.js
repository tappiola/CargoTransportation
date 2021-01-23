const es = require('../config/elastic.config');

// const { Client, User } = require('../models');

// async function createIndex() {
//   const clients = await Client.findAll({ where: {} });
//   const users = await User.findAll({ where: {} });

//   clients.forEach(async ({ firstName, companyName, id }) => {
//     await es.index({
//       id,
//       index: 'clients',
//       body: { firstName, companyName },
//     });
//   });

//   users.forEach(async ({ firstName, lastName, id }) => {
//     await es.index({
//       id,
//       index: 'users',
//       body: { firstName, lastName },
//     });
//   });

//   await es.indices.refresh({ index: 'clients' });
//   await es.indices.refresh({ index: 'users' });
// }
// createIndex();

// async function deleteIndex() {
//   await es.indices.delete({
//     index: '_all',
//   });
// }
// deleteIndex();

function router(ws) {
  ws.on('message', async (msg) => {
    const { index, field, query } = JSON.parse(msg);
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

    ws.send(JSON.stringify(body.hits ? body.hits.hits : []));
  });
}

module.exports = router;
