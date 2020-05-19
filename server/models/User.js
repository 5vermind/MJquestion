const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { decodeToken } = require('../lib/token')

const saltRounds = 10

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlenth: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

userSchema.pre('save', async function (next) {
  try {
    let user = this
    if (user.isModified('password')) {
      let salt = await bcrypt.genSalt(saltRounds)
      let hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      next()
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
})

userSchema.methods.verifyng = async function (password) {
  try {
    let comparison = await bcrypt.compare(password, this.password)
    return comparison
  } catch (err) {
    throw { err }
  }
}

userSchema.methods.generateToken = async function () {
  let user = this
  let token = jwt.sign(user._id.toHexString(), 'secretToken')
  user.token = token
  try {
    let userDoc = await user.save()
    return userDoc
  } catch (err) {
    throw { err }
  }
}

userSchema.statics.findByToken = async function (token) {
  let user = this
  try {
    let decoded = await decodeToken(token, 'secretToken')
    return user.findOne({ _id: decoded, token: token })
  } catch (err) {
    console.log(err)
    throw { err }
  }
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
