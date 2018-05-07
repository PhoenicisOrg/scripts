include(["engines", "wine", "quick_script", "online_installer_script"]);
include(["engines", "wine", "verbs", "vcrun2012"]);
include(["engines", "wine", "verbs", "d3dx9"]);

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("DC Universe Online")
            .editor("Sony Entertainment")
            .applicationHomepage("http://www.dcuniverseonline.com/")
            .author("Zemoscripter")
            .url("https://launch.daybreakgames.com/installer/DCUO_setup.exe")
            .category("Games")
            .executable("LaunchPad.exe")
            .preInstall(function (wine/*, wizard*/) {
                wine.vcrun2012();
                wine.d3dx9();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
