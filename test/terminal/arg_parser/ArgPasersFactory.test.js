const expect = require('chai').expect
const factory = require('../../../src/terminal/command/arg_parser/argumentParsersFactory')

describe('argParsersFactory', () => {

  describe('nameArgumentParser', () => {
    const parser = factory.nameArgumentParser('nombreDelCliente')
    it('ok', () =>{
      expect(parser.parse('pepe')).to.equal('pepe')
    })

    it('caca', () =>{
      expect(() => {
        parser.parse('pepe1')
      }).to.throw('Argumento invalido para "nombreDelCliente", se esperaba un nombre. Valor provisto: "pepe1"')
    })
  })

  describe('naturalNumberArgumentParser', () => {
    const parser = factory.naturalNumberArgumentParser('edad')

    it('ok', () =>{
      expect(parser.parse('12')).to.equal(12)
    })

    it('caca', () =>{
      expect(() => {
        parser.parse('1.1')
      }).to.throw('Argumento invalido para "edad", se esperaba un numero natural. Valor provisto: "1.1"')
    })
  })

})