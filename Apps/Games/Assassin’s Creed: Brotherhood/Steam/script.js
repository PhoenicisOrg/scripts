include(["Functions", "Functions", "QuickScript", "SteamScript"]);
include(["Functions", "Functions", "Verbs", "d3dx9"]);
include(["Functions", "Functions", "Verbs", "crypt32"]);

new SteamScript()
    .name("Assassin’s Creed® Brotherhood")
    .editor("Ubisoft")
    .author("Quentin PARIS")
    .appId(48190)
    .preInstall(function(wine, wizard) {
        wine.crypt32();
        wine.d3dx9();
    })
    .go();
