const User = require('../models/User')

let auth = async (req, res, next) => {
  let token = req.cookies.x_auth
  try {
    let user = await User.User.findByToken(token)
    if (!user)
      return res.json({ state: false, error: true, detail: '유저가 없음' })
    req.token = token
    req.user = user
    next()
  } catch (err) {
    return res.json(err)
  }
}

module.exports = { auth }
