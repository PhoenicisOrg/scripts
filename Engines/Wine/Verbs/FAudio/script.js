const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp } = include("utils.functions.filesystem.files");
const { fetchGithubReleases, downloadGithubRelease, extractGithubReleaseStrings } = include("utils.functions.net.githubreleases");

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

    selectGithubVersion(wizard) {
        const versions = fetchGithubReleases("Kron4ek", "FAudio-Builds", wizard);

        if (!this.faudioVersion || typeof this.faudioVersion !== 'string') {
            return versions[0];
        } else {
            return versions.find(version => version.name === this.faudioVersion);
        }
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system64directory = this.wine.system64directory();

        if (this.wine.architecture() != "amd64") {
            throw "FAudio does not support 32bit architecture.";
        }

        const selectedVersion = this.selectGithubVersion(wizard);

        const setupFile = downloadGithubRelease(selectedVersion, wizard);

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/FAudio/`)
            .extract();

        const faudioDir = `${prefixDirectory}/FAudio/faudio-${selectedVersion.name}`;

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

        const versions = fetchGithubReleases("Kron4ek", "FAudio-Builds", wizard);
        const versionStrings = extractGithubReleaseStrings(versions);

        const selectedVersion = wizard.menu(tr("Please select the version."), versionStrings, versionStrings[0]);

        // install selected version
        new FAudio(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = FAudio;
