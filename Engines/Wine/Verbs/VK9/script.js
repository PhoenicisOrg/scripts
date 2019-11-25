const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { cp, remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

const operatingSystemFetcher = Bean("operatingSystemFetcher");

/**
 * Verb to install VK9
 * see: https://github.com/disks86/VK9
 */
class VK9 {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Sets the VK9 version to install
     *
     * @param {string} vk9Version The VK9 version to install
     * @returns {VK9} The VK9 object
     */
    withVersion(vk9Version) {
        this.vk9Version = vk9Version;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const system64directory = this.wine.system64directory();

        if (operatingSystemFetcher.fetchCurrentOperationSystem() != "Linux") {
            wizard.message(
                tr(
                    "VK9 might not work correctly on macOS. This is depending on Metal api support and MoltenVK compatibility layer advancement"
                )
            );
        } else {
            wizard.message(
                tr(
                    "Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else VK9 might not work correctly."
                )
            );
        }

        print("NOTE: wine version should be greater or equal to 3.5");
        print("NOTE: works from 0.28.0");

        if (typeof this.vk9Version !== "string") {
            this.vk9Version = "0.29.0";
        }

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url(
                `https://github.com/disks86/VK9/releases/download/${this.vk9Version}/${this.vk9Version}-bin-x86-Release.zip`
            )
            .name(`${this.vk9Version}-bin-x86-Realease.zip`)
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(setupFile32)
            .to(`${prefixDirectory}/TMP32/`)
            .extract();

        cp(`${prefixDirectory}/TMP32/${this.vk9Version}-bin-x86-Release/d3d9.dll`, system32directory);

        remove(`${prefixDirectory}/TMP32/`);

        if (this.wine.architecture() === "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    `https://github.com/disks86/VK9/releases/download/${this.vk9Version}/${this.vk9Version}-bin-x86_64-Release.zip`
                )
                .name(`${this.vk9Version}-bin-x86_64-Realease.zip`)
                .get();

            new Extractor()
                .wizard(wizard)
                .archive(setupFile64)
                .to(`${prefixDirectory}/TMP64/`)
                .extract();

            cp(`${prefixDirectory}/TMP64/${this.vk9Version}-bin-x86_64-Release/d3d9.dll`, system64directory);

            remove(`${prefixDirectory}/TMP64/`);
        }

        new OverrideDLL(this.wine).withMode("native", ["d3d9"]).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "VK9", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        // this script is not able to install older versions (VK9.conf mandatory)
        const versions = ["0.29.0", "0.28.1", "0.28.0"];
        // query desired version (default: 0.28.1)
        const selectedVersion = wizard.menu(tr("Please select the version."), versions, "0.28.1");

        // install selected version
        new VK9(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = VK9;
