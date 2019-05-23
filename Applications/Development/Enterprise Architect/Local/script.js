include("engines.wine.quick_script.local_installer_script");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("Enterprise Architect")
            .editor("Sparx Systems Pty Ltd.")
            .applicationHomepage("https://sparxsystems.com/products/ea/index.html")
            .author("Plata")
            .category("Development")
            .executable("EA.exe")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
