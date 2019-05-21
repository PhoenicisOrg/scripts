include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.vcrun6sp6");
include("engines.wine.verbs.mfc42");
include("engines.wine.verbs.dotnet20sp2");
include("engines.wine.verbs.vcrun2010");
include("engines.wine.verbs.vcrun2013");
include("engines.wine.verbs.d9vk");
include("utils.functions.apps.resources");
include("engines.wine.plugins.regedit");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("The Sims 4")
            .editor("Electronic Arts")
            .applicationHomepage("https://www.ea.com/games/the-sims/the-sims-4/pc")
            .author("ZemoScripter")
            .category("Games")
            .executable("TS4_x64.exe")
            .wineArchitecture("amd64")
            .wineVersion(4.7)
            .wineDistribution("staging")
            .preInstall(function (wine, wizard) {
                wine.dotnet20sp2();
                wine.vcrun6sp6();
                wine.mfc42();
                wine.vcrun2010();
                wine.vcrun2013();
                wine.D9VK();
                var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
                wine.regedit().patch(registrySettings);
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
