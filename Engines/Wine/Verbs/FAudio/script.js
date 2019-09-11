const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install FAudio
 * see: https://github.com/Kron4ek/FAudio-Builds
 */
class FAudio {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Sets the used FAudio version
     *
     * @param {string} faudioVersion The version of FAudio to downlaod
     * @returns {FAudio} The FAudio object
     */
    withVersion(faudioVersion) {
        this.faudioVersion = faudioVersion;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system64directory = this.wine.system64directory();

        if (this.wine.architecture() != "amd64") {
            throw "FAudio does not support 32bit architecture.";
        }

        if (typeof this.faudioVersion !== "string") {
            this.faudioVersion = "19.08";
        }

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                `https://github.com/Kron4ek/FAudio-Builds/releases/download/${this.faudioVersion}/faudio-${this.faudioVersion}.tar.xz`
            )
            .name(`faudio-${this.faudioVersion}.tar.xz`)
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/FAudio/`)
            .extract();

        const faudioDir = `${prefixDirectory}/FAudio/faudio-${this.faudioVersion}`;

        ls(`${faudioDir}/x64`).forEach(file => {
            if (file.endsWith(".dll")) {
                cp(`${faudioDir}/x64/${file}`, system64directory);

                this.wine
                    .overrideDLL()
                    .set("native", [file])
                    .do();
            }
        });
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "FAudio", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        const versions = ["19.08", "19.07", "19.06.07", "19.06", "19.05", "19.04", "19.03", "19.02", "19.01"];

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, "19.08");

        // install selected version
        new FAudio(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = FAudio;
