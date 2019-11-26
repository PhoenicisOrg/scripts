const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp } = include("utils.functions.filesystem.files");
const { getGithubReleases } = include("utils.functions.net.githubreleases");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

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
            const versions = getGithubReleases("Kron4ek", "FAudio-Builds", wizard);
            this.faudioVersion = versions[0];
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

                new OverrideDLL(this.wine).withMode("native", [file]).go();
            }
        });
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "FAudio", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        const versions = getGithubReleases("Kron4ek", "FAudio-Builds", wizard);

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, versions[0]);

        // install selected version
        new FAudio(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = FAudio;
