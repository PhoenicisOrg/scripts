const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp, remove } = include("utils.functions.filesystem.files");

const operatingSystemFetcher = Bean("operatingSystemFetcher");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install D9VK
 * see: https://github.com/Joshua-Ashton/d9vk/
 */
class D9VK {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the D9VK version to download
     *
     * @param {string} d9vkVersion The D9VK version to download
     * @returns {D9VK} The D9VK object
     */
    withVersion(d9vkVersion) {
        this.d9vkVersion = d9vkVersion;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const architecture = this.wine.architecture():

        print("NOTE: Wine version should be greater or equal to 3.10");

        if (operatingSystemFetcher.fetchCurrentOperationSystem() != "Linux") {
            wizard.message(
                tr(
                    "D9VK might not work correctly on macOS. This is depending on Metal api support and MoltenVK compatibility layer advancement"
                )
            );
        } else {
            wizard.message(
                tr(
                    "Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else D9VK might not work correctly."
                )
            );
        }

        if (typeof this.d9vkVersion !== "string") {
            this.d9vkVersion = "0.12";
        }

        var setupFile = new Resource()
            .wizard(wizard)
            .url(
                `https://github.com/Joshua-Ashton/d9vk/releases/download/${this.d9vkVersion}/d9vk-${this.d9vkVersion}.tar.gz`
            )
            .name(`d9vk-${this.d9vkVersion}.tar.gz`)
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/TMP/`)
            .extract();

        const d9vkTmpDir = `${prefixDirectory}/TMP/d9vk-${this.d9vkVersion}`;

        // copy 32 bits dll to system* and apply override
        ls(`${d9vkTmpDir}/x32`).forEach(file => {
            if (file.endsWith(".dll")) {
                cp(`${d9vkTmpDir}/x32/${file}`, system32directory);

                this.wine
                    .overrideDLL()
                    .set("native", [file])
                    .do();
            }
        });

        if (architecture == "amd64") {
            const system64directory = this.wine.system64directory();

            // copy 64 bits dll to system*
            ls(d9vkTmpDir + "/x64").forEach(file => {
                if (file.endsWith(".dll")) {
                    cp(`${d9vkTmpDir}/x64/${file}`, system64directory);
                }
            });
        }

        remove(`${prefixDirectory}/TMP/`);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "D9VK", Optional.empty());

        const versions = ["0.12", "0.11", "0.10"];
        const selectedVersion = wizard.menu(tr("Please select the version."), versions, "0.12");

        wine.prefix(container);
        wine.wizard(wizard);

        // install selected version
        new D9VK(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = D9VK;
