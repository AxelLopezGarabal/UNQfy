var chai     = require('chai')
var chaiHttp = require('chai-http')
var app      = require('../../app')

var expect = chai.expect

chai.use(chaiHttp)

const artistsEndPoint = '/api/artists'

describe(artistsEndPoint, () => {
  describe('POST', () => {
    it('exitoso DASDASD', done => {
      const requestBody = {
        name: 'pepe',
        country: 'argentina'
      }

      const responseBody = requestBody

      chai.request(app)
        .post(artistsEndPoint)
        .send(requestBody)
        .end((err, res) => {
          console.log(res.body)
          expect(res).to.have.status(201)
          expect(res).to.be.json
          expect(res.body).to.eq(responseBody)
          done()
        })
    })
  })

  describe('GET ONE', () => {
    it('DASDASD', done => {
      chai.request(app)
        .get(artistsEndPoint + '/123456')
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

})