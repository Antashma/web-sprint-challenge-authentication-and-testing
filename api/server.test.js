const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
    describe('GET /api/jokes', () => {
        test('cannot access jokes without loggin in', function(done) {
            request(server)
            .get('/api/jokes')
            .expect(401, done)
        })
    })


})