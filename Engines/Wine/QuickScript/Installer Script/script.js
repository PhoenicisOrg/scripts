const QuickScript = include("engines.wine.quick_script.quick_script");
const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION} = include("engines.wine.engine.versions");
const {fileName} = include("utils.functions.filesystem.files");

const Luna = include("engines.wine.verbs.luna");

const operatingSystemFetcher = Bean("operatingSystemFetcher");

module.default = class InstallerScript extends QuickScript {
    constructor() {
        super();
    }

    go() {
        this._name = this._name || "Custom Installer";

        const setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

        // if no name given, ask user
        if (this._name == "Custom Installer") {
            this._name = setupWizard.textbox(tr("Please enter the name of your application."));
        }

        setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

        // get installation file from concrete InstallerScript implementation
        const installationCommand = this._installationCommand(setupWizard);

        const wine = new Wine().wizard(setupWizard);

        // let user select wine settings if desired
        if (this._wineUserSettings) {
            const architectures = ["x86", "amd64"];
            const selectedArchitecture = setupWizard.menu(
                tr("Please select the wine architecture."),
                ["x86 (recommended)", "amd64"],
                "x86 (recommended)"
            );

            this._wineArchitecture = architectures[selectedArchitecture.index];

            const distributions = wine.availableDistributions(this._wineArchitecture);
            const shownDistributions = distributions.map(distribution => {
                if (distribution == "upstream") {
                    return "upstream (recommended)";
                } else {
                    return distribution;
                }
            });
            const selectedDistribution = setupWizard.menu(
                tr("Please select the wine distribution."),
                shownDistributions,
                "upstream (recommended)"
            );
            this._wineDistribution = distributions[selectedDistribution.index];

            const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            const versions = wine.availableVersions(
                `${this._wineDistribution}-${operatingSystem}-${this._wineArchitecture}`
            );
            const shownVersions = versions.map(version => {
                if (version == LATEST_STABLE_VERSION) {
                    return `${version} (recommended)`;
                } else {
                    return version;
                }
            });
            const selectedVersion = setupWizard.menu(
                tr("Please select the wine version."),
                shownVersions,
                LATEST_STABLE_VERSION + " (recommended)"
            );

            this._wineVersion = versions[selectedVersion.index];
        }

        // setup the prefix
        wine.prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion);

        new Luna(wine).go();

        this._preInstall(wine, setupWizard);

        // back to generic wait (might have been changed in preInstall)
        setupWizard.wait(tr("Please wait..."));

        wine.run(installationCommand.command, installationCommand.args, null, false, true);

        // if no executable given, ask user
        if (!this._executable) {
            this._executable = fileName(
                setupWizard.browse(tr("Please select the executable."), wine.prefixDirectory(), ["exe"])
            );
        }

        this._createShortcut(wine.prefix());

        this._postInstall(wine, setupWizard);

        // back to generic wait (might have been changed in postInstall)
        setupWizard.wait(tr("Please wait..."));

        setupWizard.close();
    }
}
