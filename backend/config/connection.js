const mongoose = require('mongoose')
const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connected',connect.connection.host)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDb