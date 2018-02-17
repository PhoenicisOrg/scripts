include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2013"]);
include(["Engines", "Wine", "Verbs", "vcrun2008"]);
include(["Engines", "Wine", "Verbs", "d3dx9_42"]);
include(["Engines", "Wine", "Verbs", "xact"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new SteamScript()
    .name("Subnautica")
    .editor("Unknown Worlds")
    .author("Zemogiter")
    .applicationHomepage("https://unknownworlds.com/subnautica/")
    .wineDistribution("upstream")
    .wineVersion(3.1)
    .wineArchitecture("amd64")
    .category("Games")
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("win7");
        wine.vcrun2013();
        wine.corefonts();
	wine.vcrun2008();
	wine.d3dx9_42();
	wine.xact();
})
    this.overrideDLL()
    .set("native,builtin", ["atl120", "d3dx9_42", "msvcr120", "msvcp120", "mvsvr90", "vcomp120"])
    .set("disabled", ["dwrite", "gameoverlayrenderer"])
    .do();
    .appId(264710)
    .executable("Steam.exe", ["-silent", "-applaunch", 264710, "-no-ces-sandbox"]) 
.go();
.print("Debug output");
