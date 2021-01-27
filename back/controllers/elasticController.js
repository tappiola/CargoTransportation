const { Router } = require('express');
const es = require('../config/elastic.config');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DISPATCHER } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, MANAGER, DISPATCHER);

router.post('/', auth, async (req, res) => {
  const { companyId } = req;
  const { index, field, query } = req.body;

  const { body } = await es.search({
    index,
    body: {
      query: {
        bool: {
          must: {
            match: {
              companyId: {
                query: companyId,
              },
            },
          },
          should: {
            match_phrase_prefix: {
              [field]: query,
            },
          },
        },
      },
    },
  });

  res.json(body.hits.hits ? body.hits.hits : []);
});

module.exports = router;
