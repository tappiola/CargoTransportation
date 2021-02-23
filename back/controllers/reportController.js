const { Router } = require('express');
const { LossReport, Good, User, Company, ConsignmentNote } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DRIVER } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, MANAGER, DRIVER);

router.get('/', auth, async (req, res) => {
  const reports = await LossReport.findAll({
    include: [
      Good,
      {
        model: Company,
        as: 'linkedCompany',
      },
      {
        model: ConsignmentNote,
        attributes: ['number'],
      },
      {
        model: User,
        as: 'responsible',
      }],
    order: [
      ['reportedAt', 'DESC'],
    ]
  });

  res.status(200).json(reports);
});

router.get('/mobile/:driverId', auth, async (req, res) => {
  const reports = await LossReport.findAll({
    where: { responsibleId: req.params.driverId },
    include: [Good, {
      model: ConsignmentNote,
      attributes: ['number', 'issuedDate'],
    }],
    order:[
      ['reportedAt', 'DESC'],
    ]
  });

  res.status(200).json(reports);
});

router.post('/register', auth, async (req, res) => {
  const { goods, userId: responsibleId, consignmentNoteId, linkedCompanyId, reportedAt } = req.body;

  const report = await LossReport.create({
    consignmentNoteId,
    linkedCompanyId,
    responsibleId,
    reportedAt,
  }).catch(() => {
    res.status(400).json({ message: 'Некорректные данные' });
  });

  if (goods) {
    goods.forEach(async ({ id, ...good }) => {
      await report.createGood(good);
    });
  }

  return res.status(200).json(report);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;

  const report = await LossReport.findOne({ where: { id } });

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

  await LossReport.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

module.exports = router;
