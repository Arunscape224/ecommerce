import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import productRoutes from './routes/product'
import categoryRoutes from './routes/category'
import morgan from 'morgan'
import expressValidator from 'express-validator';

dotenv.config()

const app = express()
const uri = process.env.MONGO_URI
//db connection
mongoose.connect(
  uri,
    { 
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true 
    },
  )
  .then(() => console.log('DB Connected 🎈'))
   
  mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`)
  })

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})