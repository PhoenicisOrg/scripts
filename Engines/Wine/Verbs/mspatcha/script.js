include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install mspatcha
* @returns {Wine} Wine object
*/
Wine.prototype.mspatcha = function () {
    //Inspired from winetricks mspatcha, but with a link Phoenicis can understand
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://web.archive.org/web/20060319175746/http://download.microsoft.com/download/e/6/a/e6a04295-d2a8-40d0-a0c5-241bfecd095e/w2ksp4_en.exe")
        .checksum("fadea6d94a014b039839fecc6e6a11c20afa4fa8")
        .name("W2ksp4_EN.exe")
        .get();

    remove(this.system32directory() + "/mspatcha.dll");

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract();

    new CabExtract()
        .archive(this.system32directory() + "/i386/mspatcha.dl_")
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract();

    remove(this.system32directory() + "/i386/");

    this.overrideDLL()
        .set("native, builtin", ["mspatcha"])
        .do();
    return this;
};
