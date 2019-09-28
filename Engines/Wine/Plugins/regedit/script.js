const { createTempFile, writeToFile } = include("utils.functions.filesystem.files");

const StringClass = Java.type("java.lang.String");
const FileClass = Java.type("java.io.File");
const ArrayListClass = Java.type("java.util.ArrayList");

/**
 * Plugin to provide Regedit support
 */
module.default = class Regedit {
    constructor(wine) {
        this.wine = wine;
    }

    convertPatchContent(patchContent, contentType) {
        if (contentType && contentType === "binary") {
            return patchContent.map(byte => String.fromCharCode(byte)).join("");
        } else {
            return patchContent;
        }
    }

    fetchRegistryFile(root) {
        switch (root) {
            case "HKEY_CURRENT_USER":
                return "user.reg";
            case "HKEY_LOCAL_MACHINE":
                return "system.reg";
            default:
                throw new Error("Illegal registry root exception");
        }
    }

    open(args) {
        this.wine.run("regedit", [args], this.wine.prefixDirectory(), false, true);

        return this;
    }

    patch(patchContent, contentType) {
        const content = this.convertPatchContent(patchContent, contentType);
        const tmpFile = createTempFile("reg");

        writeToFile(tmpFile, content);

        this.wine.run("regedit", [tmpFile], this.wine.prefixDirectory(), false, true);

        return this;
    }

    deleteKey(keyPath) {
        this.wine.run("reg", ["delete", keyPath, "/f"], this.wine.prefixDirectory(), false, true);

        return this;
    }

    deleteValue(keyPath, value) {
        this.wine.run("reg", ["delete", keyPath, "/v", value, "/f"], this.wine.prefixDirectory(), false, true);

        return this;
    }

    fetchValue(keyPath) {
        const root = keyPath.shift();

        const registryFile = this.fetchRegistryFile(root);

        // ensure that correct type is passed to Java
        const keyPathList = new ArrayListClass();
        for (const level in keyPath) {
            keyPathList.add(keyPath[level]);
        }

        const registryValue = Bean("registryParser")
            .parseFile(new FileClass(this.wine.prefixDirectory() + "/" + registryFile), root)
            .getChild(keyPathList);

        if (registryValue == null) {
            return null;
        }

        if (registryValue.getText) {
            return registryValue.getText();
        } else {
            return registryValue;
        }
    }
};
