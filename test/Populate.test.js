const expect = require('chai').expect
const lyrpro = require('../musicMatch').module.LyricFinder

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

//const unqfy = new UNQfymodule.UNQfy()
//unqfy.addArtist({name:'Gorillaz',country:'USA'})
//console.log(unqfy.getAlbumsForArtist('Gorillaz'))
//unqfy.addAlbum(1,{name:'popo', year:'2020'})

const lf = new lyrpro();
let lyrics = lf.getLyrics('humility', 'Gorillaz');
console.log(lyrics);
console.log(lyrics);
console.log(lyrics);
console.log(lyrics);

