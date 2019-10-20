const RequestController = require('../RequestController')

class GetOneController extends RequestController {

    constructor(unqfy, entityName) {
        super(unqfy)
        this._entityName = entityName
    }

    _doTask(req, res) {
        const entityId = parseInt(req.params.id)
        const entity   = this._unqfy.findBy(this._entityName, { id: entityId })
        this.respondOk(res, entity.toJSON())
    }

    _errorHandlers() {
        return {
            EntityNotFound: (error, req, res) => this.resourceNotFound(res)
        }
    }
}

module.exports = entityName => unqfy => (req, res) =>
    new GetOneController(unqfy, entityName).handle(req, res)