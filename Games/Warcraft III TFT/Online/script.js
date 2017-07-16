include(["Wine", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Warcraft III")
    .editor("Blizzard")
    .applicationHomepage("https://eu.battle.net/shop/en/product/warcraft-iii-the-frozen-throne")
    .author("FalseCAM")
    .url("https://www.battle.net/download/getLegacy?product=W3XP&locale=en-US&os=WIN")
    .category("Games")
    .executable("Frozen Throne.exe")
    .preInstall(function (wine, wizard) {
        if (!fileExists(wine.prefixDirectory + "drive_c/" + wine.programFiles() + "/Warcraft III/Warcraft III.exe")) {
            wizard.message(tr("Please install Warcraft III before installing The Frozen Throne."));
        }
    })
    .go();
