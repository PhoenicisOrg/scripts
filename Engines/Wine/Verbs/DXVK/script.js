const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp, cat, remove } = include("utils.functions.filesystem.files");

const operatingSystemFetcher = Bean("operatingSystemFetcher");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

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

        if (operatingSystemFetcher.fetchCurrentOperationSystem() != "Linux") {
            wizard.message(
                tr(
                    "DXVK might not work correctly on macOS. This is depending on Metal api support and MoltenVK compatibility layer advancement"
                )
            );
        } else {
            wizard.message(
                tr(
                    "Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else DXVK might not work correctly."
                )
            );
        }

        if (typeof this.dxvkVersion !== "string") {
            const releaseFile = new Resource()
                .wizard(wizard)
                .url("https://raw.githubusercontent.com/doitsujin/dxvk/master/RELEASE")
                .name("RELEASE.txt")
                .get();

            this.dxvkVersion = cat(releaseFile).replaceAll("\\n", "");
        }

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                `https://github.com/doitsujin/dxvk/releases/download/v${this.dxvkVersion}/dxvk-${this.dxvkVersion}.tar.gz`
            )
            .name(`dxvk-${this.dxvkVersion}.tar.gz`)
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/TMP/`)
            .extract();

        const dxvkTmpDir = `${prefixDirectory}/TMP/dxvk-${this.dxvkVersion}`;

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

        wine.prefix(container);
        wine.wizard(wizard);

        // get latest release version
        const releaseFile = new Resource()
            .wizard(wizard)
            .url("https://raw.githubusercontent.com/doitsujin/dxvk/master/RELEASE")
            .name("RELEASE.txt")
            .get();

        const latestVersion = cat(releaseFile).replaceAll("\\n", "");

        // query desired version (default: latest release version)
        const versions = [
            "1.2.2",
            "1.2.1",
            "1.2",
            "1.1.1",
            "1.0.3",
            "1.0.2",
            "1.0.1",
            "1.0",
            "0.96",
            "0.95",
            "0.94",
            "0.93",
            "0.92",
            "0.91",
            "0.90",
            "0.81",
            "0.80",
            "0.72",
            "0.71",
            "0.70",
            "0.65",
            "0.64",
            "0.63",
            "0.62",
            "0.61",
            "0.60",
            "0.54",
            "0.53",
            "0.52",
            "0.51",
            "0.50",
            "0.42",
            "0.41",
            "0.40",
            "0.31",
            "0.30",
            "0.21",
            "0.20"
        ];

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, latestVersion);

        // install selected version
        new DXVK(wine).withVersion(selectedVersion.text).go();

        wizard.close();
    }
}

module.default = DXVK;
