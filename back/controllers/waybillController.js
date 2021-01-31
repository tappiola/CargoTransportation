const { Op } = require('sequelize');
const { Router } = require('express');
const { Waybill, WaybillStatus, ConsignmentNote, Warehouse } = require('../models');
const { authorize } = require('../middlewares/auth');
const {
  ROLES: { ADMIN, MANAGER, DISPATCHER },
} = require('../constants');
const {
  WAYBILL_STATUSES_ID,
  CONTROL_POINT_STATUSES_ID: { EXPECTED },
} = require('../constants');
const { ControlPoint } = require('../models/ControlPoint');

const auth = authorize(ADMIN, MANAGER, DISPATCHER);

const router = Router();

router.get('/', auth, async (req, res) => {
  const { companyId: linkedCompanyId } = req;

  const clients = await Waybill.findAll({
    attributes: {
      exclude: ['waybillStatusId', 'consignmentNoteId'],
    },
    where: { linkedCompanyId },
    include: [
      {
        model: WaybillStatus,
        attributes: ['status'],
      },
      {
        model: ConsignmentNote,
        attributes: ['number'],
      },
      {
        model: Warehouse,
      },
    ],
  });

  res.status(200).json(clients);
});

router.delete('/', auth, async (req, res) => {
  const ids = req.body;

  await Waybill.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const waybill = await Waybill.findOne({ where: { id } });
  const controlPoints = await ControlPoint.findAll({ where: { waybillId: id } });

  await ControlPoint.destroy({ 
    where: {
      name: null,
      // waybillId: id,
    },
  });

  res.status(200).json({ waybill, controlPoints });
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { client, consignmentNote, vehicle, warehouse, waybill, points } = req.body;

  // client.departedAt
  // warehouse.expectedArrivalAt
  // country, city, street, house - warehouse.fullAddress
  // waybillStatusId - 3 - Оформлен
  // warehouseId - тот же
  // linkedCompanyId - тот же

  // Control Point
  // points => ControlPoint
  //            name - name
  //            expectedArrivalAt - date
  //            controlPointStatusId -
  // ControlPoints constrolPointStatusId
  const [country, city, street, house] = warehouse.fullAddress.split(', ');
  
 

  await ControlPoint.destroy({ 
    where: {
      name: {
        [Op.not]: points ? points.filter(p => p).map(({ name }) => name) : [],
      },
      waybillId: id,
    },
  });

  if (points && points.length) {
    await ControlPoint.bulkCreate(
      points.map((controlPoint) => ({
        controlPointStatusId: EXPECTED,
        waybillId: id,
        ...controlPoint,
      })));
  }

  const wb = await Waybill.update(
    {
      departedAt: client.departedAt,
      expectedArrivalAt: warehouse.expectedArrivalAt,
      waybillStatusId: WAYBILL_STATUSES_ID.ISSUED,
      country, city, street, house
    },
    {
      where: { id }
    }
  );
  
  res.status(200).json(wb);
});

module.exports = router;
