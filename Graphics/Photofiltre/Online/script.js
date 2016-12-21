include(["Functions", "Engines", "Wine"]) 
include(["Functions", "Filesystem", "Download"])

var setupWizard = SetupWizard("Photofiltre")

Downloader()
	.wizard(setupWizard)
	.url("http://photofiltre.free.fr/utils/pf-setup-fr-652.exe")
	.checksum("dc965875d698cd3f528423846f837d0dcf39616d")
	.to("/tmp/test.exe")
	.get()