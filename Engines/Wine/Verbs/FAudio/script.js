include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install FAudio
* see: https://github.com/Kron4ek/FAudio-Builds
* @returns {Wine} Wine object
*/
Wine.prototype.faudio = function () {
    var faudioVersion = "19.01";

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/Kron4ek/FAudio-Builds/releases/download/" + faudioVersion + "/faudio-" + faudioVersion + ".tar.xz")
        .name("faudio-" + faudioVersion + ".tar.xz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/FAudio/")
        .extract();

    ls(this.prefixDirectory() + "/FAudio/faudio-" + faudioVersion + "/x32").forEach(function (file) {
  		if (file.endsWith(".dll")) {
    		cp(file, this.system32directory());
    		this.overrideDLL()
       			.set("native", [file]) // not sure here, if file is an absolute path, we may need to introduce a basename() function
       			.do();
  		}
    });

    if (this.architecture() == "amd64")
    {
	    ls(this.prefixDirectory() + "/FAudio/faudio-" + faudioVersion + "/x64").forEach(function (file) {
  			if (file.endsWith(".dll")) {
    			cp(file, this.system64directory());
    		}
        });
    }

    return this;
}

/**
 * Verb to install FAudio
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "FAudio", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.faudio();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
