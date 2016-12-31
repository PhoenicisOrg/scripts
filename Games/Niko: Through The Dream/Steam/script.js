include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Niko: Through The Dream")
    .editor("Studio Paint")
    .author("Plata")
    .appId(296550)
    .postInstall(function(wine) {
        wine.dotnet40();
        wine.setManaged(false);
    })
    .go();
