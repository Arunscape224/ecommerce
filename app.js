import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routes/user'
import morgan from 'morgan'
import expressValidator from 'express-validator';

dotenv.config()

const app = express()

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    { 
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true 
    },
  )
  .then(() => console.log('DB Connected 🎈'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  })

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})