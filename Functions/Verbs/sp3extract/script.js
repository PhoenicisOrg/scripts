include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);

Wine.prototype.sp3extract = function(fileToExtract) {
    var that = this;
    that._targetDirectory = this.prefixDirectory + "/drive_c/windows/system32/";

    this.targetDirectory = function(targetDirectory) {
        that._targetDirectory = targetDirectory;
        return that;
    };

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://download.windowsupdate.com/msdownload/update/software/svpk/2008/04/windowsxp-kb936929-sp3-x86-enu_c81472f7eeea2eca421e116cd4c03e2300ebfde4.exe")
        .checksum("4fc3bf0dc96b5cf5ab26430fac1c33c5c50bd142")
        .name("windowsxp-kb936929-sp3-x86-enu_c81472f7eeea2eca421e116cd4c03e2300ebfde4.exe")
        .get();

    new CabExtract()
        .archive(setupFile)
        .wizard(this._wizard)
        .to(this.prefixDirectory + "/drive_c/sp3/")
        .extract(["-F", "i386/" + fileToExtract]);

    remove(that._targetDirectory + "/" + fileToExtract);

    new CabExtract()
        .archive(this.prefixDirectory + "/drive_c/sp3/i386/" + fileToExtract)
        .wizard(this._wizard)
        .to(that._targetDirectory)
        .extract();

    return this;
};