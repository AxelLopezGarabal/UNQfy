const postArtistSchema             = require('./post-artist-schema')
const makeArtistFullRepresentation = require('./make-artist-full-representation')

const { respondCreated, respondResourceAlreadyExist, respondBadRequest } = require('../responses')

// TODO: esta mierda esta quedando muy imperativa
// module.exports = unqfy => (req, res, next) => {
//   const validationResult = postArtistSchema.validate(req.body)

//   if (validationResult.error)
//     respondBadRequest(res, validationResult.error)

//   let artist
  
//   try {
//     artist = unqfy.addArtist(req.body)
//   }
//   catch(error) {
//     respondResourceAlreadyExist(res)
//   }

//   const responseBody = makeArtistFullRepresentation(artist)
   
//   respondCreated(res, responseBody)
// }

/////////////

// module.exports = unqfy => (req, res, next) => {
//   const validationResult = postArtistSchema.validate(req.body)

//   if (validationResult.error)
//     respondBadRequest(res, validationResult.error)

//   else if (unqfy.existSomeoneCalled(artistData.name)) {
//     respondResourceAlreadyExist(res)
//   }
  
//   else {
//     const artist       = unqfy.addArtist(artistData)
//     const responseBody = makeArtistFullRepresentation(artist)
//     respondCreated(res, responseBody)
//   }
  
// }

const invalidBody = {
  canHandle: (unqfy, req)   => postArtistSchema.validate(req.body).error != null,
  handle: (unqfy, req, res) => respondBadRequest(res, postArtistSchema.validate(req.body).error)
}

const resourceAlreadyExist = {
  canHandle: (unqfy, req)   => unqfy.existSomeoneCalled(req.body.name),
  handle: (unqfy, req, res) => respondResourceAlreadyExist(res)
}

const createResource = {
  canHandle: ()             => true,
  handle: (unqfy, req, res) => {
    const artistData   = req.body
    const artist       = unqfy.addArtist(artistData)
    const responseBody = makeArtistFullRepresentation(artist)
    respondCreated(res, responseBody)
  }
}

const responses = [
  invalidBody,
  resourceAlreadyExist,
  createResource
]

module.exports = unqfy => (req, res, next) =>
  responses
    .find(handler => handler.canHandle(unqfy, req))
    .handle(unqfy, req, res)




