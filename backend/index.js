const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDb = require('./config/connection')
const userRoute = require('./routes/userRoute')
const tweetRoute = require('./routes/tweetRoute')
const app = express()


// port 

const PORT = process.env.PORT || 8081
connectDb()


// middleware.
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    { credentials: true,
     origin:process.env.FRONTEND }
    ));



// routes
// app.get('/',(req,res)=>{
//     res.send("server is runing")
// })

app.use('/api/user',userRoute)
app.use('/api/tweet',tweetRoute)



// server runing 

app.listen(PORT,()=>{
    console.log(`server is runing on ${PORT}`)
})