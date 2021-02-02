const { Router } = require('express');
const {
  ConsignmentNote,
  User,
  Client,
  ConsignmentNoteStatus,
  Documents,
  Good,
  Waybill,
} = require('../models');
const { authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {
  ROLES: { ADMIN, MANAGER, DISPATCHER },
  CONSIGNMENT_NOTES_STATUSES_ID: { ACCEPTED, VERIFIED },
} = require('../constants');

const router = Router();
const auth = authorize(ADMIN, MANAGER, DISPATCHER);

router.get('/', auth, async (req, res) => {
  const { companyId: linkedCompanyId } = req;

  const consignmentNotes = await ConsignmentNote.findAll({
    attributes: ['id', 'number', 'issuedDate', 'vehicle'],
    where: { linkedCompanyId },
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
      },{
        model: Waybill,
      }
    ],
  });

  res.status(200).json(consignmentNotes);
});

router.delete('/', auth, async (req, res) => {
  const ids = req.body;

  await ConsignmentNote.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

router.post('/create', [auth, validate.consignmentNote], async (req, res) => {
  const { companyId: linkedCompanyId, userId: createdById } = req;
  const {
    number, passportNumber, passportIssuedBy, passportIssuedAt, goods, ...consignmentNoteData
  } = req.body;

  const existingNote = await ConsignmentNote.findOne({ where: { number } });

  if(existingNote){
    res.status(400).json({ message: `ТТН ${number} уже существует` } );
  }

  const newNote = {
    ...consignmentNoteData,
    number,
    linkedCompanyId,
    consignmentNoteStatusId: ACCEPTED,
    createdById,
  };

  const { id } = await ConsignmentNote.create(newNote);

  await Documents.upsert({
    passportNumber,
    passportIssuedBy,
    passportIssuedAt,
    userId: consignmentNoteData.driverId,
  });

  await Good.bulkCreate(goods.map(good => ({ ...good, goodStatusId: 1, consignmentNoteId: id })));

  res.status(200).json({ id, consignmentNote: number });
});

router.put('/', auth, async (req, res) => {
  const { id } = req.body;

  await ConsignmentNote.update(
    { consignmentNoteStatusId: VERIFIED },
    { where: { id } },
  );

  res.status(204).end();
});

router.get('/:id', auth, async (req, res) => {
  const { id: consignmentNoteId } = req.params;

  const consignmentNote = await ConsignmentNote.findOne({
    where: { id: consignmentNoteId },
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

  const goods = await Good.findAll({ where: { consignmentNoteId } });

  res.status(200).json({  consignmentNote, goods });
});

module.exports = router;
