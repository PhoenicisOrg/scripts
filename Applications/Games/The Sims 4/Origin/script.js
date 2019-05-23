include("engines.wine.quick_script.origin_script");
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
        new OriginScript()
            .name("The Sims 4")
            .editor("Electronic Arts")
            .applicationHomepage("https://www.ea.com/games/the-sims/the-sims-4/pc")
            .author("ZemoScripter")
            .category("Games")
            .wineVersion("4.3")
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .appId("1011164,1015875,1015876,1015793,1015794,1015795,1015806,1015807,1015808,1018025,1018023,1015236,1015235,1015224")
            .preInstall(function (wine) {
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
