const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("Notepad++")
    .editor("Notepad++")
    .applicationHomepage("https://notepad-plus-plus.org/")
    .author("Quentin PÂRIS")
    .url("https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.5/npp.8.5.Installer.x64.exe")
    .checksum("0a129db9a19b021b4a83cf267ebb2eb8c3b8241b")
    .category("Development")
    .executable("Notepad++.exe");
