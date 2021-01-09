const { Router } = require('express');
const {
  ConsignmentNote,
  User,
  Vehicle,
  Client,
  Warehouse,
  ConsignmentNoteStatus,
} = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const clients = await ConsignmentNote.findAll({
    attributes: ['id', 'number', 'issuedAt'],
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
        model: Warehouse,
        attributes: ['name', 'fullAddress', 'country', 'city', 'street', 'house'],
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
      },
      {
        model: Vehicle,
        attributes: ['number'],
      }],
  });
  res.status(200).json(clients);
});

router.delete('/', async (req, res) => {
  const { ids } = req.query;

  await ConsignmentNote.destroy({
    where: {
      id: ids.split(',').map((id) => +id),
    },
  });

  res.status(204).json({});
});

module.exports = router;
