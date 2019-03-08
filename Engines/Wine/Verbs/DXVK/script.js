include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
* Verb to install DXVK
* see: https://github.com/doitsujin/dxvk/
* @param {String} dxvkVersion DXVK version to download
* @returns {Wine} Wine object
*/
Wine.prototype.DXVK = function (dxvkVersion) {
    var operatingSystemFetcher = Bean("operatingSystemFetcher");
    print("NOTE: wine version should be greater or equal to 3.10");
    if (operatingSystemFetcher.fetchCurrentOperationSystem() != "Linux")
    {
        this.wizard().message(tr("DXVK might not work correctly on macOS. This is depending on Metal api support and MoltenVK compatibility layer advancement"));
    }
    else
    {
        this.wizard().message(tr("Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else DXVK might not work correctly."));
    }

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

    var forEach = Array.prototype.forEach;
    var sys32dir = this.system32directory();
    var dxvkTmpDir = this.prefixDirectory() + "/TMP/dxvk-" + dxvkVersion;
    var self = this;

    //Copy 32 bits dll to system* and apply override
    forEach.call(ls(dxvkTmpDir + "/x32"), function (file) {
        if (file.endsWith(".dll")) {
            cp(dxvkTmpDir + "/x32/" + file, sys32dir);
            self.overrideDLL()
                .set("native", [file])
                .do();
        }
    });

    if (this.architecture() == "amd64")
    {
        var sys64dir = this.system64directory();
        //Copy 64 bits dll to system*
        forEach.call(ls(dxvkTmpDir + "/x64"), function (file) {
            if (file.endsWith(".dll")) {
                cp(dxvkTmpDir + "/x64/" + file, sys64dir);
            }
        });
    }

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
        // get latest release version
        var releaseFile = new Resource()
            .wizard(wizard)
            .url("https://raw.githubusercontent.com/doitsujin/dxvk/master/RELEASE")
            .name("RELEASE.txt")
            .get();
        var latestVersion = cat(releaseFile).replaceAll("\\n", "");
        // query desired version (default: latest release version)
        var versions = ["1.0",
                        "0.96", "0.95", "0.94", "0.93", "0.92", "0.91", "0.90",
                        "0.81", "0.80", "0.72", "0.71", "0.70",
                        "0.65", "0.64", "0.63", "0.62", "0.61", "0.60",
                        "0.54", "0.53", "0.52", "0.51", "0.50",
                        "0.42", "0.41", "0.40",
                        "0.31", "0.30",
                        "0.21", "0.20"];
        var selectedVersion = wizard.menu(tr("Please select the version."), versions, latestVersion);
        wine.wizard(wizard);
        // install selected version
        wine.DXVK(selectedVersion);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

