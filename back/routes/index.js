const userRouter = require('./users');

module.exports=app=>{
   //Users
   app.use('/users', userRouter)
}