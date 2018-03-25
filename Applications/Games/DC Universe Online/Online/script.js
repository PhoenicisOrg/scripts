include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2012"]);
include(["Engines", "Wine", "Verbs", "d3dx9"]);

new OnlineInstallerScript()
    .name("DC Universe Online")
    .editor("Sony Entertainment")
    .applicationHomepage("http://www.dcuniverseonline.com/")
    .author("Zemoscripter")
    .url("https://launch.daybreakgames.com/installer/DCUO_setup.exe")
    .category("Games")
    .executable("LaunchPad.exe")
    .preInstall(function(wine/*, wizard*/) {
	wine.vcrun2012();
	wine.d3dx9();
    })
.go();
