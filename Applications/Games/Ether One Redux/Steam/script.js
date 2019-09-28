const SteamScript = include("engines.wine.quick_script.steam_script");

const WindowsVersion = include("engines.wine.plugins.windows_version");

new SteamScript()
    .name("Ether One Redux")
    .editor("White Paper Games")
    .author("Plata")
    .appId(391920)
    .wineArchitecture("amd64")
    .executable("Steam.exe", ["-silent", "-applaunch", 391920, "-nosplash", "-opengl4"])
    .gameOverlay(false)
    .postInstall(function (wine) {
        new WindowsVersion(wine).withApplicationWindowsVersion("EtherOne-Win32-Shipping.exe", "win7").go();
    });
