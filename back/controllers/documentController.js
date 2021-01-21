const { Router } = require('express');
const { Documents } = require('../models');

const router = Router();

router.get('/:userId', async (req, res) => {
  const {userId} = req.params;
  console.log(userId);

  const documentData = await Documents.findOne({where: {userId}});

  res.status(200).json(documentData || {});
});

module.exports = router;
