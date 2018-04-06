include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);

Wine.prototype.sandbox = function() {
    var tmp = Bean("propertyReader").getProperty("application.user.tmp");
    var resources = Bean("propertyReader").getProperty("application.user.resources");

    remove(this.prefixDirectory + "/dosdevices/z:");
    remove(this.prefixDirectory + "/dosdevices/y:");

    lns(tmp, this.prefixDirectory + "/dosdevices/z:");
    lns(resources, this.prefixDirectory + "/dosdevices/y:");

    return this;
};