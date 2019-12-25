const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp, remove } = include("utils.functions.filesystem.files");
const operatingSystemFetcher = Bean("operatingSystemFetcher");
const Optional = Java.type("java.util.Optional");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const { fetchGithubReleases, downloadGithubRelease, extractGithubReleaseStrings } = include("utils.functions.net.githubreleases");

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

    selectGithubVersion(wizard) {
        const versions = fetchGithubReleases("Joshua-Ashton", "d9vk", wizard);

        if (!this.d9vkVersion || typeof this.d9vkVersion !== 'string') {
            return versions[0];
        } else {
            return versions.find(version => version.name === this.d9vkVersion);
        }
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const architecture = this.wine.architecture();

        print("NOTE: Wine version should be greater or equal to 3.10");

        if (operatingSystemFetcher.fetchCurrentOperationSystem().getFullName() !== "Linux") {
            const question = tr("D9VK is currently unsupported on non-Linux operating systems due to MoltenVK implementation being incomplete. Select how do you want to approach this situation.")
            const choices = [
                tr("YES, continue with DXVK installation regardless"),
                tr("NO, quit script alltogether"),
                tr("Exit D9VK Installer, but continue with the script")
            ];

            const answer = wizard.menu(question, choices);

            switch (answer.index) {
                case 1:
                    // choice: "NO, quit script alltogether"
                    throw new Error("User aborted the script.");
                case 2:
                    // choice: "Exit D9VK Installer, but continue with the script"
                    return this;
                default:
                // do nothing
            }
        }
        else {
            wizard.message(tr("Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else D9VK might not work correctly."));
        }

        const selectedVersion = this.selectGithubVersion(wizard);

        var setupFile = downloadGithubRelease(selectedVersion, wizard);

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/TMP/`)
            .extract();

        const d9vkTmpDir = `${prefixDirectory}/TMP/d9vk-${selectedVersion.name}`;

        // copy 32 bits dll to system* and apply override
        ls(`${d9vkTmpDir}/x32`).forEach(file => {
            if (file.endsWith(".dll")) {
                cp(`${d9vkTmpDir}/x32/${file}`, system32directory);

                new OverrideDLL(this.wine).withMode("native", [file]).go();
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

        wine.wizard(wizard);
        wine.prefix(container);

        const versions = fetchGithubReleases("Joshua-Ashton", "d9vk", wizard);
        const versionStrings = extractGithubReleaseStrings(versions);

        const selectedVersion = wizard.menu(tr("Please select the version."), versionStrings, versionStrings[0]);

        // install selected version
        new D9VK(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = D9VK;
