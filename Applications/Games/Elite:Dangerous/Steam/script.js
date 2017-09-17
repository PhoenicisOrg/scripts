include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);
include(["Engines", "Wine", "Verbs", "dotnet452"]);
include(["Engines", "Wine", "Verbs", "vcrun2012"]);
include(["Engines", "Wine", "Verbs", "quartz"]);

new SteamScript()
    .name("Elite:Dangerous")             
    .editor("Frontier Developments")     
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .preInstall(function(wine, wizard) {
        wine.dotnet452();
        wine.corefonts();
        wine.quartz();
        wine.vcrun2012();
        wine.windowsVersion("win7");
        wine.enableCSMT();
    })
    .appId(359320)               
    .go(); 
