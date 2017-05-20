include(["Functions", "QuickScript", "OnlineInstallerScript"]);
include(["Functions", "Shortcuts", "Wine"]);

new OnlineInstallerScript()
    .name("Warcraft III TFT")
    .editor("Blizzard")
    .applicationHomepage("http://eu.blizzard.com/en-gb/games/war3/")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=W3XP&locale=en-US&os=WIN")
    .category("Games")
    .preInstall(function (wine, wizard) {
        wine.prefix("Warcraft III")
    })
    .postInstall(function (wine, wizard){
        new WineShortcut()
        .name("Warcraft III TFT")
        .prefix("Warcraft III")
        .search("Frozen Throne.exe")
        .miniature(["Games", "Warcraft III TFT"])
        .create();
    })
    .go();
