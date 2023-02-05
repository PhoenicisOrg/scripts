const { cat, touch } = include("utils.functions.filesystem.files");
const Downloader = include("utils.functions.net.download");
const propertyReader = Bean("propertyReader");
const operatingSystemFetcher = Bean("operatingSystemFetcher");

/**
 * Sorts an array of Wine versions in place
 * @param {array} versions The versions array (see packages in versions json)
 * @returns {void}
 */
function sortVersions(versions) {
    versions.sort((a, b) =>
    {
        // check version format
        const versionRegExp = /^(\d+\.\d+(\.\d+)?)(.*)?$/;
        if (!versionRegExp.test(a.version)) {
            throw new Error(`invalid Wine version "${a.version}`);
        }
        if (!versionRegExp.test(b.version)) {
            throw new Error(`invalid Wine version "${a.version}`);
        }

        // sort
        const aVersionParts = a.version.match(versionRegExp);
        const bVersionParts = b.version.match(versionRegExp);

        const aVersionNumbers = Array.from(aVersionParts[1].split('.')).map(item => Number(item));
        const bVersionNumbers = Array.from(bVersionParts[1].split('.')).map(item => Number(item));

        // ensure that cases where not all version numbers (major, minor, patch) are set are handled correctly
        const maxVersionIdx = 2;
        for (let i = 0; i <= maxVersionIdx; i++) {
            if (typeof aVersionNumbers[i] === 'undefined') {
                aVersionNumbers[i] = 0;
            }
            if (typeof bVersionNumbers[i] === 'undefined') {
                bVersionNumbers[i] = 0;
            }
        }

        // ensure that cases where the description is not set are handled correctly
        let aVersionDescription = aVersionParts[3];
        if (typeof aVersionDescription === 'undefined') {
            aVersionDescription = "";
        }

        let bVersionDescription = bVersionParts[3];
        if (typeof bVersionDescription === 'undefined') {
            bVersionDescription = "";
        }

        // major
        if (aVersionNumbers[0] != bVersionNumbers[0]) {
            return aVersionNumbers[0] - bVersionNumbers[0];
        }
        // minor
        if (aVersionNumbers[1] != bVersionNumbers[1]) {
            return aVersionNumbers[1] - bVersionNumbers[1];
        }
        // patch
        if (aVersionNumbers[2] != bVersionNumbers[2]) {
            return aVersionNumbers[2] - bVersionNumbers[2];
        }
        // description
        if (aVersionDescription < bVersionDescription) {
            return -1;
        } else {
            return 1;
        }
    }
    );
}

/**
 * Fetches the latest available Wine version based on the category and version regex
 * @param {wizard} wizard setup wizard to show the download progress of the versions json
 * @param {string} category (e.g. "upstream-linux-x86")
 * @param {RegExp} regex regex the version must fulfill
 * @returns {void}
 */
function getLatestVersion(wizard, category, regex) {
    const versionsJson = module.getAvailableVersions(wizard);

    const packages = versionsJson
        .filter(distribution => distribution.name === category)
        .flatMap(distribution => distribution.packages);

    const regExp = new RegExp(regex);
    const versions = packages
        .filter(({ version }) => regExp.test(version))
        .map(packageData => packageData.version);

    return versions[versions.length-1];
}

/**
 * Fetches the available Wine versions (sorted)
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

    const versionsJson = JSON.parse(cat(versionsFile));

    versionsJson.forEach(distribution => sortVersions(distribution.packages));

    return versionsJson;
}


module.getLatestStableVersion = function (wizard, architecture) {
    return getLatestVersion(wizard, `${this._wineDistribution}-${this._winePackage}-${architecture}`, /^\d+\.0(\.\d+)?$/);
}

module.getLatestDevelopmentVersion = function (wizard, architecture) {
    return getLatestVersion(wizard, `${this._wineDistribution}-${this._winePackage}-${architecture}`, /^\d+\.0(\.\d+)?$/);
}

module.getLatestStagingVersion = function (wizard, architecture) {
    const distribution = this._winePackage === "darwin" ?  "cx" : "staging";
    return getLatestVersion(wizard, `${distribution}-${this._winePackage}-${architecture}`, /^\d+\.0(\.\d+)?$/);
}

module.getLatestDosSupportVersion = function (/*wizard, architecture*/) {
    return "4.0";
}
