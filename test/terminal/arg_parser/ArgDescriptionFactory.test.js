const expect = require('chai').expect
const factory = require('../../../model/terminal/command/arg_parser/argumentDescriptionsFactory')

describe('Factory', () => {

  describe('nameArgumentDescription', () => {
    const parser = factory.nameArgumentDescription('nombreDelCliente')
    it('ok', () =>{
      expect(parser.parse('pepe')).to.equal('pepe')
    })

    it('caca', () =>{
      expect(() => {
        parser.parse('pepe1')
      }).to.throw('Argumento invalido para "nombreDelCliente", se esperaba un nombre. Valor provisto: "pepe1"')
    })
  })

  describe('naturalNumberArgumentDescription', () => {
    const parser = factory.naturalNumberArgumentDescription('edad')

    it('ok', () =>{
      expect(parser.parse('12')).to.equal(12)
    })

    it('caca', () =>{
      expect(() => {
        parser.parse('1.1')
      }).to.throw('Argumento invalido para "edad", se esperaba un numero natural. Valor provisto: "1.1"')
    })
  })

  describe('arrayArgumentDescription', () => {
    const parser = factory.arrayArgumentDescription('xs')

    it('ok empty array', () =>{
      expect(parser.parse('')).to.eql([''])
    })

    it('ok array con un elemento', () =>{
      expect(parser.parse('a')).to.eql(['a'])
    })

    it('ok array con varios elementos', () =>{
      expect(parser.parse('1,2')).to.eql(['1','2'])
      expect(parser.parse('1, 2')).to.eql(['1','2'])
      expect(parser.parse('1, 2, 3')).to.eql(['1','2','3'])
    })
    
  })
})