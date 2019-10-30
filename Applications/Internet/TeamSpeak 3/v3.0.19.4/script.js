const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("TeamSpeak 3")
    .editor("TeamSpeak")
    .applicationHomepage("http://teamspeak.com/")
    .author("Brainzyy")
    .url("http://dl.4players.de/ts/releases/3.0.19.4/TeamSpeak3-Client-win32-3.0.19.4.exe")
    .checksum("b8534eb206dbaf595ef0c2bfa5f97048fde259f4")
    .category("Internet")
    .executable("ts3client_win32.exe");
