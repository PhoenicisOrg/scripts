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
        .url("https://sdk.lunarg.com/sdk/download/1.1.73.0/windows/VulkanSDK-1.1.73.0-Installer.exe")
        .checksum("ac34f732818c409bcb283b5c6100b373ab6a2404")
        .name("VulkanSDK-1.1.73.0-Installer.exe")
        .get();

    this.run(setupFile, "/S");

    var pathVulkanJSON = this.prefixDirectory() + "drive_c/windows/winevulkan.json"
    var contentVulkanJSON = '{\n'                                                                     +
                            '	"file_format_version": "1.0.0",\n'				       +
                            '	"ICD": {\n'							       +
                            '		"library_path": "c:\\windows\\system32\\winevulkan.dll",\n'    +
                            '		"api_version": "1.1.73"\n'				       +
                            '	}\n'								       +
                            '}'

    writeToFile(pathVulkanJSON, contentVulkanJSON);

    var regeditFileContent =
	"REGEDIT4\n"                                              	+
        "\n"                                                      	+
        "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Khronos\\Vulkan\\Drivers\\]\n" 	+
        "\"C:\\\\Windows\\\\winevulkan.json\"=dword:00000000" ;

    this.regedit().patch(regeditFileContent);

    if (this.architecture() == "amd64") {
        var regeditFileContent =
		"REGEDIT4\n"                                             	           +
                "\n"                                                            	   +
                "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Khronos\\Vulkan\\Drivers\\]n" +
		"\"C:\\\\Windows\\\\winevulkan.json\"=dword:00000000" ;

        this.regedit().patch(regeditFileContent);
    }

    return this;

}
