const expect = require('chai').expect
const ArgDescription = require('../../../src/terminal/command/arg_parser/ArgDescription')

describe('ArgDescription', () => {
  const aNaturalNumberParser = new ArgDescription({
    name: 'aNaturalNumber',
    typeDescription: 'un numero natural',
    validationRegex: /^\d+$/,
    parseFunction: parseInt
  })
  
  it('parsea el string si matchea con la regex', () =>{
    expect(aNaturalNumberParser.parse('12')).to.equal(12)
  })

  it('si el string no matchea con la regex arroja una excepcion', () =>{
    expect(() => {
      aNaturalNumberParser.parse('1.1')
    }).to.throw('Argumento invalido para "aNaturalNumber", se esperaba un numero natural. Valor provisto: "1.1"')
  })

})