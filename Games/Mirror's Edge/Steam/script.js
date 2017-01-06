include(["Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Verbs", "physx"]);

new SteamScript()
    .name("Mirror's Edge™")
    .editor("DICE")
    .author("Plata")
    .appId(17410)
    .wineVersion("1.9.23")
    .preInstall(function(wine, wizard) {
        wine.physx();
        wine.setManagedForApplication().set("MirrorsEdge.exe", false).do();
    })
    .go();
