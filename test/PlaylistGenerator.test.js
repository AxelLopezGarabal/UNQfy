const expect   = require('chai').expect
const Track    = require('../model/entities/Track.js')

const PlaylistGenerator = require('../model/PlaylistGenerator.js')
 
describe('PlaylistGenerator', () => {
  let playlistGenerator = new PlaylistGenerator()

  it('si no se le pasan tracks de donde elegir genera una playlist vacia', () => {
    const aPlaylist = playlistGenerator.generate(1, 'playlistName', variosGeneros(), 10000, [])
    expect(aPlaylist.tracks).to.be.empty
  })

  it('si no alcanza a cubrir su duracion maxima retorna una playlsit mas corta', () => {
    const trackRock100 = createTrack(['Rock'], 100)

    const genresToInclude       = ['Rock', 'Pop']
    const maxDuration           = 1000000
    const trackListToChooseFrom = [trackRock100]

    const aPlaylist = playlistGenerator.generate(1, 'playlistName', genresToInclude, maxDuration, trackListToChooseFrom)
    
    expect(aPlaylist.tracks).to.have.lengthOf(1)
    expect(aPlaylist.tracks).to.include(trackRock100)
  })

  it('le alcanza justo bla bla bla bla', () => {
    const trackRock100 = createTrack(['Rock'], 100)
    const trackPop200  = createTrack(['Pop'] , 200)
    const trackPop1    = createTrack(['Pop'] ,   1)

    const genresToInclude       = ['Rock', 'Pop']
    const maxDuration           = trackRock100.duration + trackPop200.duration
    const trackListToChooseFrom = [trackRock100, trackPop200, trackPop1]

    const aPlaylist = playlistGenerator.generate(1, 'playlistName', genresToInclude, maxDuration, trackListToChooseFrom)
    
    expect(aPlaylist.tracks).to.have.lengthOf(2)
    expect(aPlaylist.tracks).to.include.members([trackPop200, trackRock100])
  })

  it('solo agrega tracks de los generos indicados', () => {
    const trackRock100 = createTrack(['Rock'  ], 100)
    const trackCumbia1 = createTrack(['Cumbia'],   1)

    const genresToInclude       = ['Rock', 'Pop']
    const maxDuration           = 1000000000
    const trackListToChooseFrom = [trackRock100, trackCumbia1]

    const aPlaylist = playlistGenerator.generate(1, 'playlistName', genresToInclude, maxDuration, trackListToChooseFrom)
    
    expect(aPlaylist.tracks).to.have.lengthOf(1)
    expect(aPlaylist.tracks).to.include(trackRock100)
  });

})

const createTrack = (genres, duration) => new Track({ genres, duration })
const variosGeneros = () => ['Genero1', 'Genero1']