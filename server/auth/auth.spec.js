const expect = require('chai').expect;
const app = require('../');
const request = require('supertest')(app)
const db = require('../db')
const User = db.model('user')

describe('User authentication', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('User creation', () => {
    it('creates a user with valid information', async () => {
      const res = await request.post('/auth/signup')
        .send({
          email: 'cody@email.com',
          password: 'frenchfries',
          firstName: 'cody',
          lastName: 'cow',
          type: 'employee'
        })
        .expect(200)

        expect(res.body.user.email).to.be.equal('cody@email.com')
        expect(res.body.user.type).to.be.equal('employee')
    })

    it('does not create a user with incomplete information', async () => {
      try {
        await request.post('/auth/signup')
        .send({
          email: 'cody@email.com',
          password: 'frenchfries',
          lastName: 'cow',
          type: 'employee'
        })
        throw Error('validation was successful, but should have failed without `firstName`');
      } catch (err) {
        expect(err.message).to.contain('user.firstName cannot be null');
      }
    })
  })
})
