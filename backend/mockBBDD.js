
const UNQfy = require('../model/unqfy.js').UNQfy

const unqfy = (new UNQfy())
let UNQfy1 = unqfy.load('./backend/backend.json')

module.exports = UNQfy1;