const Wine = include("engines.wine.engine.object");
const {createTempFile, writeToFile} = include("utils.functions.filesystem.files");

/**
 * Regedit support
 * @returns {Wine} Wine object
 */
Wine.prototype.regedit = function () {
    var _wine = this;

    this.open = function (args) {
        _wine.run("regedit", [args], this.prefixDirectory(), false, true);
        return _wine;
    };

    this.patch = function (patchContent) {
        if (typeof patchContent.getClass !== "undefined" && patchContent.getClass().getCanonicalName() == "byte[]") {
            var StringClass = Java.type('java.lang.String');
            patchContent = new StringClass(patchContent);
        }
        var tmpFile = createTempFile("reg");
        writeToFile(tmpFile, patchContent);
        _wine.run("regedit", [tmpFile], this.prefixDirectory(), false, true);
        return _wine;
    };

    this.deleteKey = function (keyPath) {
        _wine.run("reg", ["delete", keyPath, "/f"], this.prefixDirectory(), false, true);
        return _wine;
    };

    this.deleteValue = function (keyPath, value) {
        _wine.run("reg", ["delete", keyPath, "/v", value, "/f"], this.prefixDirectory(), false, true);
        return _wine;
    };

    this.fetchValue = function (keyPath) {
        var root = keyPath[0];
        var registryFile;
        switch (root) {
            case "HKEY_CURRENT_USER":
                registryFile = "user.reg";
                break;
            case "HKEY_LOCAL_MACHINE":
                registryFile = "system.reg";
                break;
            default:
                throw "Illegal registry root exception";
        }

        keyPath.shift();

        // ensure that correct type is passed to Java
        var ArrayListClass = Java.type('java.util.ArrayList');
        var keyPathList = new ArrayListClass();
        for (var level in keyPath) {
            keyPathList.add(keyPath[level]);
        }

        var FileClass = Java.type('java.io.File');
        var registryValue = Bean("registryParser").parseFile(new FileClass(this.prefixDirectory() + "/" + registryFile), root).getChild(keyPathList);

        if (registryValue == null) {
            return null;
        }

        if (registryValue.getText) {
            return registryValue.getText();
        } else {
            return registryValue;
        }
    };

    return this;
};

Wine.prototype.registry = Wine.prototype.regedit;
