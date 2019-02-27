include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.csmt");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.dotnet452");
include("engines.wine.verbs.vcrun2012");
include("engines.wine.verbs.quartz");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Elite:Dangerous")
            .editor("Frontier Developments")
            .author("ImperatorS79")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .preInstall(function (wine/*, wizard*/) {
                wine.dotnet452();
                wine.corefonts();
                wine.quartz();
                wine.vcrun2012();
                wine.enableCSMT();
            })
            .appId(359320)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
