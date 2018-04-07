/**
* AppResource prototype
* @constructor
*/
function AppResource() {
    this._appsManager = Bean("repositoryManager");
}

/**
* sets application
* @param {string} application application of the resource
* @returns {AppResource} AppResource object
*/
AppResource.prototype.application = function (application) {
    this._application = application;
    return this;
}

/**
* returns resource
* @param {string} resourceName name of the resource
* @returns {Resource} found resource
*/
AppResource.prototype.get = function (resourceName) {
    var application = this._appsManager.getApplication(this._application);
    var foundResource = null;
    if (application != null && application.resources != null) {
        application.resources.forEach(function(resource) {
            if(resource.name == resourceName) {
                foundResource = resource.content;
            }
        });
    }

    return foundResource;
}