const colors = require('colors');
const router = require('express').Router();

const dbAuth = require('../db-model.js')


router.post('/register', checkUsernameMatch, async (req, res) => {
  const registration = req.body;
  if (registration.username, registration.password) {
    try {
        const registeredUser = await dbAuth.register(registration);
        console.log('Successful registration :D' .bgCyan);
        res.status(201).json(registeredUser);
    } catch (error) {
        console.log(error .red);
        res.status(500).json({
          error,
          message: 'server error'
        });
    }
  } else {
    console.log('username and password required' .yellow)
    res.status(400).json({
      message: 'I\'d do that but I need a username AND password first :)'
    })
  }
  //res.end('implement register, please!');

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
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
    res.status(400).json({
      message: 'username taken'
    })
  } else next();
}

module.exports = router;
