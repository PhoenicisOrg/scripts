const Wine = include("engines.wine.engine.object");
const { Extractor } = include("utils.functions.filesystem.extract");
const { remove, lns } = include("utils.functions.filesystem.files");
const { GitHubReleaseDownloader } = include("utils.functions.net.githubreleases");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install Gallium 9 Standalone
 * see: https://github.com/iXit/wine-nine-standalone/
 */
class Gallium9 {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Sets the used gallium9 version
     *
     * @param {string} gallium9Version The Gallium 9 Standalone version to download
     * @returns {Gallium9} The Gallium9 object
     */
    withVersion(gallium9Version) {
        this.gallium9Version = gallium9Version;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();

        wizard.message(
            tr(
                "Using Gallium 9 requires to have a driver supporting the Gallium 9 state tracker, as well as d3dapater9.so installed (ex: libd3d9adapter-mesa package). Please be sure it is installed (both 32 and 64 bits)."
            )
        );

        const githubDownloader = new GitHubReleaseDownloader("iXit", "wine-nine-standalone", wizard);

        if (typeof this.gallium9Version !== "string") {
            this.gallium9Version = githubDownloader.getLatestRelease();
        }

        const [setupFile] = githubDownloader.download(this.gallium9Version);

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(prefixDirectory)
            .extract();

        remove(`${system32directory}/d3d9.dll`);

        lns(`${prefixDirectory}/gallium-nine-standalone/lib32/d3d9-nine.dll.so`, `${system32directory}/d3d9-nine.dll`);
        lns(
            `${prefixDirectory}/gallium-nine-standalone/bin32/ninewinecfg.exe.so`,
            `${system32directory}/ninewinecfg.exe`
        );
        lns(`${system32directory}/d3d9-nine.dll`, `${system32directory}/d3d9.dll`);

        if (this.wine.architecture() == "amd64") {
            const system64directory = this.wine.system64directory();

            remove(`${system64directory}/d3d9.dll`);

            lns(
                `${prefixDirectory}/gallium-nine-standalone/lib64/d3d9-nine.dll.so`,
                `${system64directory}/d3d9-nine.dll`
            );
            lns(
                `${prefixDirectory}/gallium-nine-standalone/bin64/ninewinecfg.exe.so`,
                `${system64directory}/ninewinecfg.exe`
            );
            lns(`${system64directory}/d3d9-nine.dll`, `${system64directory}/d3d9.dll`);

            this.wine.run(`${system64directory}/ninewinecfg.exe`, ["-e"], null, false, true);
        } else {
            this.wine.run(`${system32directory}/ninewinecfg.exe`, ["-e"], null, false, true);
        }

        new OverrideDLL(this.wine).withMode("native", ["d3d9"]).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "gallium9", Optional.empty());

        const githubDownloader = new GitHubReleaseDownloader("iXit", "wine-nine-standalone", wizard);

        const versions = githubDownloader.getReleases();
        const latestVersion = githubDownloader.getLatestRelease();

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, latestVersion);

        wine.prefix(container);
        wine.wizard(wizard);

        // install selected version
        new Gallium9(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = Gallium9;
