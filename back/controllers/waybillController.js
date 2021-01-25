const { Router } = require('express');
const {
  Waybill,
  WaybillStatus,
  ConsignmentNote,
} = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DISPATCHER } } = require('../constants');
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

module.exports = router;
