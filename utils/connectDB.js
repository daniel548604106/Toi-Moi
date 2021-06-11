const mongoose = require('mongoose')

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useFindAndModify: true
    })
    console.log('DB Connected')
  }catch(error){
    console.log(error)
  }
}

module.exports = connectDB