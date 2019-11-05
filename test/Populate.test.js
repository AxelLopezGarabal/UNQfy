const expect = require('chai').expect
const lyrpro = require('../musicMatch').module.LyricFinder

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

const unqfy = new UNQfymodule.UNQfy();

unqfy.addArtist({name:'Gorillaz',country:'USA'})

unqfy.getAlbumsForArtist('Gorillaz')
