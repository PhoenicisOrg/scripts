include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

/**
* Inspired from d3dx9 verb, winetricks xact
* -> https://github.com/Winetricks/winetricks/blob/63bc6dbe612d017a0cb6bf6e4cde265162d75bca/src/winetricks#L9643
* @returns {Wine}
*/
Wine.prototype.xact = function () {
    var that = this;

    var extractXacttoSystemDirectory = function(progressBar, filesToExtract, destination, pattern, directory) {
        var numberOfExtractedFiles = 0;
        filesToExtract.forEach(function(cabFile) {
            print(tr("Extracting {0} ...", cabFile));
            progressBar.setText(tr("Extracting {0} ...", "Xact"));
            progressBar.setProgressPercentage(numberOfExtractedFiles * 100 / filesToExtract.length);

            new CabExtract()
                .archive(that.prefixDirectory + "/drive_c/"+ directory + cabFile)
                .to(destination)
                .extract(["-L", "-F", pattern]);

            numberOfExtractedFiles++;
        });
    };
    
    var regsvr32Xact = function(dllToRegsvr) {
        var numberOfExtractedFiles = 0;
        dllToRegsvr.forEach(function(dll) {
            print(tr("Registering {0} ...", dll));
            progressBar.setText(tr("Registering {0} ...", "Xact"));
            progressBar.setProgressPercentage(numberOfExtractedFiles * 100 / filesToExtract.length);

            that.regsvr32().install(dll);

            numberOfExtractedFiles++;
        });
    };

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/8/4/A/84A35BF1-DAFE-4AE8-82AF-AD2AE20B6B14/directx_Jun2010_redist.exe")
        .checksum("f8f1217f666bf2f6863631a7d5e5fb3a8d1542df")
        .name("directx_Jun2010_redist.exe")
        .get();

    var progressBar = this._wizard.progressBar(tr("Please wait ..."));
    progressBar.setText(tr("Extracting {0} ...", "Xact"));
    progressBar.setProgressPercentage(0.);

    //---------------------------------------------------------Extarct xactengine*.dll--------------------------------------------
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory + "/drive_c/xact_x86/")
        .extract(["-L", "-F", "*_xact_*x86*"]);

    var filesToExtract = [
        "apr2006_xact_x86.cab", "apr2007_xact_x86.cab", "aug2006_xact_x86.cab",
        "aug2007_xact_x86.cab", "aug2008_xact_x86.cab", "aug2009_xact_x86.cab",
        "dec2006_xact_x86.cab", "fev2006_xact_x86.cab", "fev2007_xact_x86.cab",
        "fev2010_xact_x86.cab", "jun2006_xact_x86.cab", "jun2007_xact_x86.cab",
        "jun2008_xact_x86.cab", "jun2010_xact_x86.cab", "mar2008_xact_x86.cab",
        "mar2009_xact_x86.cab", "nov2007_xact_x86.cab", "nov2008_xact_x86.cab",
        "oct2006_xact_x86.cab", 
    ];
    extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "xactengine*.dll", "xact_x86/");
    
    
    //---------------------------------------------------------Extarct X3Daudio*.dll----------------------------------------------
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory + "/drive_c/x3daudio_x86/")
        .extract(["-L", "-F", "*_x3daudio_*x86*"]);
    
    var filesToExtract = [
        "feb2010_x3daudio_x86.cab", "jun2008_x3daudio_x86.cab", "mar2008_x3daudio_x86.cab",
        "mar2009_x3daudio_x86.cab", "nov2007_x3daudio_x86.cab", "nov2008_x3daudio_x86.cab"
    ];
    extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "X3Daudio*.dll", "x3daudio_x86/");
     
     
    //---------------------------------------------------------Extarct XAudio*.dll and XAPOFX*.dll---------------------------------
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory + "/drive_c/xaudio_x86/")
        .extract(["-L", "-F", "*_xaudio_*x86*"]);
        
    var filesToExtract = [
        "aug2008_xaudio_x86.cab", "aug2009_xaudio_x86.cab", "feb2010_xaudio_x86.cab",
        "jun2008_xaudio_x86.cab", "jun2010_xaudio_x86.cab", "mar2008_xaudio_x86.cab",
        "mar2009_xaudio_x86.cab", "nov2008_xaudio_x86.cab"
    ];
    extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "XAudio*.dll", "xaudio_x86/");
    extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "XAPOFX*.dll", "xaudio_x86/");
    
    var xactToRegserv = [
        "xactengine2_1.dll", "xactengine2_2.dll", "xactengine2_3.dll", "xactengine2_4.dll",
        "xactengine2_5.dll", "xactengine2_7.dll", "xactengine2_8.dll", "xactengine2_9.dll",
        "xactengine2_10.dll", "xactengine3_0.dll", "xactengine3_1.dll", "xactengine3_2.dll",
        "xactengine3_3.dll", "xactengine3_4.dll", "xactengine3_5.dll", "xactengine3_7.dll"
    ];
    
    var xaudioToRegserv = [
        "xaudio2_0.dll", "xaudio2_1.dll", "xaudio2_2.dll",
        "xaudio2_3.dll", "xaudio2_4.dll", "xaudio2_5.dll",
        "xaudio2_6.dll", "xaudio2_7.dll", "xaudio2_9.dll"
    ];
    
    regsvr32Xact(xactToRegserv);
    regsvr32Xact(xaudioToRegserv);
    
    remove(this.prefixDirectory + "/drive_c/xact_x86/");
    remove(this.prefixDirectory + "/drive_c/x3daudio_x86/");
    remove(this.prefixDirectory + "/drive_c/xaudio_x86/");
    
    
    if (this.architecture() == "amd64") {
        //---------------------------------------------------------Extarct xactengine*.dll (x64)--------------------------------------------
        new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory + "/drive_c/xact_x64/")
            .extract(["-L", "-F", "*_xact_*x64*"]);

        var filesToExtract = [
            "apr2006_xact_x64.cab", "apr2007_xact_x64.cab", "aug2006_xact_x64.cab",
            "aug2007_xact_x64.cab", "aug2008_xact_x64.cab", "aug2009_xact_x64.cab",
            "dec2006_xact_x64.cab", "fev2006_xact_x64.cab", "fev2007_xact_x64.cab",
            "fev2010_xact_x64.cab", "jun2006_xact_x64.cab", "jun2007_xact_x64.cab",
            "jun2008_xact_x64.cab", "jun2010_xact_x64.cab", "mar2008_xact_x64.cab",
            "mar2009_xact_x64.cab", "nov2007_xact_x64.cab", "nov2008_xact_x64.cab",
            "oct2006_xact_x64.cab", 
        ];
        extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "xactengine*.dll", "xact_x86/");
        
        
        //---------------------------------------------------------Extarct X3Daudio*.dll (x64)----------------------------------------------
        new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory + "/drive_c/x3daudio_x64/")
            .extract(["-L", "-F", "*_x3daudio_*x64*"]);
        
        var filesToExtract = [
            "feb2010_x3daudio_x64.cab", "jun2008_x3daudio_x64.cab", "mar2008_x3daudio_x64.cab",
            "mar2009_x3daudio_x64.cab", "nov2007_x3daudio_x64.cab", "nov2008_x3daudio_x64.cab"
        ];
        extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "X3Daudio*.dll", "x3daudio_x86/");
        
        
        //---------------------------------------------------------Extarct XAudio*.dll and XAPOFX*.dll (x64)---------------------------------
        new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory + "/drive_c/xaudio_x64/")
            .extract(["-L", "-F", "*_xaudio_*64*"]);
            
        var filesToExtract = [
            "aug2008_xaudio_x64.cab", "aug2009_xaudio_x64.cab", "feb2010_xaudio_x64.cab",
            "jun2008_xaudio_x64.cab", "jun2010_xaudio_x64.cab", "mar2008_xaudio_x64.cab",
            "mar2009_xaudio_x64.cab", "nov2008_xaudio_x64.cab"
        ];
        extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "XAudio*.dll", "xaudio_x86/");
        extractXacttoSystemDirectory(progressBar, filesToExtract, that.system32directory(), "XAPOFX*.dll", "xaudio_x86/");
        
        remove(this.prefixDirectory + "/drive_c/xact_x64/");
        remove(this.prefixDirectory + "/drive_c/x3daudio_x64/");
        remove(this.prefixDirectory + "/drive_c/xaudio_x64/");
    
    }
    
    return this;

};
