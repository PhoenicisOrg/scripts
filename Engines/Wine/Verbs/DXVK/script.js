const Wine = include("engines.wine.engine.object");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp, cat, remove } = include("utils.functions.filesystem.files");
const operatingSystemFetcher = Bean("operatingSystemFetcher");
const Optional = Java.type("java.util.Optional");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const { GitHubReleaseDownloader } = include("utils.functions.net.githubreleases");

/**
 * Verb to install DXVK
 *
 * see: https://github.com/doitsujin/dxvk/
 */
class DXVK {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Sets the DXVK version to download
     *
     * @param {string} dxvkVersion The DXVK version to download
     * @returns {DXVK} The DXVK object
     */
    withVersion(dxvkVersion) {
        this.dxvkVersion = dxvkVersion;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const sys32dir = this.wine.system32directory();
        const architecture = this.wine.architecture();

        print("NOTE: wine version should be greater or equal to 3.10");

        if (operatingSystemFetcher.fetchCurrentOperationSystem().getFullName() !== "Linux")
        {
            const question = tr("DXVK is currently unsupported on non-Linux operating systems due to MoltenVK implementation being incomplete. Select how do you want to approach this situation.")
            const choices = [
                tr("YES, continue with DXVK installation regardless"),
                tr("NO, quit script alltogether"),
                tr("Exit DXVK Installer, but continue with the script")
            ];

            const answer = wizard.menu(question, choices);

            switch (answer.index) {
                case 1:
                    // choice: "NO, quit script alltogether"
                    throw new Error("User aborted the script.");
                case 2:
                    // choice: "Exit DXVK Installer, but continue with the script"
                    return this;
                default:
                    // do nothing
            }
        }
        else {
            wizard.message(tr("Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else DXVK might not work correctly."));
        }
        const githubDownloader = new GitHubReleaseDownloader("doitsujin", "dxvk", wizard);

        if (typeof this.dxvkVersion !== "string") {
            this.dxvkVersion = githubDownloader.getLatestRelease();
        }

        const [setupFile] = githubDownloader.download(this.dxvkVersion);

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/TMP/`)
            .extract();

        const dxvkTmpDir = `${prefixDirectory}/TMP/dxvk-${this.dxvkVersion.substring(1)}`;

        //Copy 32 bits dll to system* and apply override
        ls(`${dxvkTmpDir}/x32`).forEach(file => {
            if (file.endsWith(".dll")) {
                cp(`${dxvkTmpDir}/x32/${file}`, sys32dir);

                new OverrideDLL(this.wine).withMode("native", [file]).go();
            }
        });

        if (architecture == "amd64") {
            const sys64dir = this.wine.system64directory();

            //Copy 64 bits dll to system*
            ls(`${dxvkTmpDir}/x64`).forEach(file => {
                if (file.endsWith(".dll")) {
                    cp(`${dxvkTmpDir}/x64/${file}`, sys64dir);
                }
            });
        }

        remove(`${prefixDirectory}/TMP/`);
    }
    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "DXVK", Optional.empty());

        wine.wizard(wizard);
        wine.prefix(container);

        const githubDownloader = new GitHubReleaseDownloader("doitsujin", "dxvk", wizard);

        const versions = githubDownloader.getReleases();
        const latestVersion = githubDownloader.getLatestRelease();

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, latestVersion);

        // install selected version
        new DXVK(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = DXVK;
