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
///////////////////////////////////////////////////////////////////

new CustomInstallerScript()
    .name("League of Legends BETA Client")
    .editor("Riot Games")
    .applicationHomepage("http://leagueoflegends.com/")
    .author("Plata, feanor12")
    .installationCommand(function(wizard) {
        return {command: "msiexec", args: ["/i", "C://LoL_tmp/LoL.msi", "APPDIR=C:\\LoL"]};
    })
    .category("Games")
    .wineDistribution("staging")
    .wineVersion("2.0")
    .preInstall(function(wine, wizard) {
        // Select the region and download the setup file
        ////////////////////////////////////////////////
        var regions = ["EU West",
                       "Latin America North",
                       "Latin America South",
                       "Oceania",
                       "Japan",
                       "Turkey",
                       "Brasil",
                       "EU Nordic & East",
                       "North America",
                       "Russia"];
        var selectedRegion = wizard.menu("Select your region:", regions);
        var regionID, url, sha1;
        var baseUrl = "https://riotgamespatcher-a.akamaihd.net/ShellInstaller/";
        switch(selectedRegion.text){
            case "EU West":
                regionID = "EUW";
                url = baseUrl+"EUW/LeagueofLegends_EUW_Installer_2016_11_10.exe";
                sha1 = "cbbf9883a59d2dada87e6aa8cc4484b07ea797da";
                break;
            case "Latin America North":
                regionID = "LA1";
                url = baseUrl+"LA1/LeagueofLegends_LA1_Installer_2016_05_26.exe";
                sha1 = "3120d4a530bbc4c5978177ebf96260e87e3d31b8";
                break;
            case "Latin America South":
                regionID = "LA2";
                url = baseUrl+"LA2/LeagueofLegends_LA2_Installer_2016_05_27.exe";
                sha1 = "f9c77681dbe07e7b05d5534234973302c878552b";
                break;
            case "Oceania":
                regionID = "OC1";
                url = baseUrl+"OC1/LeagueofLegends_OC1_Installer_2016_05_13.exe";
                sha1 = "54d805e797a6ca9632cc83338cb67d5b904313f7";
                break;
            case "Japan":
                regionID = "JP";
                url = baseUrl+"JP/LeagueofLegends_JP_Installer_2016_05_31.exe";
                sha1 = "5773f1e71aaaef2f9f908c3e3aa2a7eaa40387a7";
                break;
            case "Turkey":
                regionID = "TR";
                url = baseUrl+"TR/LeagueofLegends_TR_Installer_2016_11_08.exe";
                sha1 = "1423ac48d1504b7c47d1acbf94e90f2c4a561d2d";
                break;
            case "Brasil":
                regionID = "BR";
                url = baseUrl+"BR/LeagueofLegends_BR_Installer_2016_05_13.exe";
                sha1 = "6ee06e6fee6f44989f5cc78e97a143efdc3569c8";
                break;
            case "EU Nordic & East":
                regionID = "EUNE";
                url = baseUrl+"EUNE/LeagueofLegends_EUNE_Installer_2016_11_10.exe";
                sha1 = "bc1b68fe2007a82fbbe0a3d6231988795875f2ff";
                break;
            case "North America":
                regionID = "NA";
                url = baseUrl+"NA/LeagueofLegends_NA_Installer_2016_05_13.exe";
                sha1 = "423a9760833c09f82b75d12ab7b73c7e8ae68cdb";
                break;
            case "Russia":
                regionID = "RU";
                url = baseUrl+"RU/LeagueofLegends_RU_Installer_2016_05_13.exe";
                sha1 = "c789127190217ee2dc922c105df74d9367e9a606";
                break;
        }
        var setupFile = new Resource()
            .wizard(wizard)
            .url(url)
            .checksum(sha1)
            .name(fileName(url))
            .get();
        
        mkdir(wine.prefixDirectory+"drive_c/LoL_tmp");
        mkdir(wine.prefixDirectory+"drive_c/LoL");
        
        // Create run script
        /////////////////////////////////////////
        var client = wine.prefixDirectory+"drive_c/LoL/run.bat";
        var batContent = "IF EXIST \"C:\\LoL\\LeagueClient.exe\" (\n"+
                         "start C:\\LoL\\LeagueClient.exe \n"+
                         ") ELSE ( start C:\\LoL\\lol.launcher.admin.exe )";
        writeToFile(client, batContent);  


        // Extract the msi file and create a link to it
        ///////////////////////////////////////////////
        wine.run(setupFile, ["/extract:C:\\LoL_tmp", "/exenoui"]).wait();
        var regionMSIPath = wine.prefixDirectory+"drive_c/LoL_tmp/LoL."+regionID+".msi";
        var linkPath = wine.prefixDirectory+"drive_c/LoL_tmp/LoL.msi";
        lns(regionMSIPath, linkPath);

        wine.d3dx9();
        wine.vcrun2015();
    })
    .postInstall(function(wine, wizard) {
        remove(wine.prefixDirectory+"drive_c/LoL_tmp");

        // Enable BETA
        //////////////
        var userConfPath = wine.prefixDirectory+"drive_c/LoL/RADS/system/user.cfg";
        writeToFile(userConfPath,"leagueClientOptIn = yes\nreplayPopUpShown = yes");
    })
    .executable("run.bat")
    .go();
