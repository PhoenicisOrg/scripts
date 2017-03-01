include(["Functions", "QuickScript", "CustomInstallerScript"]);
include(["Functions", "Shortcuts","Wine"]);
include(["Functions", "Verbs", "sandbox"]);
include(["Functions", "Verbs", "d3dx9"]);
include(["Functions", "Verbs", "vcrun2015"]);

// Installs League of Legends and creates two shortcuts.
//
// One shortcut called League of Legends which starts the launcher
// and one shortcut called BETA Client which starts the BETA client
//
// Important: 
// The BETA-Client has to be installed using the launcher.
// After the upgrade the BETA Client will do the game patching.

new CustomInstallerScript()
    .name("League of Legends BETA Client")
    .editor("Riot Games")
    .applicationHomepage("http://euw.leagueoflegends.com/")
    .author("Plata, feanor12")
    .installationCommand(function(wizard) {
        return {command: "msiexec", args: ["/i", "C://LoL_tmp/Lol.EUW.msi","APPDIR=C:\\LoL","/q"]};
    })
    .category("Games")
    .wineDistribution("staging")
    .wineVersion("2.0")
    .preInstall(function(wine, wizard) {
        //Download the setup file
        var setupFile = new Resource()
            .wizard(wizard)
            .url("https://riotgamespatcher-a.akamaihd.net/ShellInstaller/EUW/LeagueofLegends_EUW_Installer_2016_11_10.exe")
            .checksum("cbbf9883a59d2dada87e6aa8cc4484b07ea797da")
            .name("LeagueofLegends_EUW_Installer_2016_11_10.exe")
            .get();
        //Create the temporary directory
        mkdir(wine.prefixDirectory+"drive_c/LoL_tmp");
        //Create the installation directory
        mkdir(wine.prefixDirectory+"drive_c/LoL");
        //Create the early LeagueClient.exe for shortcut-creation
        var launcher = wine.prefixDirectory+"drive_c/LoL/lol.launcher.admin.exe"
        var client = wine.prefixDirectory+"drive_c/LoL/LeagueClient.exe"
        lns(launcher,client)  
        //Create the shortcut for the beta client
        new WineShortcut()
            .name("BETA Client")
            .prefix("League of Legends BETA Client")
            .search("LeagueClient.exe")
            .create();
        //Extract the Lol.EUW.msi file
        wine.run(setupFile,["/extract:C:\\LoL_tmp","/exenoui"]).wait();
        //Install DLLs
        wine.d3dx9();
        wine.vcrun2015();
    })
    .postInstall(function(wine,wizard) {
        //Remove the temporary directory
        remove(wine.prefixDirectory+"drive_c/LoL_tmp")
        //Remove the fake BETA Client, because it wont update otherwise
        remove(wine.prefixDirectory+"drive_c/LoL/LeagueClient.exe")
    })
    .executable("lol.launcher.admin.exe")
    .go();
