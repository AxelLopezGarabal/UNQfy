const expect = require('chai').expect

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

const unqfy = new UNQfymodule.UNQfy()
unqfy.addArtist({name:'Gorillaz',country:'USA'})
<<<<<<< HEAD
unqfy.populateAlbumsForArtist('Gorillaz');
console.log(unqfy.albums)
=======
console.log(unqfy.getAlbumsForArtist('Gorillaz'))
>>>>>>> 43826f2de88d1aedd1596b09c0d02294eaf2b8ba

