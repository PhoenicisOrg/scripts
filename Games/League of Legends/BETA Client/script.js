include(["Functions", "QuickScript", "CustomInstallerScript"]);
include(["Functions", "Verbs", "sandbox"]);
include(["Functions", "Verbs", "vcrun2015"]);

new CustomInstallerScript()
    .name("League of Legends BETA Client")
    .editor("Riot Games")
    .applicationHomepage("http://euw.leagueoflegends.com/")
    .author("Plata")
    .installationFile(function(wizard) {
        return {command: "msiexec", args: ["/i", "C://LoL/Lol.EUW.msi","APPDIR=C:\\LoL","/q"]};
    })
    .category("Games")
    .wineDistribution("staging")
    .wineVersion("2.0")
    .preInstall(function(wine, wizard) {
        wine.sandbox();

        var setupFile = new Resource()
            .wizard(wizard)
            .url("https://riotgamespatcher-a.akamaihd.net/ShellInstaller/EUW/LeagueofLegends_EUW_Installer_2016_11_10.exe")
            .checksum("cbbf9883a59d2dada87e6aa8cc4484b07ea797da")
            .name("LeagueofLegends_EUW_Installer_2016_11_10.exe")
            .get();

        mkdir(wine.prefixDirectory+"drive_c/LoL");
        wine.run(setupFile,["/extract:C:\\LoL","/exenoui"]).wait();

        wine.vcrun2015();
    })
    .executable("lol.launcher.admin.exe")
    .go();
