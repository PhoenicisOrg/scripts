include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "verbs", "corefonts"]);
include(["engines", "wine", "shortcuts", "wine"]); // Sane? Dunno 

// RESEARCH
/// .NET is mandatory -> mono suggested
/// DXVK?

// TODO : Add steamless option
// PROTON: https://github.com/ValveSoftware/Proton/issues/2208
/// TODO: Needs MONO instead of .NET -> Results in fatal on steam using proton in 2019-01-13
// WINEHQ : https://appdb.winehq.org/objectManager.php?sClass=version&iId=34969&iTestingId=98867
/// ""I used winetricks to install d3dx10 d3dx11_43 d3dx9_43 directx9 dotnet40 gdiplus vcrun2008 vcrun2010 xact wininet""
//// gdiplus? xact? dotnet? -> Rest probably irelevant

// Installs SMITE

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("SMITE")
            .editor("Arkane Studios")
            .applicationHomepage("https://www.smitegame.com/")
            .author("kreyren")
            .appId(386360)
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine /*, wizard*/) {
                wine.windowsVersion("win7");
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
