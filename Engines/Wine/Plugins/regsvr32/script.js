const Wine = include("engines.wine.engine.object");

/**
* runs "regsvr32"
* @returns {Wine} Wine object
*/
Wine.prototype.regsvr32 = function () {
    var _wine = this;

    this.install = function (dll) {
        _wine.run("regsvr32", ["/i", dll], this.prefixDirectory(), false, true);
        return _wine;
    };

    return this;
};