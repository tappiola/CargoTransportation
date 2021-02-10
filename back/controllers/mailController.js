const { Router } = require('express');
const { authorize } = require('../middlewares/auth');
const { CongratulationTemplate } = require('../models');

const router = Router();
const auth = authorize();

router.post('/', auth, async (req, res) => {
  const { companyId: linkedCompanyId, files } = req;
  const data = JSON.parse(req.body.data);

  let template = await CongratulationTemplate.findOne({ where: { userId: data.userId } });

  if (template) {
    await template.update({ ...data, linkedCompanyId });
  } else {
    template = await CongratulationTemplate.create({ ...data, linkedCompanyId });
  }

  if (files) {
    const randomName = `${Date.now()}.${files.image.name.split('.')[1]}`;
    files.image.mv(`uploads/templates/${randomName}`);
    template.image = randomName;
    template.save();
  }
  
  return res.status(204).end();
});

router.get('/:userId', auth, async (req, res) => {
  // await CongratulationTemplate.sync({ force: true });
  const { userId } = req.params;
  const template = await CongratulationTemplate.findOne({ where: { userId } });

  return res.status(200).json(template || {});
});

module.exports = router;
