const { Router } = require('express');

const router = Router();

const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DISPATCHER } } = require('../constants');

const auth = authorize(ADMIN, MANAGER, DISPATCHER);
const { Vehicles } = require('../models');

router.get('/', auth, async (req, res) => {
  const vehicles = await Vehicles.findAll();

  res.status(200).json(vehicles);
});

router.get('/:id', auth, async (req, res) => {
  const vehicle = await Vehicles.findByPk(req.params.id);

  res.status(200).json(vehicle);
});

router.post('/create', auth, async (req, res) => {
  const { companyId: linkedCompanyId } = req;

  try {
    const newVehicle = await Vehicles.create({
      ...req.body,
      linkedCompanyId
    });
    return res.status(200).json(newVehicle);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { companyId: linkedCompanyId } = req;

  if (!id) {
    return res.status(400).end();
  }

  try {
    const vehicle = await Vehicles.findOne({
      where: { id, linkedCompanyId },
    });
    vehicle.number = req.body.number;
    vehicle.linkedCompanyId = linkedCompanyId;
    await vehicle.save();

    return res.status(200).end();
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.delete('/', async (req, res) => {
  const ids = req.body.map((id) => Number(id));

  await Vehicles.destroy({
    where: {
      id: ids,
    },
  });

  res.status(204).end();
});

module.exports = router;
