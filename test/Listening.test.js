const expect = require('chai').expect
const { Listening, Track } = require('../src/entities/all_entities')

describe('Listening', () => {
  const id    = 1
  const name  = 'Pepe'
  const track = new Track(1, 'trackName', ['genres'], 1000)

  beforeEach(() =>
    listening = new Listening(track)
  )

  it('registra el track escuchado', () =>
    expect(listening.track).to.eql(track)
  )

})