include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* All the necessary things to run winevulkan (even inside wine mainline or newest wine-staging)
* -> https://github.com/roderickc/wine-vulkan
* @returns {Wine} Wine object
*/
Wine.prototype.vulkanSDK = function () {
    print("NOTE: you need a graphic driver that supports Vulkan to run winevulkan");
    print("NOTE: Vulkan works in wine from version 3.3 (if compiled with vulkan support)");

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://sdk.lunarg.com/sdk/download/latest/windows/vulkan-sdk.exe?u=")
        //checksum changes everytime a new version is released
        .name("vulkan-sdk.exe")
        .get();

    this.run(setupFile, "/S");

    var patchVulkanJSON = this.prefixDirectory() + "drive_c/windows/winevulkan.json";
    touch(patchVulkanJSON);
    writeToFile(patchVulkanJSON, "{\n	\"file_format_version\": \"1.0.0\",\n	\"ICD\": {\n		\"library_path\": \"c:\windows\system32\winevulkan.dll\",\n		\"api_version\": \"1.1.92.1\"\n	}\n}");
    this.run("reg", ["add", "HKLM\Software\Khronos\Vulkan\Drivers", "/v", "C:\Windows\winevulkan.json", "/t", "REG_DWORD", "/d", "00000000", "/f"], null, false, true);

    if (this.architecture() == "amd64") {
        this.run("reg", ["add", "HKLM\Software\Wow6432Node\Khronos\Vulkan\Drivers", "/v", "C:\Windows\winevulkan.json", "/t", "REG_DWORD", "/d", "00000000", "/f"], null, false, true);
    }

    return this;

}

/**
 * Verb to install all the necessary things to run winevulkan (even inside wine mainline or newest wine-staging)
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vulkanSDK", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vulkanSDK();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
