include(["Functions", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Icy Tower 1.5")						// name of the application
    .editor("Johan Peitz (Free Lunch Design)")				// editor of the application
    .applicationHomepage("http://www.icytower.cz/")			// application homepage
    .author("odziom91")							// author of this script (you)
    .url("http://www.icytower.cz/download/icytower15_install.exe")	// where the exe can be downloaded
    .category("Games")							// category
    .executable("icytower15.exe")					// exe name (for the shortcut)
    .go();