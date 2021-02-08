const { Router } = require('express');
const path = require('path');
const { authorize } = require('../middlewares/auth');
const { CongratulationTemplate } = require('../models');

const router = Router();
const auth = authorize();

router.post('/', auth, async (req, res) => {
  const { companyId, files } = req;
  const { color, text, userId } = req.body;
  console.log(color, text, userId);

  if (files && companyId) {
    const { image } = files;
    const randomName = `${Date.now()}.${image.name.split('.')[1]}`;

    await CongratulationTemplate.create({
      linkedCompanyId: companyId,
      image: randomName,
      color,
      text,
      userId,
    });

    image.mv(`uploads/templates/${randomName}`);
    
    return res.status(204).end();
  }
  return res.status(500).end();
});

router.get('/images/:image', auth, async (req, res) => {
  const { image } = req.params;

  const options = {
    root: path.join(__dirname, '../../uploads/templates'),
  };

  res.sendFile(image, options);
});

router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const { image, text, color } = await CongratulationTemplate.findOne({ where: { userId } });

  res.json({ image, text, color });
});

module.exports = router;
