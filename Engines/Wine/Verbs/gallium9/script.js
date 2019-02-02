include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install Gallium 9 Standalone
* see: https://github.com/dhewg/nine/
* @returns {Wine} Wine object
*/
Wine.prototype.gallium9 = function () {
    var message = "Using Gallium 9 requires to have a driver supporting the Gallium 9 state tracker, as well as d3dapater9.so installed (ex: libd3d9adapter-mesa package). Please be sure there are installed.";

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url()
        .name("gallium9-0.1.tar.gz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/TMP/")
        .extract();

    cp(this.prefixDirectory() + "/TMP/nine/lib32/d3d9-nine.dll.so", this.system32directory());
    cp(this.prefixDirectory() + "/TMP/nine/bin32/ninewinecfg.exe.so", this.system32directory());

    lns(this.system32directory() + "/d3d9-nine.dll.so", this.system32directory() + "/d3d9-nine.dll");
    lns(this.system32directory() + "/ninewinecfg.exe.so", this.system32directory() + "/ninewinecfg.exe");

    if (this.architecture() == "amd64") {
        cp(this.prefixDirectory() + "/TMP/nine/lib64/d3d9-nine.dll.so", this.system64directory());
	cp(this.prefixDirectory() + "/TMP/nine/bin64/ninewinecfg.exe.so", this.system64directory());
	    
        lns(this.system64directory() + "/d3d9-nine.dll.so", this.system64directory() + "/d3d9-nine.dll");
        lns(this.system64directory() + "/ninewinecfg.exe.so", this.system64directory() + "/ninewinecfg.exe");
	    
	this.run(this.system64directory() + "ninewinecfg.exe", "-e"); //normally wine 64
    }
    else {
        this.run(this.system32directory() + "ninewinecfg.exe", "-e");
    }

    return this;
}

/**
 * Verb to install Gallium 9 Standalone
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        wine.wizard(wizard);
        wine.gallium9();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
