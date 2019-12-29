const Wine = include("engines.wine.engine.object");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp } = include("utils.functions.filesystem.files");
const { GitHubReleaseDownloader } = include("utils.functions.net.githubreleases");

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

        const githubDownloader = new GitHubReleaseDownloader("Kron4ek", "FAudio-Builds")
            .withWizard(wizard);

        githubDownloader.fetchReleases();

        if (typeof this.faudioVersion !== "string") {
            this.faudioVersion = githubDownloader.getLatestRelease();
        }

        const [setupFile] = githubDownloader.download(this.faudioVersion);

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

        const githubDownloader = new GitHubReleaseDownloader("Kron4ek", "FAudio-Builds")
            .withWizard(wizard);

        githubDownloader.fetchReleases();

        const versions = githubDownloader.getReleases();
        const latestVersion = githubDownloader.getLatestRelease();

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, latestVersion);

        // install selected version
        new FAudio(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = FAudio;
