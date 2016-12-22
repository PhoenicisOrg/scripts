include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Net", "Download"]);

var Wine = function () {
    var that = this;
    that._wineWebServiceUrl = Bean("propertyReader").getProperty("webservice.wine.url");
    that._wineEnginesDirectory = Bean("propertyReader").getProperty("application.user.engines.wine");
    that._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.wineprefix");
    that._configFactory = Bean("compatibleConfigFileFormatFactory");
    that._distribution = "staging";
    that._OperatingSystemFetcher = Bean("operatingSystemFetcher");
    that._installWinePackage = function (setupWizard, winePackage, localDirectory) {
        var tmpFile = createTempFile("tar.gz");

        new Downloader()
            .wizard(setupWizard)
            .url(winePackage.url)
            .checksum(winePackage.sha1sum)
            .to(tmpFile)
            .get();

        new Extractor()
            .wizard(setupWizard)
            .archive(tmpFile)
            .to(localDirectory)
            .extract();
    };
    that._fetchFullDistributionName = function () {
        var operatingSystem = that._OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        return that._distribution + "-" + operatingSystem + "-" + that._architecture.getNameForWinePackages();
    };
    that._fetchLocalDirectory = function () {
        return that._wineEnginesDirectory + "/" + that._fetchFullDistributionName() + "/" + that._version;
    };
    that.wizard = function (wizard) {
        that._wizard = wizard;
        return that;
    };
    that.architecture = function (architecture) {
        that._architecture = architecture;
        return that;
    };
    that.distribution = function (distribution) {
        that._distribution = distribution;
        return that;
    };
    that.prefix = function (prefix) {
        that._prefix = prefix;
        that._prefixDirectory = that._winePrefixesDirectory + "/" + that._prefix;
        that._prefixConfiguration = that._configFactory.open(that._prefixDirectory);

        if(!that._version) {
            that._version = _prefixConfiguration.readValue("wineVersion");
        } else {
            _prefixConfiguration.writeValue("wineVersion", that._version);
        }

        if(!that._distribution) {
            that._distribution = _prefixConfiguration.readValue("wineDistribution");
        } else {
            _prefixConfiguration.writeValue("wineDistribution", that._distribution);
        }

        if(!that._architecture) {
            var defaultArchitecture = Bean("architectureFetcher").fetchCurrentArchitecture();
            that._architecture = _prefixConfiguration.readValue("wineArchitecture", defaultArchitecture);
        } else {
            _prefixConfiguration.writeValue("wineArchitecture", that._architecture);
        }

        return that;
    };
    that.workingDirectory = function (directory) {
        that._directory = directory;
        return that;
    };

    that.run = function (executable, args) {
        that._wizard.wait("Please wait...");

        var wineBinary = that._fetchLocalDirectory() + "/bin/wine";
        var processBuilder = new java.lang.ProcessBuilder(Java.to([wineBinary, executable].concat(args), "java.lang.String[]"));

        if (that._directory) {
            processBuilder.directory(that._directory);
        }

        processBuilder.environment().put("WINEPREFIX", that._prefixDirectory);
        processBuilder.start().waitFor();

        return that;
    };

    that.version = function (version) {
        that._version = version;
        var fullDistributionName = that._fetchFullDistributionName();
        var localDirectory = that._fetchLocalDirectory();
        var wizard = that._wizard;

        if (!fileExists(localDirectory)) {
            var wineJson = JSON.parse(
                new Downloader()
                    .wizard(that._wizard)
                    .url(that._wineWebServiceUrl)
                    .get()
            );

            wineJson.forEach(function (distribution) {
                if (distribution.name == fullDistributionName) {
                    distribution.packages.forEach(function (winePackage) {
                        if (winePackage.version == version) {
                            that._installWinePackage(wizard, winePackage, localDirectory)
                        }
                    });
                }
            });

        }

        return that;
    }
};