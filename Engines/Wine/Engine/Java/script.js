include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "net", "download"]);
include(["utils", "functions", "net", "resource"]);

/**
 * Wine engine
*/
var engineImplementation = {
    _operatingSystemFetcher: Bean("operatingSystemFetcher"),
    _wineEnginesDirectory: Bean("propertyReader").getProperty("application.user.engines") + "/wine",
    _wineWebServiceUrl : Bean("propertyReader").getProperty("webservice.wine.url"),
    getLocalDirectory: function (subCategory, version) {
        var parts = subCategory.split("-");
        var distribution = parts[0];
        var architecture = parts[2];
        var operatingSystem = this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        var fullDistributionName = distribution + "-" + operatingSystem + "-" + architecture;
        return this._wineEnginesDirectory + "/" + fullDistributionName + "/" + version;
    },
    isInstalled: function (subCategory, version) {
        return fileExists(this.getLocalDirectory(subCategory, version));
    },
    install: function (subCategory, version) {
        var parts = subCategory.split("-");
        var distribution = parts[0];
        var architecture = parts[2];
        var localDirectory = this.getLocalDirectory(subCategory, version);
        // if not installed
        if (!fileExists(localDirectory)) {
            var wizard = SetupWizard(InstallationType.ENGINES, "Wine " + version + " " + distribution + " (" + architecture + ")", java.util.Optional.empty());
            var operatingSystem = this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            var fullDistributionName =  distribution + "-" + operatingSystem + "-" + architecture;

            if (!this.isInstalled(subCategory, version)) {
                print(tr("Installing version: ", version));

                var wineJson = JSON.parse(this.getAvailableVersions());

                var that = this;
                wineJson.forEach(function (distribution) {
                    if (distribution.name == fullDistributionName) {
                        distribution.packages.forEach(function (winePackage) {
                            if (winePackage.version == version) {
                                that._installWinePackage(wizard, winePackage, localDirectory);
                                that._installGecko(wizard, winePackage, localDirectory);
                                that._installMono(wizard, winePackage, localDirectory);
                            }
                        });
                    }
                });

                // FIXME : Not found case!

            }
            wizard.close();
        }
    },
    _installWinePackage: function (setupWizard, winePackage, localDirectory) {
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
    },
    _installGecko: function (setupWizard, winePackage, localDirectory) {
        var gecko = new Resource()
            .wizard(setupWizard)
            .url(winePackage.geckoUrl)
            .checksum(winePackage.geckoMd5)
            .algorithm("md5")
            .name(winePackage.geckoFile)
            .directory("gecko")
            .get();

        var wineGeckoDir = localDirectory + "/share/wine/gecko";

        lns(new java.io.File(gecko).getParent(), wineGeckoDir);
    },
    _installMono: function (setupWizard, winePackage, localDirectory) {
        var mono = new Resource()
            .wizard(setupWizard)
            .url(winePackage.monoUrl)
            .checksum(winePackage.monoMd5)
            .algorithm("md5")
            .name(winePackage.monoFile)
            .directory("mono")
            .get();

        var wineMonoDir = localDirectory + "/share/wine/mono";

        lns(new java.io.File(mono).getParent(), wineMonoDir);
    },
    delete: function (subCategory, version) {
         if (this.isInstalled(subCategory, version)) {
             remove(this.getLocalDirectory(subCategory, version));
         }
     },
    getAvailableVersions: function () {
        var versionsFile = this._wineEnginesDirectory + "/availableVersions.json";
        touch(versionsFile);
        new Downloader()
            .wizard(this._wizard)
            .url(this._wineWebServiceUrl)
            .to(versionsFile)
            .onlyIfUpdateAvailable(true)
            .get();
        return cat(versionsFile);
    }
};

/* exported Engine */
var Engine = Java.extend(org.phoenicis.engines.Engine, engineImplementation);
