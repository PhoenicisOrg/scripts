include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");


/**
 * Verb to install msxml3
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.msxml3 = function () {
    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("https://media.codeweavers.com/pub/other/msxml3.msi")
        .checksum("d4c2178dfb807e1a0267fce0fd06b8d51106d913")
        .name("msxml3.msi")
        .get();

    remove(this.system32directory() + "/msxml3.dll")
    this.overrideDLL()
        .set("native", ["msxml3"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", "msxml3"));
    this.run(setupFile32, ["/q:a", "/c:msxml3.msi /q"], null, false, true);

    return this;
};

/**
 * Verb to install msxml3
 */
// eslint-disable-next-line no-unused-vars
class Msxml3Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "msxml3", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.msxml3();
        wizard.close();
    }
}
