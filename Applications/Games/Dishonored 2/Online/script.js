include(["engines", "wine", "quick_script", "steam_script"]);

include(["engines", "wine", "verbs", "xact"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "verbs", "dxvk"]);
include(["engines", "wine", "plugins", "windows_version"]);

include(["engines", "wine", "shortcuts", "wine"]); // Sane? Dunno 

// Expected to run winesteam on wine-staging (wine untested) on 3.21+ (untested) with xact,dxvk,coreconts dependencies
// Has complicated shaders which are causing an issues (https://github.com/ValveSoftware/Proton/issues/823)

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Dishonored 2")
            .category("Games")
            // .gameOverlay(false) // Disable game overlay
            .editor("Arkane Studios")
            .applicationHomepage("https://dishonored.bethesda.net/")
            .publisher("Bethesda Softworks") // Not mensioned, but seems sane 
            .author("Kreyren")
            .appId(403640)
            .executable("Steam.exe", ["-silent", "-applaunch", 123456, "+com_showLoadingScreen 0"]) // Verify
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine /*, wizard*/) {
                wine.windowsVersion("win7");
                wine.xact();
                wine.dxvk();
                wine.coreconts();
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
