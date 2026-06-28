const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("Notepad++")
    .editor("Notepad++")
    .applicationHomepage("https://notepad-plus-plus.org/")
    .author("Quentin PÂRIS")
    .url("https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.9.2/npp.8.9.2.Installer.x64.exe")
    .checksum("5aca07500f99a8afee0e98c5265803607c4c749b")
    .category("Development")
    .executable("Notepad++.exe");
