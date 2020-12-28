const { Pool } = require( 'pg' );

const prodConfig = {
   connectionString : process.env.DATABASE_URL,
   ssl              : true
};
const devConfig = {
   connectionString : process.env.DATABASE_URL_DEV
};
const pool = new Pool( process.env.NODE_ENV === 'production' ? prodConfig : devConfig );

module.exports = pool;

module.exports.checkIfTableExists = async ( tableName ) => {
   const $sql = `SELECT EXISTS(SELECT 1 FROM pg_tables WHERE tablename = '${tableName}')`;
   try {
      const check = await pool.query( $sql );
      return check.rows[0].exists;
   } catch (e) {
      console.log( e.message );
   }
};

module.exports.createTable = async ( name, params ) => {
   const $sql = `create table IF NOT EXISTS ${name} (${params});`;
   
   try {
      await pool.query( $sql );
   } catch (e) {
      console.log( e.message );
   }
};

module.exports.createItem = async ( tableName, data ) => {
   const keys = Object.keys( data );
   const $values = Object.keys( data ).map( ( item, idx ) => `$${idx + 1}` );
   const values = Object.values( data );
   
   const query = {
      text : `INSERT INTO ${tableName} (${keys}) VALUES (${$values}) RETURNING *`,
      values
   };
   
   const newItem = await pool.query( query );
   return newItem.rows[0];
};