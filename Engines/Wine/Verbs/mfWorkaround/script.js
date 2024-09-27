const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { Extractor } = include("utils.functions.filesystem.extract");
const { ls, cp } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");
const Regedit = include("engines.wine.plugins.regedit");
const Regsvr32 = include("engines.wine.plugins.regsvr32");
const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install Media Foundation workaround
 * see: https://github.com/z0z0z/mf-install
 */
class MFWorkaround {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        // TODO: use GitHub releases if repository provides releases
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const system64directory = this.wine.system64directory();

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

        const regeditFile = `${prefixDirectory}/mfWorkaround/mf-install-master/mf.reg`;
        new Regedit(this.wine).patch(regeditFile);
        const regeditFile2 = `${prefixDirectory}/mfWorkaround/mf-install-master/wmf.reg`;
        new Regedit(this.wine).patch(regeditFile2);
        //command for regedit64 will go here once implemented

        new Regsvr32(this.wine).withDll("colorcnv.dll").go();
        new Regsvr32(this.wine).withDll("msmpeg2adec.dll").go();
        new Regsvr32(this.wine).withDll("msmpeg2vdec.dll").go();

        /**
         * commented out because we dont have regsvr64 yet
         * new Regsvr64(this.wine).withDll("colorcnv.dll").go();
         * new Regsvr64(this.wine).withDll("msmpeg2adec.dll").go();
         * new Regsvr64(this.wine).withDll("msmpeg2vdec.dll").go();
         */
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "mfWorkaround", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        // install
        new MFWorkaround(wine).go();

        wizard.close();
    }
}

module.default = MFWorkaround;
