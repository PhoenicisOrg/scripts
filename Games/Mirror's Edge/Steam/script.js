include(["Wine", "QuickScript", "SteamScript"]);
include(["Wine", "Verbs", "physx"]);

new SteamScript()
    .name("Mirror's Edge™")
    .editor("DICE")
    .author("Plata")
    .appId(17410)
    .preInstall(function(wine, wizard) {
        wine.physx();
        wine.setManagedForApplication().set("MirrorsEdge.exe", false).do();
    })
    .go();
