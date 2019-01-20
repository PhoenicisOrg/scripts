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

    var sdkVersion="1.1.92.1";

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://sdk.lunarg.com/sdk/download/latest/windows/vulkan-sdk.exe?u=")
        //checksum changes everytime a new version is released
        .name("vulkan-sdk.exe")
        .get();

    this.run(setupFile, "/S");
    this.wait();

    var pathVulkanJSON = this.prefixDirectory() + "drive_c/windows/winevulkan.json";
    touch(pathVulkanJSON);
    var contentVulkanJSON = '{\n'                                                                  +
                            '	"file_format_version": "1.0.0",\n'                                 +
                            '	"ICD": {\n'                                                        +
                            '		"library_path": "c:\\windows\\system32\\winevulkan.dll",\n'    +
                            '		"api_version": "' + sdkVersion +'"\n'                          +
                            '	}\n'                                                               +
                            '}' ;

    writeToFile(pathVulkanJSON, contentVulkanJSON);

    var regeditFileContent32 =
    "REGEDIT4\n"                                                    +
    "\n"                                                      	    +
    "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Khronos\\Vulkan\\Drivers]\n"    +
    "\"C:\\\\Windows\\\\winevulkan.json\"=dword:00000000" ;

    this.regedit().patch(regeditFileContent32);

    if (this.architecture() == "amd64") {
        var regeditFileContent64 =
        "REGEDIT4\n"                                                                  +
        "\n"                                                                          +
        "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Khronos\\Vulkan\\Drivers\\]\n"    +
	"\"C:\\\\Windows\\\\winevulkan.json\"=dword:00000000" ;

        this.regedit().patch(regeditFileContent64);
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