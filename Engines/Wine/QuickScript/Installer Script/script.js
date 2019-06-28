include("engines.wine.quick_script.quick_script");
include("engines.wine.engine.object");
include("utils.functions.filesystem.extract");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.luna");

class InstallerScript extends QuickScript {
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
        var installationCommand = this._installationCommand(setupWizard);

        var wine = new Wine()
            .wizard(setupWizard);

        // let user select wine settings if desired
        if (this._wineUserSettings) {
            var architectures = ["x86", "amd64"];
            var shownArchitectures = ["x86 (recommended)", "amd64"];
            var selectedArchitecture = setupWizard.menu(tr("Please select the wine architecture."), shownArchitectures, "x86 (recommended)");
            this._wineArchitecture = architectures[selectedArchitecture.index];

            var distributions = wine.availableDistributions(this._wineArchitecture);
            var shownDistributions = [];
            for (var distributionIdx in distributions) {
                if (distributions[distributionIdx] == "upstream") {
                    shownDistributions.push("upstream (recommended)");
                }
                else {
                    shownDistributions.push(distributions[distributionIdx]);
                }
            }
            var selectedDistribution = setupWizard.menu(tr("Please select the wine distribution."), shownDistributions, "upstream (recommended)");
            this._wineDistribution = distributions[selectedDistribution.index];

            var operatingSystemFetcher = Bean("operatingSystemFetcher");
            var operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            var versions = wine.availableVersions(this._wineDistribution + "-" + operatingSystem + "-" + this._wineArchitecture);
            var shownVersions = [];
            for (var versionIdx in versions) {
                if (versions[versionIdx] == LATEST_STABLE_VERSION) {
                    shownVersions.push(versions[versionIdx] + " (recommended)");
                }
                else {
                    shownVersions.push(versions[versionIdx]);
                }
            }
            var selectedVersion = setupWizard.menu(tr("Please select the wine version."), shownVersions, LATEST_STABLE_VERSION + " (recommended)");
            this._wineVersion = versions[selectedVersion.index];
        }

        // setup the prefix
        wine.prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
            .luna();

        this._preInstall(wine, setupWizard);

        // back to generic wait (might have been changed in preInstall)
        setupWizard.wait(tr("Please wait..."));

        wine.run(installationCommand.command, installationCommand.args, false, true);

        // if no executable given, ask user
        if (!this._executable) {
            this._executable = fileName(setupWizard.browse(tr("Please select the executable."), wine.prefixDirectory(), ["exe"]));
        }

        this._createShortcut(wine.prefix());

        this._postInstall(wine, setupWizard);

        // back to generic wait (might have been changed in postInstall)
        setupWizard.wait(tr("Please wait..."));

        setupWizard.close();
    }
}
