var AppResource = function() {
    var that = this;
    that._appsManager = Bean("appsSource");

    this.application = function(application) {
        that._application = application;
        return that;
    };

    this.get = function(resourceName) {
        var application = that._appsManager.getApplication(that._application);
        var foundResource = null;
        if(application != null && application.resources != null) {
            application.resources.forEach(function(resource) {
                if(resource.name == resourceName) {
                    foundResource = resource.content;
                }
            });
        }

        return foundResource;
    }
};

