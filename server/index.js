require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./db/conn')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3000


connectDb()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.json({
    success:true,
    message:"Api Working."
  })
})

app.use("/api/user",userRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})