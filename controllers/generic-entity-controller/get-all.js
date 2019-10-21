const RequestController = require('../RequestController')

class GetAllController extends RequestController {

    constructor(unqfy, entityName) {
        super(unqfy)
        this._entityName = entityName
    }
    
    _doTask(req, res) {
        const entityPartialName = req.query.name
        
        const entitys      = this._unqfy.searchByNamePartial(entityPartialName)[this._entityName + 's']
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