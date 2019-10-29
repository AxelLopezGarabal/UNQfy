const expect = require('chai').expect

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

const unqfy = new UNQfymodule.UNQfy()
unqfy.addArtist({name:'Gorillaz',country:'USA'})
console.log(unqfy.getAlbumsForArtist('Gorillaz'))

