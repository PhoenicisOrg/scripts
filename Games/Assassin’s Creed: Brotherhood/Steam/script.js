include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin’s Creed® Brotherhood")
    .editor("UbiSoft")
    .author("Quentin PARIS")
    .appId(48190)
    .preInstall(function(wine) {
        wine.crypt32();
    })
    .go();
