include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
 * Verb to install secur32
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.secur32 = function () {
    var setupFilex86 = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X86.exe")
        .checksum("c3516bc5c9e69fee6d9ac4f981f5b95977a8a2fa")
        .name("windows6.1-KB976932-X86.exe")
        .get();

    new CabExtract()
        .archive(setupFilex86)
        .wizard(this.wizard())
        .to(this.prefixDirectory() + "/TMP/")
        .extract(["-L", "-F", "x86_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_a851f4adbb0d5141/secur32.dll"]);

    cp(this.prefixDirectory() + "/TMP/" + "x86_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_a851f4adbb0d5141/secur32.dll", this.system32directory());

    remove(this.prefixDirectory() + "/TMP/");

    if (this.architecture() == "amd64") {
        var setupFilex64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X64.exe")
            .checksum("74865ef2562006e51d7f9333b4a8d45b7a749dab")
            .name("windows6.1-KB976932-X64.exe")
            .get();

        new CabExtract()
            .archive(setupFilex64)
            .wizard(this.wizard())
            .to(this.prefixDirectory() + "/TMP/")
            .extract(["-L", "-F", "amd64_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_04709031736ac277/secur32.dll"]);

        cp(this.prefixDirectory() + "/TMP/" + "amd64_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_04709031736ac277/secur32.dll", this.system64directory());

        remove(this.prefixDirectory() + "/TMP/");
    }

    this.overrideDLL()
        .set("native, builtin", ["secur32"])
        .do()

    return this;
}

/**
 * Verb to install secur32
 */
// eslint-disable-next-line no-unused-vars
class Secur32Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "secur32", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.secur32();
        wizard.close();
    }
}
