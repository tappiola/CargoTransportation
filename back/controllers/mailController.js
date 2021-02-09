const { Router } = require('express');
const { authorize } = require('../middlewares/auth');
const { CongratulationTemplate } = require('../models');

const router = Router();
const auth = authorize();

router.post('/', auth, async (req, res) => {
  const { companyId: linkedCompanyId, files } = req;
  const { color, text, userId, image } = JSON.parse(req.body.data);

  let template = await CongratulationTemplate.findOne({ where: { userId } });

  const data = { linkedCompanyId, color, text, userId };

  if (template) {
    await template.update(data);
  } else {
    template = await CongratulationTemplate.create(data);
  }

  if (files) {
    const { image: file } = files;
    const randomName = `${Date.now()}.${file.name.split('.')[1]}`;

    template.image = randomName;
    image.mv(`uploads/templates/${randomName}`);

    return res.status(204).end();
  }

  template.image = image;
  template.save();

  return res.status(204).end();
});

router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  // await CongratulationTemplate.sync({ force: true });
  const template = await CongratulationTemplate.findOne({ where: { userId } });

  if (template) {
    return res.status(200).json(template);
  }

  return res.status(404).end();
});

module.exports = router;
