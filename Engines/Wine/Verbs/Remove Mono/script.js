include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to remove mono
* @returns {Wine} Wine object
*/
Wine.prototype.removeMono = function () {
    this.uninstall("Mono");

    this.wizard().wait(tr("Please wait..."));
    this.run("reg", ["delete", "HKLM\\Software\\Microsoft\\.NETFramework\\v2.0.50727\\SBSDisabled", "/f"], null, false, true);

    this.wizard().wait(tr("Please wait..."));
    this.run("reg", ["delete", "HKLM\\Software\\Microsoft\\NET Framework Setup\\NDP\\v3.5", "/f"], null, false, true);

    this.wizard().wait(tr("Please wait..."));
    this.run("reg", ["delete", "HKLM\\Software\\Microsoft\\NET Framework Setup\\NDP\\v4", "/f"], null, false, true);

    remove(this.system32directory() + "/mscoree.dll");
    if (this.architecture() == "amd64")
    {
        remove(this.system64directory() + "/mscoree.dll");
    }

    return this;
};

/**
 * Verb to install remove mono
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "removeMono", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.removeMono();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
