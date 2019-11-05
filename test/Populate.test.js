const expect = require('chai').expect
const lyrpro = require('../musicMatch').module.LyricFinder

const UNQfymodule = require('../model/unqfy')
const { Artist, Album} = require('../model/entities/all.js')

const unqfy = new UNQfymodule.UNQfy();

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


unqfy.addArtist({name:'Gorillaz',country:'USA'})

unqfy.getAlbumsForArtist('Gorillaz')

wait(7000);

//let unq = unqfy.load('backend.json')
unqfy.addAlbum(1,{name:'popo', year:'2020'})
unqfy.addTrack(2,{name:'humility', duration: 4000, genres:[]})
unqfy.getLyiricsFor('Gorillaz', 'humility')


console.log(unqfy.getArtistByName('Gorillaz').album)