include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Ether One Redux")
            .editor("White Paper Games")
            .author("Plata")
            .appId(391920)
            .wineArchitecture("amd64")
            .executable("Steam.exe", ["-silent", "-applaunch", 391920, "-nosplash", "-opengl4"])
            .gameOverlay(false)
            .postInstall(function (wine/*, wizard*/) {
                wine.setOsForApplication().set("EtherOne-Win32-Shipping.exe", "win7").do();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
