include(["Functions", "QuickScript", "LocalInstallerScript"]);

new LocalInstallerScript()
    .name("Resident Evil 3")				// name of the application
    .editor("Capcom")					// editor of the application
    .applicationHomepage("http://www.residentevil.com/")// application homepage
    .author("odziom91")					// author of this script (you)
    .category("Games")					// category
    .executable("ResidentEvil3.exe")			// exe name (for the shortcut)
    .go();