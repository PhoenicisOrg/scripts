include(["Functions", "QuickScript", "SteamScript"]);

include(["Functions", "Verbs", "corefonts"]);
include(["Functions", "Verbs", "d3dx9"]);
include(["Functions", "Verbs", "tahoma"]);
include(["Functions", "Verbs", "vcrun2005"]);
include(["Functions", "Verbs", "vcrun2008"]);

new SteamScript()
    .name("Warlock - Master of the Arcane")
    .editor("Paradox Interactive")
    .author("madoar")
    .appId(203630)
    .wineVersion("2.10")
    .wineDistribution("staging")
    .preInstall(function (wine, wizard) {
        wine.corefonts();
        wine.d3dx9();
        wine.tahoma();
        wine.vcrun2005();
        wine.vcrun2008();
    })
    .go();
