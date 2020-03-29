module.exports = {
  port: process.env.PORT || 3001,
  allowedOrigin: process.env.ORIGIN || 'http://localhost:3000',
  mongoDBConnection: process.env.MONGO_CONNECTION || 'mongodb+srv://milosReadWrite:XInua9BoHgl2qJGi@cluster0-drmr0.mongodb.net/test?retryWrites=true&w=majority',
  secret: process.env.SECRET || '10829KS,O!,.QQlamk83002'
}
