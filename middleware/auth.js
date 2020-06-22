const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token')

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  //If token
  try {
    //verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    //set this to req.user so that the user can be added to route
    req.user = decoded.user
    next()
    //if token verification fails
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
