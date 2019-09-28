const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { touch, writeToFile } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const Regedit = include("engines.wine.plugins.regedit");

/**
 * Verb to install all the necessary things to run winevulkan (even inside wine mainline or newest wine-staging)
 * see: https://github.com/roderickc/wine-vulkan
 */
class VulkanSDK {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();

        print("NOTE: you need a graphic driver that supports Vulkan to run winevulkan");
        print("NOTE: Vulkan works in wine from version 3.3 (if compiled with vulkan support)");

        const sdkVersion = "1.1.97.0";

        const setupFile = new Resource()
            .wizard(wizard)
            .url(`https://sdk.lunarg.com/sdk/download/${sdkVersion}/windows/VulkanSDK-${sdkVersion}-Installer.exe`)
            .checksum("6bab01f98473bfd550544bbe9773a6d05872a61a")
            .name(`VulkanSDK-${sdkVersion}-Installer.exe`)
            .get();

        this.wine.run(setupFile, "/S");
        this.wine.wait();

        const pathVulkanJSON = `${prefixDirectory}/drive_c/windows/winevulkan.json`;

        touch(pathVulkanJSON);

        const contentVulkanJSON = JSON.stringify(
            {
                file_format_version: "1.0.0",
                ICD: {
                    library_path: "c:\\windows\\system32\\winevulkan.dll",
                    api_version: sdkVersion
                }
            },
            null,
            4
        );

        writeToFile(pathVulkanJSON, contentVulkanJSON);

        const regeditFileContent32 =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Khronos\\Vulkan\\Drivers]\n" +
            '"C:\\\\Windows\\\\winevulkan.json"=dword:00000000';

        new Regedit(this.wine).patch(regeditFileContent32);

        if (this.wine.architecture() == "amd64") {
            const regeditFileContent64 =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Khronos\\Vulkan\\Drivers\\]\n" +
                '"C:\\\\Windows\\\\winevulkan.json"=dword:00000000';

            new Regedit(this.wine).patch(regeditFileContent64);
        }
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vulkanSDK", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new VulkanSDK(wine).go();

        wizard.close();
    }
}

module.default = VulkanSDK;
