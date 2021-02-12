const { Router } = require('express');
const path = require('path');

const router = Router();

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  const options = {
    root: path.join(__dirname, '../../uploads/templates'),
  };

  res.sendFile(name, options);
});

module.exports = router;
