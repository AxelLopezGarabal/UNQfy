var chai     = require('chai')
var chaiHttp = require('chai-http')

var expect = chai.expect

chai.use(chaiHttp)

// OJO: si la app arranca con cosas cargadas puede fallar algun test

const badRequestRespondBody            = { status: 400, errorCode: 'BAD_REQUEST' }
const resourceNotFoundResponseBody     = { status: 404, errorCode: "RESOURCE_NOT_FOUND" }
const resourceAlreadyExistResponseBody = { status: 409, errorCode: 'RESOURCE_ALREADY_EXISTS' }

const artistsEndPoint = '/api/artists'
const albumsEndPoint  = '/api/albums'

const artistData = {
  name: 'pepe',
  country: 'argentina'
}

const albumData = {
  name: 'album 01',
  year: 2019
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
        .post(albumsEndPoint)
        .send(jsonMalFormado)
        .then(res => {
          expectResponse(res, 400, badRequestRespondBody)
          done()
        })
    })

    it('se agrega un album', done => {

      chai.request(app)
        .post(artistsEndPoint)
        .send(artistData)
        .then(res => {
          
          const artistId = res.body.id

          chai.request(app)
            .post(albumsEndPoint)
            .send({ artistId, ...albumData })
            .then(res => {
              expectResponse(res, 201, {
                id: 1,
                tracks: [],
                ...albumData
              })
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