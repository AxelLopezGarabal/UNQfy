var chai     = require('chai')
var chaiHttp = require('chai-http')
var app      = require('../../app')

var expect = chai.expect

chai.use(chaiHttp)

// OJO: si la app arranca con cosas cargadas puede fallar algun test

const artistsEndPoint = '/api/artists'

describe(artistsEndPoint, () => {
  let app

  beforeEach(() => {
    app = require('../../app')
  })

  afterEach(done => {
    delete require.cache[require.resolve('../../app')]
    done()
  })

  describe('POST', () => {
    it('crea un nuevo artista', done => {
      const requestBody = {
        name: 'pepe',
        country: 'argentina'
      }

      const responseBody = {
        id: 0,
        albums: [],
        ...requestBody
      }

      chai.request(app)
        .post(artistsEndPoint)
        .send(requestBody)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res).to.be.json
          expect(res.body).to.eql(responseBody)
          done()
        })
    })

    it('no puede haber mas de un artista con el mismo nombre', done => {
      const requestBody = {
        name: 'pepe',
        country: 'argentina'
      }

      const resourceAlreayExistResponseBody = { errorCode: 'RESOURCE_ALREADY_EXIST' }

      chai.request(app)
        .post(artistsEndPoint)
        .send(requestBody)
        .end(() => {

          chai.request(app)
            .post(artistsEndPoint)
            .send(requestBody)
            .end((err, res) => {
              expect(res).to.have.status(409)
              expect(res).to.be.json
              expect(res.body).to.eql(resourceAlreayExistResponseBody)
              done()
            })

        })
      
      
    })
  })

  // describe('GET ONE', () => {
  //   it('DASDASD', done => {
  //     chai.request(app)
  //       .get(artistsEndPoint + '/123456')
  //       .end((err, res) => {
  //         expect(res).to.have.status(404)
  //         done()
  //       })
  //   })
  // })

})