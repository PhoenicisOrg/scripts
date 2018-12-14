include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install DXVK
* see: https://github.com/doitsujin/dxvk/
* @param {String} dxvkVersion DXVK version to download
* @returns {Wine} Wine object
*/
Wine.prototype.DXVK = function (dxvkVersion) {
    print("NOTE: you need a driver that supports Vulkan enough to run DXVK");
    print("NOTE: wine version should be greater or equal to 3.10");

    if (typeof dxvkVersion !== 'string')
    {
        var releaseFile = new Resource()
            .wizard(this.wizard())
            .url("https://raw.githubusercontent.com/doitsujin/dxvk/master/RELEASE")
            .name("RELEASE.txt")
            .get();
        dxvkVersion = cat(releaseFile).replaceAll("\\n", "");
    }

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/doitsujin/dxvk/releases/download/v" + dxvkVersion + "/dxvk-" + dxvkVersion + ".tar.gz")
        .name("dxvk-" + dxvkVersion + ".tar.gz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/TMP/")
        .extract();

    var dxvkTmpDir = this.prefixDirectory() + "/TMP/dxvk-" + dxvkVersion;

    cp(dxvkTmpDir + "/x32/d3d11.dll", this.system32directory());
    cp(dxvkTmpDir + "/x32/dxgi.dll", this.system32directory());
    cp(dxvkTmpDir + "/x32/d3d10core.dll", this.system32directory());
    cp(dxvkTmpDir + "/x32/d3d10.dll", this.system32directory());
    cp(dxvkTmpDir + "/x32/d3d10_1.dll", this.system32directory());

    if (this.architecture() == "amd64") {
        cp(dxvkTmpDir + "/x64/d3d11.dll", this.system64directory());
        cp(dxvkTmpDir + "/x64/dxgi.dll", this.system64directory());
        cp(dxvkTmpDir + "/x64/d3d10core.dll", this.system64directory());
        cp(dxvkTmpDir + "/x64/d3d10.dll", this.system64directory());
        cp(dxvkTmpDir + "/x64/d3d10_1.dll", this.system64directory());
    }

    this.overrideDLL()
        .set("native", ["d3d11", "dxgi", "d3d10", "d3d10_1", "d3d10core"])
        .do();

    remove(this.prefixDirectory() + "/TMP/");

    return this;
}

/**
 * Verb to install DXVK
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "DXVK", java.util.Optional.empty());
        var releaseFile = new Resource()
            .wizard(wizard)
            .url("https://raw.githubusercontent.com/doitsujin/dxvk/master/RELEASE")
            .name("RELEASE.txt")
            .get();
        var latestVersion = cat(releaseFile).replaceAll("\\n", "");
        var versions = ["0.93", "0.92", "0.91", "0.90",
                        "0.81", "0.80", "0.72", "0.71", "0.70",
                        "0.65", "0.64", "0.63", "0.62", "0.61", "0.60",
                        "0.54", "0.53", "0.52", "0.51", "0.50",
                        "0.42", "0.41", "0.40",
                        "0.31", "0.30",
                        "0.21", "0.20"];
        var selectedVersion = wizard.menu(tr("Please select the version."), versions, latestVersion);
        wine.wizard(wizard);
        wine.DXVK(selectedVersion);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

