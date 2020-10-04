import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import reviewRoutes from './routes/review'
import productRoutes from './routes/product'
import braintreeRoutes from './routes/braintree'
import orderRoutes from './routes/order'
import categoryRoutes from './routes/category'
import morgan from 'morgan'
import expressValidator from 'express-validator';
import cors from 'cors'
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
            useUnifiedTopology: true,
            useFindAndModify: false  
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

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())
app.use(expressValidator())

app.use('/api', authRoutes)
app.use('/api', reviewRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', braintreeRoutes)
app.use('/api', orderRoutes)

const port = process.env.PORT || 8000

conn().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})