include(["Functions", "Engines", "Wine"]) 
include(["Functions", "Filesystem", "Download"])

var setupWizard = SetupWizard("Photofiltre")

Downloader().wizard(setupWizard).url("http://photofiltre.free.fr/utils/pf-setup-fr-652.exe").to("/tmp/test.exe").get()