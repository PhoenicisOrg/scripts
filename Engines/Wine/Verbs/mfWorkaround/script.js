const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp } = include("utils.functions.filesystem.files");
//const { getGithubReleases } = include("utils.functions.net.githubreleases"); commented out because it's useless until z0z0z will use releases

const Optional = Java.type("java.util.Optional");
const Regedit = include("engines.wine.plugins.regedit");
const Regsvr32 = include("engines.wine.plugins.regsvr32");
const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install Media Foundation workaround
 * see: https://github.com/z0z0z/mf-install
 */
class mfWorkaround {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Sets the used mfWorkaround version
     *
     * @param {string} mfWorkaroundVersion The version of mfWorkaround to downlaod
     * @returns {mfWorkaround} The mfWorkaround object
     */
    withVersion(mfWorkaroundVersion) {
        this.mfWorkaroundVersion = mfWorkaroundVersion;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const system64directory = this.wine.system64directory();

        //commented out because it's useless until z0z0z will use releases 
        /*if (typeof this.mfWorkaroundVersion !== "string") {
            const versions = getGithubReleases("Kron4ek", "FAudio-Builds", wizard);
            this.mfWorkaroundVersion = versions[0];
        }*/ 

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                `https://codeload.github.com/z0z0z/mf-install/zip/master`
            )
            .name(`mf-install-master.zip`)
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/mfWorkaround/`)
            .extract();

        const mfWorkaroundDir = `${prefixDirectory}/mfWorkaround/mf-install-master`;

        ls(`${mfWorkaroundDir}/syswow64`).forEach(file => {
            if (file.endsWith(".dll")) {
                cp(`${mfWorkaroundDir}/syswow64/${file}`, system32directory);

                new OverrideDLL(this.wine).withMode("native", [file]).go();
            }
        });

        if (this.wine.architecture() == "amd64") {
            ls(`${mfWorkaroundDir}/system32`).forEach(file => {
                if (file.endsWith(".dll")) {
                    cp(`${mfWorkaroundDir}/system32/${file}`, system64directory);

                    new OverrideDLL(this.wine).withMode("native", [file]).go();
                }
            });
        }
        const regeditFileContent = `REGEDIT4\n\n[HKEY_LOCAL_MACHINE\Software\Wine\LicenseInformation]\n"msmpeg2adec-AACDecoderV2AddInEnable"=dword:00000001\n"msmpeg2adec-AACDecoderV2InSKU"=dword:00000001\n"msmpeg2adec-DolbyDigitalDecoderV2AddInEnable"=dword:00000001\n"msmpeg2adec-DolbyDigitalDecoderV2InSKU"=dword:00000001\n"msmpeg2vdec-H264VideoDecoderV2AddInEnable"=dword:00000001\n"msmpeg2vdec-H264VideoDecoderV2InSKU"=dword:00000001\n"msmpeg2vdec-MPEG2VideoDecoderV2AddInEnable"=dword:00000001\n"msmpeg2vdec-MPEG2VideoDecoderV2InSKU"=dword:00000001\n\n[HKEY_CLASSES_ROOT\CLSID\{271C3902-6095-4c45-A22F-20091816EE9E}]\n@="MPEG4 Byte Stream Handler"\n\n[HKEY_CLASSES_ROOT\CLSID\{271C3902-6095-4c45-A22F-20091816EE9E}\InprocServer32]\n@="mf.dll"\n"ThreadingModel"="Both"\n\n[HKEY_CLASSES_ROOT\CLSID\{477EC299-1421-4bdd-971F-7CCB933F21AD}]\n@="File Scheme Handler"\n\n[HKEY_CLASSES_ROOT\CLSID\{477EC299-1421-4bdd-971F-7CCB933F21AD}\InprocServer32]\n@="mf.dll"\n"ThreadingModel"="Both"\n\n[HKEY_CLASSES_ROOT\CLSID\{48e2ed0f-98c2-4a37-bed5-166312ddd83f}]\n@="MFReadWrite Class Factory"\n\n[HKEY_CLASSES_ROOT\CLSID\{48e2ed0f-98c2-4a37-bed5-166312ddd83f}\InprocServer32]\n@="mfreadwrite.dll"\n"ThreadingModel"="Both"`;

        new Regedit(this.wine).patch(regeditFileContent);
        //command for regedit64 will go here once implemented

        new Regsvr32(this.wine).withDll("colorcnv.dll").go();
        new Regsvr32(this.wine).withDll("msmpeg2adec.dll").go();
        new Regsvr32(this.wine).withDll("msmpeg2vdec.dll").go();

        /**
         * commented out because we dont have regsvr64 yet
         * new Regsvr32(this.wine).withDll("colorcnv.dll").go();
         * new Regsvr32(this.wine).withDll("msmpeg2adec.dll").go();
         * new Regsvr32(this.wine).withDll("msmpeg2vdec.dll").go();
         * 
         */
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "mfWorkaround", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        //const versions = getGithubReleases("Kron4ek", "FAudio-Builds", wizard); commented out because it's useless until z0z0z will use releases

        //const selectedVersion = wizard.menu(tr("Please select the version."), versions, versions[0]); same as above

        // install
        new mfWorkaround(wine).go();

        wizard.close();
    }
}

module.default = mfWorkaround;
