include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Dragon Ball Xenoverse")
            .editor("DIMPS")
            .author("ImperatorS79")
            .wineArchitecture("amd64")
            .appId(323470)
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
