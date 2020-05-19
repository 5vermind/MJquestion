const jwt = require('jsonwebtoken')

const decodeToken = (token, jwtSecret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error)
      resolve(decoded)
    })
  })
}

module.exports = { decodeToken }
