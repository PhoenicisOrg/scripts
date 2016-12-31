include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);

Wine.prototype.msls31 = function() {
    var setupFile = new Resource()
        .wizard(setupWizard)
        .url("https://web.archive.org/web/20160710055851/http://download.microsoft.com/download/WindowsInstaller/Install/2.0/NT45/EN-US/InstMsiW.exe")
        .checksum("4fc3bf0dc96b5cf5ab26430fac1c33c5c50bd142")
        .name("InstMsiW.exe")
        .get();

    remove(this.system32directory() + "/msls31.dll");

    new CabExtract()
        .archive(setupFile)
        .wizard(this._wizard)
        .to(this.system32directory())
        .extract(["-F", "msls31.dll"]);

    return this;
};