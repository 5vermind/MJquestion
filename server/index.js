const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const { User } = require('./models/User')
const { wrapper } = require('./util/asyncWrapper')
const { auth } = require('./middleware/auth')

const app = express()
const port = 5000

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//application/json
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/user/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) return res.json({ registerSuccess: false, err })
    return res.status(200).json({
      registerSuccess: true,
    })
  })
})

app.get('/api/hello', (req, res) => {
  res.send('hi')
})

app.post(
  '/api/user/login',
  wrapper(async (req, res, next) => {
    try {
      let userDoc = await User.findOne({ email: req.body.email })
      if (!userDoc) {
        return res.json({
          loginSuccess: false,
          message: 'no such user exitsts',
        })
      }
      let verify = await userDoc.verifyng(req.body.password)
      if (!verify) {
        return res.json({
          loginSuccess: false,
          message: 'password is incorrect',
        })
      }
      let tokenUser = await userDoc.generateToken(userDoc)
      return res
        .cookie('x_auth', tokenUser.token)
        .status(200)
        .json({ loginSuccess: 'success', message: 'login success' })
    } catch (err) {
      next(err)
    }
  })
)

app.get('/api/user/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    hasAuth: true,
    ...req.user,
  })
})

app.get(
  '/api/user/logout',
  auth,
  wrapper(async (req, res) => {
    try {
      let user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { token: '' }
      )
      res.json({ logoutSuccess: true })
    } catch (err) {
      res.json({ logoutSuccess: false, err })
    }
  })
)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
//mongodb+srv://5vermind:<password>@mjquestion-t3xdg.gcp.mongodb.net/test?retryWrites=true&w=majority
