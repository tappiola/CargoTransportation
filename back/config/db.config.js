module.exports = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_DEV;
