const es = require('../config/elastic.config');

// const { Client, User } = require('../models');

// async function createIndex() {
//   const clients = await Client.findAll({ where: {} });
//   const users = await User.findAll({ where: {} });

//   clients.forEach(async ({ lastName, firstName, middleName, companyName, id }) => {
//     await es.index({
//       id,
//       index: 'clients',
//       body: { lastName, firstName, middleName, companyName, id },
//     });
//   });

//   users.forEach(async ({ firstName, lastName, id }) => {
//     await es.index({
//       id,
//       index: 'users',
//       body: { firstName, lastName, id },
//     });
//   });

//   await es.indices.refresh({ index: 'clients' });
//   await es.indices.refresh({ index: 'users' });
// }
// createIndex();

// async function deleteIndex(index) {
//   await es.indices.delete({
//     index: index || '_all',
//   }).then(
//     (resp) => console.log(resp),
//     (err) => console.log(err)
//   );
// }
// deleteIndex('clients');

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

    ws.send(JSON.stringify(body.hits.hits ? body.hits.hits : []));
  });
}

module.exports = router;
