include(["Functions", "Net", "Download"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Shortcuts", "Wine"]);

var setupWizard = SetupWizard("Crayon Physics");

setupWizard.presentation("Crayon Physics", "Kloonigames", "http://www.kloonigames.com", "Quentin PÂRIS");

var wine = new Wine()
    .wizard(setupWizard)
    .version(LATEST_STABLE_VERSION)
    .prefix("CrayonPhysics")
    .distribution("upstream")
    .architecture("x86")
    .create()
    .wait();

new Downloader()
    .wizard(setupWizard)
    .url("http://www.kloonigames.com/download/crayon.zip")
    .checksum("4561230bb4a6c7cd1188884a01f2adbf733c5233")
    .to(wine.prefixDirectory + "/drive_c/crayon.zip")
    .get();

new Extractor()
    .wizard(setupWizard)
    .archive(wine.prefixDirectory + "/drive_c/crayon.zip")
    .to(wine.prefixDirectory + "/drive_c/crayon/")
    .extract();

new WineShortcut()
    .name("Crayon Physics")
    .prefix("CrayonPhysics")
    .search("crayon.exe")
    .miniature(["Games", "Crayon Physics"])
    .create();

setupWizard.close();