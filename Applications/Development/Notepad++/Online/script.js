const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("Notepad++")
    .editor("Notepad++")
    .applicationHomepage("https://notepad-plus-plus.org/")
    .author("Quentin PÂRIS")
    .url("https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.5/npp.8.5.Installer.x64.exe")
    .checksum("071a81782d88810b0084bd2162c67cf0ff3ad13f")
    .category("Development")
    .executable("Notepad++.exe");
