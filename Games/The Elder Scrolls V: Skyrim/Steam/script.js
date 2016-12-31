include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("The Elder Scrolls V: Skyrim")
    .editor("Bethesda Softworks")
    .author("Quentin PARIS")
    .appId(72850)
    .postInstall(function(wine) {
        wine.crypt32();
    })
    .go();
