/// TODO
// Download keg
// Patch keg using diff
/// keg might fail multiple times during the download -> restart the keg if fails
/// check that end-user has 80GB of free space and output HUGE WARNING!
// Download OSX Hearthstone
// run keg with `ngdp fetch-all && ngdp inspect hsb && ngdp install hsb 30103 --tags OSX --tags enGB --tags Production ./`
// Do some additional changes if neccesary

include("engines.wine.quick_script.custom_installer_script");

var installerImplementation = {
    run: function () {
        new CustomInstallerScript()
            .name("Hearthstone")
            .editor("FOSSzard Entertainment")
            .applicationHomepage("http://www.fosszard.com")
            .author("KREYREN")
            .installationCommand(function(wizard) {                             // function specifying the installation command
                return {command: "msiexec", args: ["/i", "C://app.msi"]};
            })
            .category("Games")
            .executable("Application.exe")
            .go();
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
