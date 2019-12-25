const Downloader = include("utils.functions.net.download");
const Resource = include("utils.functions.net.resource");
const { createTempDir, remove, cat } = include("utils.functions.filesystem.files");

/**
 * Fetches an array of tag corresponding to the releases in a git repository
 *
 * @param {string} repositoryOwner owner of the repository
 * @param {string} repositoryName name of the repository
 * @param {wizard} wizard the wizard
 * @returns {object[]} list of version objects in the repository
 */
module.fetchGithubReleases = function fetchGithubReleases(repositoryOwner, repositoryName, wizard) {
    const tmpDir = createTempDir();

    const releasesFile = new Downloader()
        .wizard(wizard)
        .url(`https://api.github.com/repos/${repositoryOwner}/${repositoryName}/releases`)
        .message(tr("Fetching versions list..."))
        .to(tmpDir + "/releases.json")
        .get();

    const versions = JSON.parse(cat(releasesFile));

    remove(tmpDir);

    return versions;
};

module.extractGithubReleaseStrings = function extractGithubReleaseStrings(versions) {
    return versions.map(version => version.name);
}

module.downloadGithubRelease = function downloadGithubRelease(version, wizard) {
    return new Resource()
        .wizard(wizard)
        .url(version.tarball_url)
        // TODO: generate a more "random" name to prevent file conflicts
        .name(`${version.name}.tar.xz`)
        .get();
}
