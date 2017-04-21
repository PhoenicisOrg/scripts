include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    	.name("Stronghold HD")
    	.editor("FireFly Studios")
    	.author("odziom91")
	.appId(40950)
	.postInstall(function(wine, wizard) {
		var resolutionModes = [
	    	'800x600',
		'1024x768',
		'1280x720',
		'1280x1024',
		'1366x768',
		'1920x1080'
		];
		var setupWizard = SetupWizard("Stronghold HD");
		var selectedResolution = setupWizard.menu('Choose Virtual Desktop resolution:', resolutionModes);
		var setupResolution = resolutionModes[selectedResolution.index];
		switch (setupResolution) {
		case "800x600":
			wine.setVirtualDesktop(800, 600);
			break;
		case "1024x768":
			wine.setVirtualDesktop(1024, 768);
			break;
		case "1280x720":
			wine.setVirtualDesktop(1280, 720);
			break;
		case "1280x1024":
			wine.setVirtualDesktop(1280, 1024);
			break;
		case "1366x768":
			wine.setVirtualDesktop(1366, 768);
			break;
		case "1920x1080":
			wine.setVirtualDesktop(1920, 1080);
			break;
		}
		setupWizard.close();
     	})	
	.go();