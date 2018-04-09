include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install mspatcha
* @returns {Wine} Wine object
*/
Wine.prototype.mspatcha = function () {
    //Inspired from winetricks mspatcha, but with a link Phoenicis can understand
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://ftp.anadolu.edu.tr/Service_Packs/Windows_2000/W2ksp4_EN.exe")
        .checksum("fadea6d94a014b039839fecc6e6a11c20afa4fa8")
        .name("W2ksp4_EN.exe")
        .get();

    remove(this.system32directory() + "/mspatcha.dll");

    new CabExtract()
        .archive(setupFile)
        .wizard(this._wizard)
        .to(this.system32directory())
        .extract();

    new CabExtract()
        .archive(this.system32directory() + "/i386/mspatcha.dl_")
        .wizard(this._wizard)
        .to(this.system32directory())
        .extract();

    remove(this.system32directory() + "/i386/");

    this.overrideDLL()
        .set("native, builtin", ["mspatcha"])
        .do();
    return this;
};
