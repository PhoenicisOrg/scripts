const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { remove, lns } = include("utils.functions.filesystem.files");
const Downloader = include("utils.functions.net.download");
const { getGithubVersions } = include("utils.functions.net.githubversions");


const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

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

        if (typeof this.gallium9Version !== "string") {
            const versions = getGithubVersions("iXit", "wine-nine-standalone", wizard);
            this.gallium9Version = versions[0];
        }

        wizard.message(
            tr(
                "Using Gallium 9 requires to have a driver supporting the Gallium 9 state tracker, as well as d3dapater9.so installed (ex: libd3d9adapter-mesa package). Please be sure it is installed (both 32 and 64 bits)."
            )
        );

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                `https://github.com/iXit/wine-nine-standalone/releases/download/${this.gallium9Version}/gallium-nine-standalone-${this.gallium9Version}.tar.gz`
            )
            .name(`gallium-nine-standalone-${this.gallium9Version}.tar.gz`)
            .get();

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

        this.wine
            .overrideDLL()
            .set("native", ["d3d9"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "gallium9", Optional.empty());

        const versions = getGithubVersions("iXit", "wine-nine-standalone", wizard);

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, versions[0]);

        wine.prefix(container);
        wine.wizard(wizard);

        // install selected version
        new Gallium9(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = Gallium9;
