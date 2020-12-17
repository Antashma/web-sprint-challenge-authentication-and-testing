const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  console.log(req.headers)
  if (token) {
    jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'token invalid',
        })
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({
      message: 'token required'
    })
  };
};
