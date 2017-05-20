include(["Functions", "QuickScript", "OnlineInstallerScript"]);
include(["Functions", "Shortcuts", "Wine"]);

new OnlineInstallerScript()
    .name("Warcraft III")
    .editor("Blizzard")
    .applicationHomepage("http://eu.blizzard.com/en-gb/games/war3/")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=W3XP&locale=en-US&os=WIN")
    .category("Games")
    .executable("Frozen Throne.exe")
    .go();
