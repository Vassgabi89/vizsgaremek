const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Ticket = require('./controller/ticket/model');
const {
    response
} = require('jest-mock-req-res');
const {
    Test
} = require('supertest');

describe('REST API integration tests', () => {
    beforeEach(done => {
        const {
            db_host,
            db_username,
            db_password
        } = config.get('database');
        mongoose.connect(
                `mongodb+srv://${db_username}:${db_password}${db_host}`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            ).then(conn => {
                console.log('Connection success!');
                done();
            })
            .catch(err => {
                throw new Error(err.message);
            });
    });

    afterEach(done => {
        mongoose.connection.close(() => done());
    });

    test('GET /ticket', done => {
        supertest(app).get('/tickets').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                done();
            });
    });
});