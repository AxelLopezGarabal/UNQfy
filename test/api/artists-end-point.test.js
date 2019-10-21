var chai     = require('chai')
var chaiHttp = require('chai-http')

var expect = chai.expect

chai.use(chaiHttp)

// OJO: si la app arranca con cosas cargadas puede fallar algun test

const badRequestRespondBody            = { status: 400, errorCode: 'BAD_REQUEST' }
const resourceNotFoundResponseBody     = { status: 404, errorCode: "RESOURCE_NOT_FOUND" }
const resourceAlreadyExistResponseBody = { status: 409, errorCode: 'RESOURCE_ALREADY_EXISTS' }

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
    
    xit('bad request si el body esta mal formado', done => {
      const jsonMalFormado = "{ 'nam"

      chai.request(app)
        .post(artistsEndPoint)
        .send(jsonMalFormado)
        .then(res => {
          
          expectResponse(res, 400, badRequestRespondBody)
          done()
        })
    })

    it('crea un nuevo artista', done => {
      const responseBody = {
        id: 0,
        albums: [],
        ...artistData
      }

      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .then(res => {
          expectResponse(res, 201, responseBody)
          done()
        })
    })

    it('no puede crear un artista si ya existe otro con el mismo nombre', done => {
      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .then(() => {

          chai.request(app)
            .post(artistsEndPoint)
            .send(artistData)
            .end((error, res) => {
              expectResponse(res, 409, resourceAlreadyExistResponseBody)
              done()
            })

        })
      
    })
  })

  describe('GET ONE', () => {
    it('error cuando no existe el artista', done => {
      chai.request(app)
        .get(artistsEndPoint + '/0')
        .then(res => {
          expectResponse(res, 404, resourceNotFoundResponseBody)
          done()
        })
    })

    it('OK dasdasdas', done => {
      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .then(() => {

          chai.request(app)
            .get(artistsEndPoint + '/0')
            .then(res => {
              expectResponse(res, 200, { id: 0, albums: [],  ...artistData})
              done()
            })

        })

    })
  })

  describe('GET ALL', () => {
    it('si no hay artistas retorna una lista vacia', done => {
      chai.request(app)
        .get(artistsEndPoint)
        .then(res => {
          expectResponse(res, 200, [])
          done()
        })
    })

    it('si hay artistas y no se especifica un nombre retorna todos los artistas', done => {
      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .then(res => {
          
          chai.request(app)
          .get(artistsEndPoint)
          .then(res => {
            expectResponse(res, 200, [{ id: 0, albums: [], ...artistData }])
            done()
          })

        })
      
    })

    it('se puede buscar los artistas que matcheen parcialmente con un nombre', done => {
      const pepeArtistData = { name: 'pepe', ...artistData }

      chai.request(app)
        .post(artistsEndPoint)
        .send(pepeArtistData)
        .then(res => {
          const { id } = res.body

          chai.request(app)
          .get(artistsEndPoint + '?name=pe')
          .then(res => {
            expectResponse(res, 200, [{ id, albums: [], ...pepeArtistData }])
          })

          chai.request(app)
          .get(artistsEndPoint + '?name=zzzzzzzzzzzzzzzz')
          .then(res => {
            expectResponse(res, 200, [])
            done()
          })

        })
      
    })
  })

  describe('DELETE', () => {
    it('borra un artista', done => {
      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .then(res => {
          const artistId = res.body.id
          
          chai.request(app)
            .delete(artistsEndPoint + '/' + artistId)
            .then(res => {
              expect(res).to.have.status(204)
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