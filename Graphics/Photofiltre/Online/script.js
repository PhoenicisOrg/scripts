include(["Functions", "Net", "Download"])
include(["Functions", "Engines", "Wine"]) 

var setupWizard = SetupWizard("Photofiltre")
    
setupWizard.presentation("Photofiltre", "Antonio Da Cruz", "http://photofiltre.free.fr", "Quentin PÂRIS");

Downloader()
	.wizard(setupWizard)
	.url("http://photofiltre.free.fr/utils/pf-setup-fr-652.exe")
	.checksum("dc965875d698cd3f528423846f837d0dcf39616d")
	.to("/tmp/test.exe")
	.get()
	
Wine()
	.wizard(setupWizard)
	.prefix("photofiltre")
	.version("1.7.12")
	.create()
	.run("/tmp/test.exe")