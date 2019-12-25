const {cat, touch} = include("utils.functions.filesystem.files");
const Downloader = include("utils.functions.net.download");
const propertyReader = Bean("propertyReader");

/**
 * Sorts an array of Wine versions
 * @param {array} versions The versions array
 * @returns {void}
 */
module.sortVersions = function (versions) {
    versions.sort((a, b) =>
    {
        const aVersionNumbers = Array.from(a.split('.')).map(item => Number(item));
        const bVersionNumbers = Array.from(b.split('.')).map(item => Number(item));

        // ensure that cases where not all version numbers (major, minor, patch) are set are handled correctly
        const maxVersionIdx = 2;
        let i;
        for (i = 0; i <= maxVersionIdx; i++) {
            if (typeof aVersionNumbers[i] === 'undefined') {
                aVersionNumbers[i] = 0;
            }
            if (typeof bVersionNumbers[i] === 'undefined') {
                bVersionNumbers[i] = 0;
            }
        }

        // major
        if (aVersionNumbers[0] == bVersionNumbers[0]) {
            // minor
            if (aVersionNumbers[1] == bVersionNumbers[1]) {
                // patch
                return aVersionNumbers[2] - bVersionNumbers[2];
            } else {
                return aVersionNumbers[1] - bVersionNumbers[1];
            }
        } else {
            return aVersionNumbers[0] - bVersionNumbers[0];
        }
    }
    );
}

/**
 * Fetches the available Wine versions
 * @param {wizard} wizard setup wizard to show the download progress
 * @returns {object} available Wine versions
 */
module.getAvailableVersions = function (wizard) {
    const wineEnginesDirectory = propertyReader.getProperty("application.user.engines") + "/wine";
    const versionsFile = wineEnginesDirectory + "/availableVersions.json";

    touch(versionsFile);

    const wineWebServiceUrl = propertyReader.getProperty("webservice.wine.url");

    new Downloader()
        .wizard(wizard)
        .message(tr("Fetching available Wine versions..."))
        .url(wineWebServiceUrl)
        .to(versionsFile)
        .onlyIfUpdateAvailable(true)
        .get();

    return JSON.parse(cat(versionsFile));
}


module.getLatestStableVersion = function (wizard) {
    const versionsJson = module.getAvailableVersions(wizard);

    const packages = versionsJson
        .filter(distribution => distribution.name === "upstream-linux-x86")
        .flatMap(distribution => distribution.packages);

    const regex = new RegExp('^\\d+\\.0(\\.\\d+)?$');
    const stableVersions = packages
        .filter(({version}) => regex.test(version))
        .flatMap(package => package.version);

    module.sortVersions(stableVersions);

    return stableVersions[stableVersions.length-1];
}

module.getLatestDevelopmentVersion = function (wizard) {
    const versionsJson = module.getAvailableVersions(wizard);

    const packages = versionsJson
        .filter(distribution => distribution.name === "upstream-linux-x86")
        .flatMap(distribution => distribution.packages);

    const regex = new RegExp('^\\d+\\.\\d(\\.\\d+)?$');
    const develVersions = packages
        .filter(({version}) => regex.test(version))
        .flatMap(package => package.version);

    module.sortVersions(develVersions);

    return develVersions[develVersions.length-1];
}

module.getLatestStagingVersion = function (wizard) {
    const versionsJson = module.getAvailableVersions(wizard);

    const packages = versionsJson
        .filter(distribution => distribution.name === "staging-linux-x86")
        .flatMap(distribution => distribution.packages);

    const regex = new RegExp('^\\d+\\.\\d(\\.\\d+)?$');
    const stagingVersions = packages
        .filter(({version}) => regex.test(version))
        .flatMap(package => package.version);

    module.sortVersions(stagingVersions);

    return stagingVersions[stagingVersions.length-1];
}

module.getLatestDosSupportVersion = function (/*wizard*/) {
    return "4.0";
}
