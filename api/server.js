const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted-endpoint.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

server.get('', (req, res) => {
    res.send(`
        <h1>Welcome to Sam G's Web Sprint Challenge - Authentication & Testing</h1>
        <h2>Dad jokes are all the rage these days!</h2>
        <p>In this challenge, you will build a real wise-guy application.</p>
        <p>We need users to be able to hit the <strong>[POST] /api/auth/register</strong> endpoint to create a new account, and the <strong>[POST] /api/auth/login</strong> endpoint to get a token.</p>
        <p>We also need to make sure nobody without the token can hit <strong>[GET] /api/jokes</strong> and gain access to our dad jokes.</p>
        <p>We will hash the user's password using <em>bcryptjs</em>, and use JSON Web Tokens and the <em>jsonwebtoken</em> library.</p>
    `)
})

module.exports = server;
