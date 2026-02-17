const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const WindowsVersion = include("engines.wine.plugins.windows_version");

new OnlineInstallerScript()
    .name("Soundplant")
    .editor("Marcel Blum")
    .applicationHomepage("http://soundplant.org/")
    .author("ImperatorS79")
    .url("https://soundplant.org/downloads/Soundplant59_Win_setup.exe")
    .checksum("0d54ed651b43776efe1e46542903456ec6e14d2e")
    .category("Accessories")
    .executable("Soundplant45.exe")
    .preInstall((wine) => {
        new WindowsVersion(wine).withWindowsVersion("win7").go();
    });
