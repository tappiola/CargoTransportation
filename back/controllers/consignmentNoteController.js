const { Router } = require('express');
const {
  ConsignmentNote,
  User,
  Client,
  ConsignmentNoteStatus,
  Documents,
  Good
} = require('../models');
const validate = require('../middlewares/validate');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const clients = await ConsignmentNote.findAll({
    attributes: ['id', 'number', 'issuedAt', 'vehicle'],
    where: { linkedCompanyId: companyId },
    include: [
      {
        model: ConsignmentNoteStatus,
        attributes: ['status'],
      },
      {
        model: Client,
        attributes: ['shortFullName', 'lastName', 'firstName', 'middleName'],
      },
      {
        model: User,
        as: 'driver',
        attributes: ['shortFullName', 'lastName', 'firstName', 'middleName'],
      },
      {
        model: User,
        as: 'assignedTo',
        attributes: ['shortFullName', 'lastName', 'firstName', 'middleName'],
      },
      {
        model: User,
        as: 'createdBy',
        attributes: ['shortFullName', 'lastName', 'firstName', 'middleName'],
      }],
  });

  res.status(200).json(clients);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await ConsignmentNote.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

router.post('/create', validate.consignmentNote, async (req, res) => {
  console.log('/create:', req.body);

  const { passportNumber, passportIssuedBy, passportIssuedAt, goods, ...consignmentNoteData} = req.body;

  const newNote = {
    ...consignmentNoteData,
    linkedCompanyId: 1, // TODO: replace with real value
    issuedAt: new Date().toISOString(),
    consignmentNoteStatusId: 1,
    createdById: 14, // TODO: replace with real value
  };


  const {id} = await ConsignmentNote.create(newNote);

  await Documents.upsert({
    passportNumber,
    passportIssuedBy,
    passportIssuedAt,
    userId: consignmentNoteData.driverId,
  });

  await Good.bulkCreate(goods.map(good => ({...good, goodStatusId: 1, consignmentNoteId: id})));

  res.status(200).json({id, consignmentNote: consignmentNoteData.number});
});

module.exports = router;

