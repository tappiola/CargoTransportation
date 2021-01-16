module.exports = app => {
  app.use((req, res, next) => {
    res.sendError = (code, text) => {
      return res.status(code).json({error: {message: text}});
    };
    next();
  });
};
