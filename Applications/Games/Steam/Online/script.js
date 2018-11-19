include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["utils", "functions", "filesystem", "files"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Steam")
            .editor("Valve")
            .applicationHomepage("https://www.steampowered.com")
            .author("Quentin PÂRIS")
            .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
            .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
            .category("Games")
            .executable("Steam.exe", ["-no-cef-sandbox"])
            .wineVersion(LATEST_DEVELOPMENT_VERSION) // fixes "content server unavailable" error (Wine bug 45329), TODO: remove when fix is available in Wine stable
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
