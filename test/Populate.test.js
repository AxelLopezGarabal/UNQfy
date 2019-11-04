const expect = require('chai').expect
const lyrpro = require('../musicMatch').module.LyricFinder

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

const unqfy = new UNQfymodule.UNQfy()
unqfy.addArtist({name:'Gorillaz',country:'USA'})
//console.log(unqfy.getAlbumsForArtist('Gorillaz'))
unqfy.addAlbum(1,{name:'popo', year:'2020'})
unqfy.addTrack(2, {name:'Dare',duration: 1, genres: []})

console.log('musicMatch',(new lyrpro()).getLyrics('Dare', 'Gorillaz'))

//console.log((unqfy.getTrackById(3)).getLyrics())

