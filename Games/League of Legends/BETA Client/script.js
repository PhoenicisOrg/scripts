include(["Functions", "QuickScript", "CustomInstallerScript"]);
include(["Functions", "Shortcuts","Wine"]);
include(["Functions", "Verbs", "sandbox"]);
include(["Functions", "Verbs", "d3dx9"]);
include(["Functions", "Verbs", "vcrun2015"]);

new CustomInstallerScript()
    .name("League of Legends BETA Client")
    .editor("Riot Games")
    .applicationHomepage("http://euw.leagueoflegends.com/")
    .author("Plata,feanor12")
    .installationCommand(function(wizard) {
        return {command: "msiexec", args: ["/i", "C://LoL_tmp/Lol.EUW.msi","APPDIR=C:\\LoL","/q"]};
    })
    .category("Games")
    .wineDistribution("staging")
    .wineVersion("2.0")
    .preInstall(function(wine, wizard) {
        var setupFile = new Resource()
            .wizard(wizard)
            .url("https://riotgamespatcher-a.akamaihd.net/ShellInstaller/EUW/LeagueofLegends_EUW_Installer_2016_11_10.exe")
            .checksum("cbbf9883a59d2dada87e6aa8cc4484b07ea797da")
            .name("LeagueofLegends_EUW_Installer_2016_11_10.exe")
            .get();

        mkdir(wine.prefixDirectory+"drive_c/LoL_tmp");
        mkdir(wine.prefixDirectory+"drive_c/LoL");
        var launcher = wine.prefixDirectory+"drive_c/LoL/lol.launcher.admin.exe"
        var client = wine.prefixDirectory+"drive_c/LoL/LeagueClient.exe"
        lns(launcher,client)           
        new WineShortcut()
            .name("Beta Client")
            .prefix("League of Legends BETA Client")
            .search("LeagueClient.exe")
            .create();

        wine.run(setupFile,["/extract:C:\\LoL_tmp","/exenoui"]).wait();

        wine.d3dx9();
        wine.vcrun2015();
    })
    .postInstall(function(wine,wizard) {
        remove(wine.prefixDirectory+"drive_c/LoL_tmp")
        remove(wine.prefixDirectory+"drive_c/LoL/LeagueClient.exe")
    })
    .executable("lol.launcher.admin.exe")
    .go();
