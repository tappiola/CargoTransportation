const { Router } = require('express');
const { LossReport, Good } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, MANAGER);

router.get('/', auth, async (req, res) => {
  const { companyId: linkedCompanyId } = req;

  const reports = await LossReport.findAll({
    where: { linkedCompanyId },
    include: [Good],
  });

  res.status(200).json(reports);
});

router.post('/register', auth, async (req, res) => {
  const { goods, userId: responsibleId, consignmentNoteId } = req.body;
  const { companyId: linkedCompanyId } = req;

  const report = await LossReport.create({ 
    consignmentNoteId,
    linkedCompanyId,
    responsibleId,
  });

  goods.forEach(async ({ id, ...good }) => {
    await report.createGood(good);
  });

  return res.status(200).json(report);

});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { companyId: linkedCompanyId } = req;

  const report = await LossReport.findOne({ where: { id, linkedCompanyId } });

  if (!report) {
    return res.status(400).json({ message: 'Акт не найден' });
  }

  await report.update(req.body).catch((err) => {
    res.status(400).json(err);
  });

  return res.status(200).json(report);
});

router.delete('/', auth, async (req, res) => {
  const ids = req.body;
  const { companyId: linkedCompanyId } = req;

  await LossReport.destroy({
    where: {
      id: ids.map((id) => Number(id)),
      linkedCompanyId,
    },
  });
 
  res.status(204).end();
});

module.exports = router;
