const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const reviewRoutes = require('./routes/review')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const cors = require('cors')
dotenv.config()

const app = express()
const uri = process.env.MONGO_URI || 8000

//db connection
const conn = () => {
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
// export const close = () => {
//   return mongoose.disconnect()
// }

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