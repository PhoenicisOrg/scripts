include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2013"]);

new LocalInstallerScript()
    .name("ElsterFormular")
    .editor("ELSTER")
    .applicationHomepage("https://www.elster.de/elfo_home.php")
    .browseMessage(tr("Please select the installation file.\nYou can download it from https://www.elster.de/elfo_down.php."))
    .author("Plata")
    .category("Office")
    .executable("pica.exe")
    .preInstall(function(wine/*, wizard*/) {
        wine.vcrun2013();
        wine.nativeApplication("pdf");
    })
    .go();
