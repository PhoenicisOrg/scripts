const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");

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