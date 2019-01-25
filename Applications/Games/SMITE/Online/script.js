include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "verbs", "dxvk"]);

// RESEARCH
/// .NET is mandatory -> mono is mandatory
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
        new OnlineInstallerScript()
            .name("SMITE")
            .editor("Titan Forge Games")
            .publisher("Hi-Rez Studios")
            .applicationHomepage("https://www.smitegame.com/")
            .author("Kreyren")
            .url("http://cds.q6u4m8x5.hwcdn.net/Installs/InstallSmite.exe") // SOURCE : https://www.smitegame.com/download
            .checksum("10c12741d19975d3e9094b5ebeaf52cf1096ae45") // Is probably changed often, expected chasum missmatch
            .category("Games")
            .executable("InstallSmite.exe")
            .wineVersion(LATEST_UPSTREAM_VERSION)
            .wineDistribution("upstream") // Staging not required(?)
            .preInstall(function (wine/*, wizard*/) {
            	wine.dxvk(); // not tested
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);