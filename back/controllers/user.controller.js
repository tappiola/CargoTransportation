const { hashPassword, isPasswordValid } = require('../utils/password.utils');
const { getSignedToken } = require('../utils/token.utils');
const { User, Role, Company } = require('../models');

exports.index = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'fullName', 'lastName', 'firstName', 'middleName', 'email', 'isActive'],
    include: [
      {
        model: Role,
        attributes: [],
        where: { role: 'admin' },
      },
      {
        model: Company,
        attributes: ['name', 'unn'],
      },
    ],
  });
  res.status(200).json(users);
};

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(400).json({ error: { message: 'Email already in use!' } });
  }

  try {
    const newUser = await User.create({ email, password: await hashPassword(password) });
    const token = getSignedToken(newUser);

    res.status(200).json({ token });
  } catch (e) {
    e.status = 400;
    next(e);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: { message: 'invalid email/password' } });
  }

  const isValid = isPasswordValid(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: { message: 'invalid password' } });
  }

  const token = getSignedToken(user);
  res.status(200).json({ token });
};

exports.delete = async (req, res) => {
  const { ids } = req.query;

  await User.destroy({
    where: {
      id: ids.split(',').map((id) => +id),
    },
  });

  res.status(204).json({});
};
