const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("mIRC")
    .editor("mIRC")
    .applicationHomepage("http://www.mirc.com/")
    .author("Quentin PÂRIS")
    .url("https://www.mirc.com/downloads/mirc/49/mirc783.exe")
    .checksum("a54122ce586dded7f19e0e8c73a1aa05469be49b")
    .category("Internet")
    .executable("mirc.exe");
