include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);

/**
* Verb to install mfc42.dll and mfc42u.dll
* @returns {Wine} Wine object
*/
Wine.prototype.mfc42 = function () {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/vc60pro/Update/2/W9XNT4/EN-US/VC6RedistSetup_deu.exe")
        .checksum("a8c4dd33e281c166488846a10edf97ff0ce37044")
        .name("VC6RedistSetup_deu.exe")
        .get();

    remove(this.system32directory() + "/mfc42.dll");
    remove(this.system32directory() + "/mfc42u.dll");

    new CabExtract()
        .archive(setupFile)
        .wizard(this._wizard)
        .to(this.system32directory())
        .extract();

    new CabExtract()
        .archive(this.system32directory() + "/vcredist.exe")
        .wizard(this._wizard)
        .to(this.system32directory())
        .extract(['-F', 'mfc42*.dll']);

    this.overrideDLL()
        .set("native, builtin", ["mfc42", "mfc42u"])
        .do();
    return this;
};
