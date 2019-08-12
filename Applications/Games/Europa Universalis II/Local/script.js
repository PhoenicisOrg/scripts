const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

new LocalInstallerScript()
    .name("Europa Universalis II")
    .editor("Ubisoft")
    .author("ImperatorS79")
    .category("Games")
    .executable("eu2.exe");
//TO DO : find static link to 1.07 and 1.09 update, and add a .postinstall.
