include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Verbs", "luna"]);

Wine.prototype.msvc90 = function() {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://files.playonlinux.com/microsoft.vc90.crt.zip")
        .checksum("1825146b6b21ac45d1f4c6c2b8844458cefd2dd6")
        .name("microsoft.vc90.crt.zip")
        .get();

    new Extractor()
        .wizard(this._wizard)
        .archive(setupFile)
        .to(this.system32directory()) //FIXME: not in subdir Microsoft.vc90.crt
        .extract();

    this.overrideDLL()
        .set("native, builtin", ["msvcr90"])
        .do();

    return this;
};
