const RequestController = require('../RequestController')

class DeleteController extends RequestController {

    constructor(unqfy, entityName) {
        super(unqfy)
        this._entityName = entityName
    }

    _doTask(req, res) {
      const capitalizedEntityName = this._entityName[0].toUpperCase() + this._entityName.slice(1); 

      const entityId = parseInt(req.params.id)
      this._unqfy['remove' + capitalizedEntityName](entityId)  
      this.respondDeleted(res)
    }

    _errorHandlers() {
        return {
            EntityNotFound: (error, req, res) => this.resourceNotFound(res)
        }
    }

}

module.exports = entityName => unqfy => (req, res) => {
    new DeleteController(unqfy, entityName).handle(req, res)
}