
include("engines.wine.engine.object");
include("engines.wine.plugins.regedit");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
 * All the necessary things to run winevulkan (even inside wine mainline or newest wine-staging)
 * see: https://github.com/roderickc/wine-vulkan
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vulkanSDK = function () {
    print("NOTE: you need a graphic driver that supports Vulkan to run winevulkan");
    print("NOTE: Vulkan works in wine from version 3.3 (if compiled with vulkan support)");

    var sdkVersion = "1.1.97.0";

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://sdk.lunarg.com/sdk/download/" + sdkVersion + "/windows/VulkanSDK-" + sdkVersion + "-Installer.exe")
        .checksum("6bab01f98473bfd550544bbe9773a6d05872a61a")
        .name("VulkanSDK-" + sdkVersion + "-Installer.exe")
        .get();

    this.run(setupFile, "/S");
    this.wait();

    var pathVulkanJSON = this.prefixDirectory() + "drive_c/windows/winevulkan.json";
    touch(pathVulkanJSON);
    var contentVulkanJSON = JSON.stringify({
        "file_format_version": "1.0.0", "ICD": {
            "library_path": "c:\\windows\\system32\\winevulkan.dll",
            "api_version": sdkVersion
        }
    }, null, 4);

    writeToFile(pathVulkanJSON, contentVulkanJSON);

    var regeditFileContent32 =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Khronos\\Vulkan\\Drivers]\n" +
        "\"C:\\\\Windows\\\\winevulkan.json\"=dword:00000000";

    this.regedit().patch(regeditFileContent32);

    if (this.architecture() == "amd64") {
        var regeditFileContent64 =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Khronos\\Vulkan\\Drivers\\]\n" +
            "\"C:\\\\Windows\\\\winevulkan.json\"=dword:00000000";

        this.regedit().patch(regeditFileContent64);
    }

    return this;
}

/**
 * Verb to install all the necessary things to run winevulkan (even inside wine mainline or newest wine-staging)
 */
// eslint-disable-next-line no-unused-vars
class VulkanSDKVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vulkanSDK", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vulkanSDK();
        wizard.close();
    }
}
