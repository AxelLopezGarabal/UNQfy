const expect = require('chai').expect
const lyrpro = require('../musicMatch').module.LyricFinder

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

let unqfy = new UNQfymodule.UNQfy();
let UNQfy = unqfy
UNQfy.addArtist({name:'Gorillaz',country:'USA'})
//let UNQfy = unqfy.load('./backend.json')
UNQfy.addAlbum(1,{name:'popo', year:'2020'})
UNQfy.addTrack(2,{name:'humility', duration: 4000, genres:[]})
UNQfy.getLyiricsFor('Gorillaz', 'humility')

console.log(UNQfy.getArtistById(1))

//console.log(unqfy.getArtistByName('Gorillaz').album)