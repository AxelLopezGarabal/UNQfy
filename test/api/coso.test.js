var chai     = require('chai')
var chaiHttp = require('chai-http')
var app      = require('../../app')

var expect = chai.expect

chai.use(chaiHttp)

// OJO: si la app arranca con cosas cargadas puede fallar algun test

const resourceAlreayExistResponseBody = { errorCode: 'RESOURCE_ALREADY_EXIST' }
const resourceNotFoundResponseBody    = { errorCode: "RESOURCE_NOT_FOUND" }


const artistsEndPoint = '/api/artists'

const artistData = {
  name: 'pepe',
  country: 'argentina'
}

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
      const responseBody = {
        id: 0,
        albums: [],
        ...artistData
      }

      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .end((error, res) => {
          expectResponse(res, 201, responseBody)
          done()
        })
    })

    it('no puede haber mas de un artista con el mismo nombre', done => {
      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .end(() => {

          chai.request(app)
            .post(artistsEndPoint)
            .send(artistData)
            .end((error, res) => {
              expectResponse(res, 409, resourceAlreayExistResponseBody)
              done()
            })

        })
      
    })
  })

  describe('GET ONE', () => {
    it('error cuando no existe el artista', done => {
      chai.request(app)
        .get(artistsEndPoint + '/0')
        .end((error, res) => {
          expectResponse(res, 404, resourceNotFoundResponseBody)
          done()
        })
    })

    it('exito dasdasdas', done => {
      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .end(() => {

          chai.request(app)
            .get(artistsEndPoint + '/0')
            .end((error, res) => {
              expectResponse(res, 200, { id: 0, albums: [],  ...artistData})
              done()
            })


        })

    })
  })

})

function expectResponse(res, statusCode, responseBody) {
  expect(res).to.be.json
  expect(res).to.have.status(statusCode)
  expect(res.body).to.eql(responseBody)
}