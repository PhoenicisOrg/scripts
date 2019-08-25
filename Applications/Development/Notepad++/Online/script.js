const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("Notepad++")
    .editor("Notepad++")
    .applicationHomepage("https://notepad-plus-plus.org/")
    .author("Quentin PÂRIS")
    .url("https://notepad-plus-plus.org/repository/7.x/7.7.1/npp.7.7.1.Installer.exe")
    .checksum("071a81782d88810b0084bd2162c67cf0ff3ad13f")
    .category("Development")
    .executable("Notepad++.exe");
