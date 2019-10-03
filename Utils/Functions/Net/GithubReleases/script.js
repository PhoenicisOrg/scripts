const Downloader = include("utils.functions.net.download");
const {createTempDir, remove, cat} = include("utils.functions.filesystem.files");

/**
 * Get an array of tag corresponding to the releases in a git repository
 *
 * @param {string} repositoryOwner owner of the repository
 * @param {string} repositoryName name of the repository
 * @param {wizard} wizard the wizard
 * @returns {string[]} list of version tag in the repository
 */
function getGithubReleases(repositoryOwner, repositoryName, wizard) {
    const tmpDir = createTempDir();

    const releasesFile = new Downloader()
        .wizard(wizard)
        .url(
            `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/releases`
        )
        .message(tr("Fetching versions list..."))
        .to(tmpDir + "/releases.json")
        .get();

    const versions = JSON.parse(cat(releasesFile)).map(version => version.tag_name);

    remove(tmpDir);

    return versions;
}
module.getGithubReleases = getGithubReleases;
