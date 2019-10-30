const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

new LocalInstallerScript()
    .name("Resident Evil 3")
    .editor("Capcom")
    .applicationHomepage("http://www.residentevil.com/")
    .author("odziom91")
    .category("Games")
    .executable("ResidentEvil3.exe");
