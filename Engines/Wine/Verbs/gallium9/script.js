include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install Gallium 9 Standalone
* see: https://github.com/iXit/wine-nine-standalone/
* @returns {Wine} Wine object
*/
Wine.prototype.gallium9 = function () {
    this.wizard().message(tr("Using Gallium 9 requires to have a driver supporting the Gallium 9 state tracker, as well as d3dapater9.so installed (ex: libd3d9adapter-mesa package). Please be sure there are installed."));

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/iXit/wine-nine-standalone/releases/download/v0.2/gallium-nine-standalone-v0.2.tar.gz")
        .name("gallium-nine-standalone-v0.2.tar.gz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory())
        .extract();

    remove(this.system32directory() + "/d3d9.dll");
    lns(this.prefixDirectory() + "/gallium-nine-standalone/lib32/d3d9-nine.dll.so", this.system32directory() + "/d3d9-nine.dll");
    lns(this.prefixDirectory() + "/gallium-nine-standalone/bin32/ninewinecfg.exe.so", this.system32directory() + "/ninewinecfg.exe");
    lns(this.system32directory() + "/d3d9-nine.dll", this.system32directory() + "/d3d9.dll");

    if (this.architecture() == "amd64") {
        remove(this.system64directory() + "/d3d9.dll");
        lns(this.prefixDirectory() + "/gallium-nine-standalone/lib64/d3d9-nine.dll.so", this.system64directory() + "/d3d9-nine.dll");
        lns(this.prefixDirectory() + "/gallium-nine-standalone/bin64/ninewinecfg.exe.so", this.system64directory() + "/ninewinecfg.exe");
        lns(this.system64directory() + "/d3d9-nine.dll", this.system64directory() + "/d3d9.dll");
    }

    this.overrideDLL()
        .set("native", ["d3d9"])
        .do();

    return this;
}

/**
 * Verb to install Gallium 9 Standalone
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "gallium9", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.gallium9();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
