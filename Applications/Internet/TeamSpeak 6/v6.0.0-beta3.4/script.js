const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

new OnlineInstallerScript()
    .name("TeamSpeak 3")
    .editor("TeamSpeak")
    .applicationHomepage("http://teamspeak.com/")
    .author("Brainzyy")
    .url("https://files.teamspeak-services.com/pre_releases/client/6.0.0-beta3.4/teamspeak-client.msi")
    .checksum("a52f65be8fdd627c0194772815553a59bb8c2cb2")
    .category("Internet")
    .executable("ts3client_win32.exe");
