const Logger = require('../../config/logger');

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  const valid = error === null;

  if (!valid) {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');

    Logger.error(message);
    return res.status(422).json({ error: message });
  }

  return next();
};
