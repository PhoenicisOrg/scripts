include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

new SteamScript()
    .name("The Witcher 3: Wild Hunt")
    .editor("CD Projekt Red")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    //it would be better with dark ground fix -> https://bugs.winehq.org/attachment.cgi?id=58842&action=diff&context=patch&collapsed=&headers=1&format=raw
    .wineArchitecture("amd64")
    .appId(292030)
    .preInstall(function(wine, wizard) {
        //Ensure Directx11 full features will work, and CSMT for performance
        wine.setVersionGL(4,5);
        wine.enableCSMT();
        wine.UseGLSL("enabled");
        wine.DirectDrawRenderer("opengl");
    })
    .go(); 
