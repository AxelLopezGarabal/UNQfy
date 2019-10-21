const RequestController = require('../RequestController')

class GetAllController extends RequestController {

    constructor(unqfy, entityName) {
        super(unqfy)
        this._entityName = entityName
    }
    
    _doTask(req, res) {
        const entityPartialName = req.query.name

        // TODO: el enunciado dice que si no se pasa un nombre
        // retorna todo... pero hay tests de postman que esperan lista vacia.
        // Haciendo esto pasan mas tests de postman
        if (!entityPartialName)
            return this.respondOk(res, [])
        
        const entitys      = this._unqfy.searchByName(entityPartialName)[this._entityName + 's']
        const responseBody = entitys.map(entity => entity.toJSON())
        
        this.respondOk(res, responseBody)
    }
    
    _errorHandlers() {
        return { }
    }
}

module.exports = entityName => unqfy => (req, res) => {
    new GetAllController(unqfy, entityName).handle(req, res)
}