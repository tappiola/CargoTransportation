module.exports=app=>{
   //+ Error handler
   app.use( ( req, res, next ) => {
      const err = new Error( 'not found' );
      err.status = 404;
      next( err );
   } );
   
   app.use( ( err, req, res ) => {
      const status = err.status || 500;
      res.status( status ).json( { error : { message : err.message } } );
   } );
//- Error handler
}