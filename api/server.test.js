const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {

    describe('environment', () => {
        test('NODE_ENV = testing', () => {
            expect(process.env.NODE_ENV).toBe('testing')
        })
    })

    describe('GET /api/jokes', () => {
        test('cannot access jokes without loggin in', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.status).toBe(401)
        })
        test('be json', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.type).toBe('application/json')
        })
    })

    describe('POST /api/auth/login', () => {
        test('get 401 status if user has no credentials', async () => {
            const res = await request(server).post('/api/auth/login');
            expect(res.status).toBe(400);
        })
        test('get 200 status if successful login', async () => {
            const res = await request(server).post('/api/auth/login').send({username:'testUser', password: '1234'});
            expect(res.status).toBe(201);
        })
    })

    describe('POST /api/auth/register', () => {
        test('get 400 status and message if submits no password', async () => {
            const res = await request(server).post('/api/auth/register').send({username:'testUser99'});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('username and password required');
        })
        test('get 400 status and message if username is taken', async () => {
            const res = await request(server).post('/api/auth/register').send({username:'testUser', password: '1234'});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('username taken');
        })
    }) 

})