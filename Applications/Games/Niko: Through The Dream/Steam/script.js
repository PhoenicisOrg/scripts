include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.managed");
include("engines.wine.verbs.dotnet40");

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Niko: Through The Dream")
            .editor("Studio Paint")
            .author("Plata")
            .appId(296550)
            .postInstall(function (wine/*, wizard*/) {
                wine.dotnet40();
                wine.setManagedForApplication().set("NIKO.exe", false).do();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
