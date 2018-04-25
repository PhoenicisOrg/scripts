include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "net", "download"]);

/**
 * Wine engine
*/
var engineImplementation = {
    _wineEnginesDirectory : Bean("propertyReader").getProperty("application.user.engines") + "/wine",
    _wineWebServiceUrl : Bean("propertyReader").getProperty("webservice.wine.url"),
    getAvailableVersions: function () {
        var versionsFile = this._wineEnginesDirectory + "/availableVersions.json";
        touch(versionsFile);
        new Downloader()
            .wizard(this._wizard)
            .url(this._wineWebServiceUrl)
            .to(versionsFile)
            .onlyIfUpdateAvailable(true)
            .get();
        return cat(versionsFile);
    }
};

/* exported Engine */
var Engine = Java.extend(org.phoenicis.engines.Engine, engineImplementation);
