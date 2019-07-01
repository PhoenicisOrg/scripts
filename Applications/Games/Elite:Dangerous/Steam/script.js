include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.dotnet45");
include("engines.wine.verbs.vcrun2015");
include("engines.wine.verbs.dxvk");

new SteamScript()
    .name("Elite:Dangerous")
    .editor("Frontier Developments")
    .author("ImperatorS79")
    .wineArchitecture("amd64")
    .preInstall(function (wine /*, wizard*/) {
        wine.dotnet45();
        wine.corefonts();
        wine.vcrun2015();
        wine.DXVK();
    })
    .appId(359320);
