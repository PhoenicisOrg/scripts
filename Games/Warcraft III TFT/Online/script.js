include(["Functions", "QuickScript", "OnlineInstallerScript"]);
include(["Functions", "Verbs", "corefonts"]);
include(["Functions", "Verbs", "vcrun2015"]);

new OnlineInstallerScript()
    .name("Warcraft III")
    .editor("Blizzard")
    .applicationHomepage("http://eu.battle.net/en/")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=W3XP&locale=en-US&os=WIN")
    .category("Games")
    .executable("Frozen Throne.exe")
    .go();
