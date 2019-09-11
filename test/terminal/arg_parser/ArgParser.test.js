const expect = require('chai').expect
const ArgParser = require('../../../src/terminal/command/arg_parser/ArgParser')

describe('ArgParser', () => {
  const aNaturalNumberParser = new ArgParser({
    argName: 'aNaturalNumber',
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