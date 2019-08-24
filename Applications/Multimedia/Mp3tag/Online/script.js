const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("Mp3tag")
    .editor("Florian Heidenreich")
    .applicationHomepage("http://www.mp3tag.de/")
    .author("ImperatorS79")
    .url("https://download.mp3tag.de/mp3tagv297setup.exe")
    .checksum("4bcd421c57da51c274e84edc6b962ead2a03d226")
    .category("Multimedia")
    .executable("mp3tag.exe");
