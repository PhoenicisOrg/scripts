include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "apps", "resources"]);

/**
* All the necessary things to run winevulkan (even inside wine mainline or newest wine-staging)
* -> https://github.com/roderickc/wine-vulkan
* @returns {Wine} Wine object
*/
Wine.prototype.vulkanSDK = function () {
    print("NOTE: you need a driver that support Vulkan enough to run winevulkan");
    print("NOTE: Vulkan works in wine from version 3.3");

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://sdk.lunarg.com/sdk/download/1.0.68.0/windows/VulkanSDK-1.0.68.0-Installer.exe")
        .checksum("fe85c637c3d55c2972a997fcec44212d55d41a98")
        .name("VulkanSDK-1.0.68.0-Installer.exe")
        .get();

    this.run(setupFile, "/S");

    var pathVulkanJSON = this.prefixDirectory + "drive_c/windows/winevulkan.json"
    var contentVulkanJSON = '{\n'                                                                      +
                            '	"file_format_version": "1.0.0",\n'				       +
                            '	"ICD": {\n'							       +
                            '		"library_path": "c:\\windows\\system32\\winevulkan.dll",\n'    +
                            '		"api_version": "1.0.51"\n'				       +
                            '	}\n'								       +
                            '}'

    writeToFile(pathVulkanJSON, contentVulkanJSON);

    var registrySettings32 = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("vulkan.reg");
    this.regedit().patch(registrySettings32);

    if (this.architecture() == "amd64") {
        var registrySettings64 = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("vulkan64.reg");
        this.regedit().patch(registrySettings64);
    }

    return this;

}
