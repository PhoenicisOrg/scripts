include(["engines", "wine", "quick_script", "online_installer_script"]);

new OnlineInstallerScript()
    .name("Mp3tag")
    .editor("Florian Heidenreich")
    .applicationHomepage("http://www.mp3tag.de/")
    .author("ImperatorS79")
    .url("http://download.mp3tag.de/mp3tagv284asetup.exe")
    .checksum("c1d677043ecc8a4edbb804f189b0f23bc7937066")
    .category("Multimedia")
    .executable("mp3tag.exe")
    .go();
