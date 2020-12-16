const colors = require('colors');
const router = require('express').Router();
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('./secrets.js')

const dbAuth = require('../db-model.js')


router.post('/register', checkUsernameMatch, async (req, res) => {
  const registration = req.body;
  if (registration.username && registration.password) {
    const hash = bcyrpt.hashSync(registration.password, 10);
    registration.password = hash;
    try {
        const registeredUser = await dbAuth.register(registration);
        console.log(`Thanks for registering, ${registeredUser.username} :D` .bgCyan);
        res.status(201).json(registeredUser);
    } catch (error) {
        console.error(`Sorry, I'm having some trouble doing that :( I got this ${error}` .bgRed);
        res.status(500).json({
          error,
          message: 'server error'
        });
    }
  } else {
    console.log('I\'d do that but need a username and password first :)' .yellow)
    res.status(400).json({
      message: 'username and password required'
    })
  }
  //res.end('implement register, please!');
});

router.post('/login', async (req, res) => {
  const credentials = req.body;
  if(credentials.username && credentials.password) {
    try {
      const foundUser = await dbAuth.login(credentials);
      if (foundUser && bcyrpt.compareSync(credentials.password, foundUser.password)) {
        const token = await jwtGenerator(foundUser);
        res.status(201).json({
          message: `welcome, ${foundUser.username}`,
          token
        });
      } else {
          res.status(400).json({
            message: 'invalid credentials'
          })
      }
    } catch (error) {
      console.log(`Sorry, I ran into this error trying while trying to log you in:\n${error}` .bgRed)
      res.status(500).json({
        error,
        message: 'server error'
      })
    } 
  } else {
        res.status(400).json({
          message: 'username and password required'
        })
    }
  //res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

async function checkUsernameMatch(req, res, next) {
  const foundUsername = await dbAuth.findByUsername(req.body.username);
  console.log(foundUsername)
  if (foundUsername.length !== 0) {
    console.log(`Looks like that username is already in use. Think of something cooler.` .yellow)
    res.status(400).json({
      message: 'username taken'
    })
  } else next();
}

//WEB TOKEN GEN
function jwtGenerator(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const secret = secrets.jwt_secret;
  const options = {
    expiresIn: 30
  };

  return jwt.sign(payload, secret, options);
} 

module.exports = router;
