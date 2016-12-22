include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Net", "Download"]);

var Wine = {
    _wineWebServiceUrl: Bean("propertyReader").getProperty("webservice.wine.url"),
    _wineEnginesDirectory: Bean("propertyReader").getProperty("application.user.engines.wine"),
    _winePrefixesDirectory: Bean("propertyReader").getProperty("application.user.wineprefix"),
    _architecture: Bean("architectureFetcher").fetchCurrentArchitecture(),
    _distribution: "staging",
    _OperatingSystemFetcher: Bean("operatingSystemFetcher"),
    _installWinePackage: function (setupWizard, winePackage, localDirectory) {
        var tmpFile = createTempFile("tar.gz");

        Downloader
            .wizard(setupWizard)
            .url(winePackage.url)
            .checksum(winePackage.sha1sum)
            .to(tmpFile)
            .get();

        Extractor
            .wizard(setupWizard)
            .archive(tmpFile)
            .to(localDirectory)
            .extract();
    },

    _fetchFullDistributionName: function () {
        var operatingSystem = this._OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        return this._distribution + "-" + operatingSystem + "-" + this._architecture.getNameForWinePackages();
    },

    _fetchLocalDirectory: function () {
        return this._wineEnginesDirectory + "/" + this._fetchFullDistributionName() + "/" + this._version;
    },

    wizard: function (wizard) {
        this._wizard = wizard;
        return this;
    },
    architecture: function (architecture) {
        this._architecture = architecture;
        return this;
    },
    distribution: function (distribution) {
        this._distribution = distribution;
        return this;
    },
    prefix: function (prefix) {
        this._prefix = prefix;
        return this;
    },
    workingDirectory: function (directory) {
        this._directory = directory;
        return this;
    },
    run: function (executable, args) {
        this._wizard.wait("Please wait...");

        var prefixDirectory = this._winePrefixesDirectory + "/" + this._prefix;
        var wineBinary = this._fetchLocalDirectory() + "/bin/wine";
        var processBuilder = new java.lang.ProcessBuilder(Java.to([wineBinary, executable].concat(args), "java.lang.String[]"));

        if (this._directory) {
            processBuilder.directory(this._directory);
        }

        processBuilder.environment().put("WINEPREFIX", prefixDirectory);
        processBuilder.start().waitFor();

        return this;
    },

    "version": function (version) {
        this._version = version;
        var fullDistributionName = this._fetchFullDistributionName();
        var localDirectory = this._fetchLocalDirectory();
        var wizard = this._wizard;

        if (!fileExists(localDirectory)) {
            var wineJson = JSON.parse(
                Downloader
                    .wizard(this._wizard)
                    .url(this._wineWebServiceUrl)
                    .get()
            );

            wineJson.forEach(function (distribution) {
                if (distribution.name == fullDistributionName) {
                    distribution.packages.forEach(function (winePackage) {
                        if (winePackage.version == version) {
                            this._installWinePackage(wizard, winePackage, localDirectory)
                        }
                    });
                }
            });

        }

        return this;
    }
};