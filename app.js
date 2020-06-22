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

export const app = express()
const uri = process.env.MONGO_URI || 8000

//db connection
export const conn = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      uri,
        { 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true 
        },
      )
      .then((res, err) =>  {
        if(err){
          mongoose.connection.on('error', (err) => {
            console.log(`DB connection error: ${err.message}`)
          })
          return reject(err)
        } else {
          console.log('DB Connected 🎈')
          resolve()
        }
      })
  })
}

// close db connection, for testing
export const close = () => {
  return mongoose.disconnect()
}

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

conn().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})