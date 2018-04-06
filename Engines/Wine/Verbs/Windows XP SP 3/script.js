include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);

Wine.prototype.sp3extract = function(fileToExtract) {
    var that = this;
    that._targetDirectory = this.system32directory();

    this.targetDirectory = function(targetDirectory) {
        that._targetDirectory = targetDirectory;
        return that;
    };

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://freeware.epsc.wustl.edu/Win/XP_SP3/WindowsXP-KB936929-SP3-x86-ENU.exe")// Just a test, the URL needs to be fixed
        .checksum("c81472f7eeea2eca421e116cd4c03e2300ebfde4")
        .name("WindowsXP-KB936929-SP3-x86-ENU.exe")
        .get();

    new CabExtract()
        .archive(setupFile)
        .wizard(this._wizard)
        .to(this.prefixDirectory + "/drive_c/sp3/")
        .extract(["-F", "i386/" + fileToExtract.slice(0, -1) + "_"]);

    remove(that._targetDirectory + "/" + fileToExtract);

    new CabExtract()
        .archive(this.prefixDirectory + "/drive_c/sp3/i386/" + fileToExtract.slice(0, -1) + "_")
        .wizard(this._wizard)
        .to(that._targetDirectory)
        .extract();

    return this;
};