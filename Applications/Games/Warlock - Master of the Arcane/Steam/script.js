include(["Engines", "Wine", "QuickScript", "SteamScript"]);

include(["Engines", "Wine", "Verbs", "corefonts"]);
include(["Engines", "Wine", "Verbs", "d3dx9"]);
include(["Engines", "Wine", "Verbs", "tahoma"]);
include(["Engines", "Wine", "Verbs", "vcrun2005"]);
include(["Engines", "Wine", "Verbs", "vcrun2008"]);

new SteamScript()
    .name("Warlock - Master of the Arcane")
    .editor("Paradox Interactive")
    .author("madoar")
    .appId(203630)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine/*, wizard*/) {
        wine.corefonts();
        wine.d3dx9();
        wine.tahoma();
        wine.vcrun2005();
        wine.vcrun2008();
    })
    .go();
