const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const operatingSystemFetcher = Bean("operatingSystemFetcher");
const Optional = Java.type("java.util.Optional");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const { getGithubReleases } = include("utils.functions.net.githubreleases");

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

        if (operatingSystemFetcher.fetchCurrentOperationSystem().getFullName() !== "Linux")
        {
            const answer = wizard.menu(
                tr("VK9 is currently unsupported on non-Linux operating systems due to MoltenVK implementation being incomplete. Select how do you want to approach this situation.",
                    ["YES, continue with VK9 installation regardless", "NO, quit script alltogether", "Exit VK9 Installer, but continue with the script"]
                ))
             
            if (answer.text === "Exit VK9 Installer, but continue with the script") {
                return this;
            }
             
            if (answer.text === "NO, quit script alltogether" || !answer) {
                throw new Error("User aborted the script.");
            }
        }

        print("NOTE: wine version should be greater or equal to 3.5");
        print("NOTE: works from 0.28.0");

        if (typeof this.vk9Version !== "string") {
            const versions = getGithubReleases("disks86", "VK9", wizard);
            this.vk9Version = versions[0];
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
        
        wine.wizard(wizard);
        wine.prefix(container);

        const versions = getGithubReleases("disks86", "VK9", wizard);
        const selectedVersion = wizard.menu(tr("Please select the version."), versions, versions[0]);

        // install selected version
        new VK9(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = VK9;
