include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dxvk");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.vcrun2008");

// Doesn't work! - https://github.com/PhoenicisOrg/scripts/pull/967#issuecomment-499492492

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Assassin’s Creed III")
            .editor("Ubisoft Montreal")
            .author("Plata, KREYREN")
            .appId(208480)
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .preInstall(function (wine/*, wizard*/) {
                wine.DXVK();
                wine.corefonts();
                wine.vcrun2008();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
