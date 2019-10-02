const Downloader = include("utils.functions.net.download");
const {createTempDir, remove} = include("utils.functions.filesystem.files");

/**
 * Get an array of tag corresponding to the version in a git repository
 *
 * @param {string} repositoryName name of the repository
 * @param {string} repositoryOwner owner of the repository
 * @param {wizard} wizard
 * @returns {string[]} list of version tag in the repository
 */
function getGitVersions(repositoryName, repositoryOwner, wizard) {
    const tmpDir = createTempDir();

    const releasesFile = new Downloader()
        .wizard(wizard)
        .url(
            `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/releases`
        )
        .message(tr("Fetching versions list..."))
        .to(tmpDir + "/releases.json")
        .get();

    let versions = new Array();

    const releaseFileJson = JSON.parse(cat(releaseFile));
    releaseFileJson.forEach(version => {
        versions.push(version.tag_name);
    });

    remove(tmpDir);

    return versions;
}
module.getGitVersions = getGitVersions;
