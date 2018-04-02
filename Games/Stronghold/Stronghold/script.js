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
		var setupResolution = selectedResolution.text;
		var resolutionParts = setupResolution.split("x");
		var x = resolutionParts[0];
		var y = resolutionParts[1];
		wine.setVirtualDesktop(x, y);
		setupWizard.close();
     	})	
	.go();