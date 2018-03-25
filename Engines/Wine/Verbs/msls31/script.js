include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);

Wine.prototype.msls31 = function() {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("ftp://ftp.hp.com/pub/softlib/software/msi/InstMsiW.exe")
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
