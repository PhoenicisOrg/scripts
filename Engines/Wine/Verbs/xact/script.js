const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const Regsvr32 = include("engines.wine.plugins.regsvr32");

/**
 * Verb to install xact
 */
class Xact {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Extracts a given list of files
     *
     * @param {*} progressBar The progress bar
     * @param {*} filesToExtract A list of files to extract
     * @param {*} destination The destination directory
     * @param {*} pattern The file pattern
     * @param {*} directory The directory where the files are located
     * @returns {void}
     */
    extractFiles(progressBar, filesToExtract, destination, pattern, directory) {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();

        // extract the cab files
        filesToExtract.reduce((numberOfExtractedFiles, cabFile) => {
            print(tr("Extracting {0}...", cabFile));

            progressBar.setText(tr("Extracting {0}...", cabFile));
            progressBar.setProgressPercentage((numberOfExtractedFiles * 100) / filesToExtract.length);

            new CabExtract()
                .wizard(wizard)
                .archive(`${prefixDirectory}/drive_c/${directory}/${cabFile}`)
                .to(destination)
                .extract(["-L", "-F", pattern]);

            return numberOfExtractedFiles + 1;
        }, 0);
    }

    /**
     * Executes regsvr32 on the dlls present in dllToRegsvr
     *
     * @param {*} progressBar The progressbar
     * @param {*} dllToRegsvr The dll files
     * @returns {void}
     */
    regsvr32Xact(progressBar, dllToRegsvr) {
        dllToRegsvr.reduce((numberOfExtractedFiles, dll) => {
            print(tr("Registering {0}...", dll));

            progressBar.setText(tr("Registering {0}...", "Xact"));
            progressBar.setProgressPercentage((numberOfExtractedFiles * 100) / dllToRegsvr.length);

            new Regsvr32(this.wine).withDll(dll).go();

            return numberOfExtractedFiles + 1;
        }, 0);
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const architecture = this.wine.architecture();

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "http://download.microsoft.com/download/8/4/A/84A35BF1-DAFE-4AE8-82AF-AD2AE20B6B14/directx_Jun2010_redist.exe"
            )
            .checksum("7e5d2e5e1a13fbc47f990cc55cbdb428cd12f759")
            .name("directx_Jun2010_redist.exe")
            .get();

        const progressBar = wizard.progressBar(tr("Please wait..."));
        progressBar.setText(tr("Extracting {0}...", "Xact"));
        progressBar.setProgressPercentage(0);

        let filesToExtract = [];

        //---------------------------------------------------------Extract xactengine*.dll--------------------------------------------
        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/drive_c/xact_x86/`)
            .extract(["-L", "-F", "*_xact_*x86*"]);

        filesToExtract = [
            "apr2006_xact_x86.cab",
            "apr2007_xact_x86.cab",
            "aug2006_xact_x86.cab",
            "aug2007_xact_x86.cab",
            "aug2008_xact_x86.cab",
            "aug2009_xact_x86.cab",
            "dec2006_xact_x86.cab",
            "fev2006_xact_x86.cab",
            "fev2007_xact_x86.cab",
            "fev2010_xact_x86.cab",
            "jun2006_xact_x86.cab",
            "jun2007_xact_x86.cab",
            "jun2008_xact_x86.cab",
            "jun2010_xact_x86.cab",
            "mar2008_xact_x86.cab",
            "mar2009_xact_x86.cab",
            "nov2007_xact_x86.cab",
            "nov2008_xact_x86.cab",
            "oct2006_xact_x86.cab"
        ];

        this.extractFiles(progressBar, filesToExtract, system32directory, "xactengine*.dll", "xact_x86");

        //---------------------------------------------------------Extract X3Daudio*.dll----------------------------------------------
        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/drive_c/x3daudio_x86/`)
            .extract(["-L", "-F", "*_x3daudio_*x86*"]);

        filesToExtract = [
            "feb2010_x3daudio_x86.cab",
            "jun2008_x3daudio_x86.cab",
            "mar2008_x3daudio_x86.cab",
            "mar2009_x3daudio_x86.cab",
            "nov2007_x3daudio_x86.cab",
            "nov2008_x3daudio_x86.cab"
        ];

        this.extractFiles(progressBar, filesToExtract, system32directory, "X3Daudio*.dll", "x3daudio_x86");

        //---------------------------------------------------------Extract XAudio*.dll and XAPOFX*.dll---------------------------------
        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/drive_c/xaudio_x86/`)
            .extract(["-L", "-F", "*_xaudio_*x86*"]);

        filesToExtract = [
            "aug2008_xaudio_x86.cab",
            "aug2009_xaudio_x86.cab",
            "feb2010_xaudio_x86.cab",
            "jun2008_xaudio_x86.cab",
            "jun2010_xaudio_x86.cab",
            "mar2008_xaudio_x86.cab",
            "mar2009_xaudio_x86.cab",
            "nov2008_xaudio_x86.cab"
        ];

        this.extractFiles(progressBar, filesToExtract, system32directory, "XAudio*.dll", "xaudio_x86");
        this.extractFiles(progressBar, filesToExtract, system32directory, "XAPOFX*.dll", "xaudio_x86");

        const xactToRegserv = [
            "xactengine2_1.dll",
            "xactengine2_2.dll",
            "xactengine2_3.dll",
            "xactengine2_4.dll",
            "xactengine2_5.dll",
            "xactengine2_7.dll",
            "xactengine2_8.dll",
            "xactengine2_9.dll",
            "xactengine2_10.dll",
            "xactengine3_0.dll",
            "xactengine3_1.dll",
            "xactengine3_2.dll",
            "xactengine3_3.dll",
            "xactengine3_4.dll",
            "xactengine3_5.dll",
            "xactengine3_7.dll"
        ];

        const xaudioToRegserv = [
            "xaudio2_0.dll",
            "xaudio2_1.dll",
            "xaudio2_2.dll",
            "xaudio2_3.dll",
            "xaudio2_4.dll",
            "xaudio2_5.dll",
            "xaudio2_6.dll",
            "xaudio2_7.dll",
            "xaudio2_9.dll"
        ];

        this.regsvr32Xact(progressBar, xactToRegserv);
        this.regsvr32Xact(progressBar, xaudioToRegserv);

        remove(`${prefixDirectory}/drive_c/xact_x86/`);
        remove(`${prefixDirectory}/drive_c/x3daudio_x86/`);
        remove(`${prefixDirectory}/drive_c/xaudio_x86/`);

        if (architecture == "amd64") {
            const system64directory = this.wine.system64directory();

            //---------------------------------------------------------Extract xactengine*.dll (x64)--------------------------------------------
            new CabExtract()
                .wizard(wizard)
                .archive(setupFile)
                .to(`${prefixDirectory}/drive_c/xact_x64/`)
                .extract(["-L", "-F", "*_xact_*x64*"]);

            filesToExtract = [
                "apr2006_xact_x64.cab",
                "apr2007_xact_x64.cab",
                "aug2006_xact_x64.cab",
                "aug2007_xact_x64.cab",
                "aug2008_xact_x64.cab",
                "aug2009_xact_x64.cab",
                "dec2006_xact_x64.cab",
                "fev2006_xact_x64.cab",
                "fev2007_xact_x64.cab",
                "fev2010_xact_x64.cab",
                "jun2006_xact_x64.cab",
                "jun2007_xact_x64.cab",
                "jun2008_xact_x64.cab",
                "jun2010_xact_x64.cab",
                "mar2008_xact_x64.cab",
                "mar2009_xact_x64.cab",
                "nov2007_xact_x64.cab",
                "nov2008_xact_x64.cab",
                "oct2006_xact_x64.cab"
            ];

            this.extractFiles(progressBar, filesToExtract, system64directory, "xactengine*.dll", "xact_x64");

            //---------------------------------------------------------Extract X3Daudio*.dll (x64)----------------------------------------------
            new CabExtract()
                .wizard(wizard)
                .archive(setupFile)
                .to(`${prefixDirectory}/drive_c/x3daudio_x64/`)
                .extract(["-L", "-F", "*_x3daudio_*x64*"]);

            filesToExtract = [
                "feb2010_x3daudio_x64.cab",
                "jun2008_x3daudio_x64.cab",
                "mar2008_x3daudio_x64.cab",
                "mar2009_x3daudio_x64.cab",
                "nov2007_x3daudio_x64.cab",
                "nov2008_x3daudio_x64.cab"
            ];

            this.extractFiles(progressBar, filesToExtract, system64directory, "X3Daudio*.dll", "x3daudio_x64");

            //---------------------------------------------------------Extract XAudio*.dll and XAPOFX*.dll (x64)---------------------------------
            new CabExtract()
                .wizard(wizard)
                .archive(setupFile)
                .to(`${prefixDirectory}/drive_c/xaudio_x64/`)
                .extract(["-L", "-F", "*_xaudio_*64*"]);

            filesToExtract = [
                "aug2008_xaudio_x64.cab",
                "aug2009_xaudio_x64.cab",
                "feb2010_xaudio_x64.cab",
                "jun2008_xaudio_x64.cab",
                "jun2010_xaudio_x64.cab",
                "mar2008_xaudio_x64.cab",
                "mar2009_xaudio_x64.cab",
                "nov2008_xaudio_x64.cab"
            ];

            this.extractFiles(progressBar, filesToExtract, system64directory, "XAudio*.dll", "xaudio_x64");
            this.extractFiles(progressBar, filesToExtract, system64directory, "XAPOFX*.dll", "xaudio_x64");

            remove(`${prefixDirectory}/drive_c/xact_x64/`);
            remove(`${prefixDirectory}/drive_c/x3daudio_x64/`);
            remove(`${prefixDirectory}/drive_c/xaudio_x64/`);
        }
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "xact", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Xact(wine).go();

        wizard.close();
    }
}

module.default = Xact;
