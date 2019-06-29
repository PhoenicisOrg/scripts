include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "xact"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "verbs", "dxvk"]);
include(["engines", "wine", "plugins", "windows_version"]);

// Expected to run winesteam on wine-staging (wine untested) on 3.21+ (untested) with xact,dxvk,coreconts dependencies
// Has complicated shaders which are causing an issues  (on AMDGPU?) (https://github.com/ValveSoftware/Proton/issues/823)
var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Dishonored 2")
            .category("Games")
            .editor("Arkane Studios")
            .applicationHomepage("https://dishonored.bethesda.net/")
            .author("Kreyren")
            .appId(403640)
            .executable("Steam.exe", ["-silent", "-applaunch", 123456, "+com_showLoadingScreen 0"]) // Verify
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine /*, wizard*/) {
                wine.windowsVersion("win7");
                wine.xact();
                wine.DXVK();
                wine.corefonts();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
