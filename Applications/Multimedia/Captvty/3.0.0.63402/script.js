include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["engines", "wine", "verbs", "dotnet45"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Captvty")                       // name of the application
            .editor("Guillaume")                               // editor of the application
            .applicationHomepage("http://v3.captvty.fr/")  // application homepage
            .author("")                     // author of this script (you)
            .url("http://releases.captvty.fr/0340f3631221f953f55170d90904318eb662b89b/captvty-3.0.0.63402.zip")                       // where the exe can be downloaded
            .checksum("b0773711af580ed877c634509f0023164fb87c02")                       // sha1sum of the exe
            .category("Multimedia")                           // category
            .executable("Captvty.exe")                  // exe name (for the shortcut)
      .preInstall(function(wine, wizard) {
        wine.dotnet45();
    })
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
