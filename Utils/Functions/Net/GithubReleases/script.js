const Downloader = include("utils.functions.net.download");
const Resource = include("utils.functions.net.resource");
const { createTempDir, remove, cat } = include("utils.functions.filesystem.files");

module.GitHubReleaseDownloader = class {
    /**
     * Constructor 
     * 
     * @param {string} repositoryOwner The owner of the GitHub repository
     * @param {string} repositoryName The name of the GitHub repository
     */
    constructor(repositoryOwner, repositoryName) {
        super();

        this.repositoryOwner = repositoryOwner;
        this.repositoryName = repositoryName;
    }

    /**
     * Sets the setup wizard
     * 
     * @param {SetupWizard} wizard The setup wizard
     * @returns {GitHubReleaseDownloader} this
     */
    withWizard(wizard) {
        this.wizard = wizard;

        return this;
    }

    /**
     * Fetches the GitHub releases
     */
    fetchReleases() {
        const tmpDir = createTempDir();

        const releasesFile = new Downloader()
            .wizard(this.wizard)
            .url(`https://api.github.com/repos/${this.repositoryOwner}/${this.repositoryName}/releases`)
            .message(tr("Fetching versions list..."))
            .to(tmpDir + "/releases.json")
            .get();

        this.versions = JSON.parse(cat(releasesFile));

        remove(tmpDir);
    }

    /**
     * Fetches the tags belonging to the releases for the given GitHub repository
     * 
     * @returns {string[]} An array containing the tags for the GitHub releases
     */
    getReleases() {
        return this.versions.map(version => version.tag_name);
    }

    getLatestRelease() {
        return this.versions[0].tag_name;
    }

    /**
     * Downloads all assets that belong to the release with the given tag that match a given regex
     * 
     * @param {string} tag The tag name of the release
     * @param {RegExp} assetRegex An optional regex describing the desired asset(s)
     * @returns {string[]} An array of paths leading to the downloaded files
     */
    download(tag, assetRegex) {
        const version = this.versions.find(version => version.tag_name === tag);

        return version.assets
            .filter(asset => !assetRegex || asset.name.match(assetRegex))
            .map(asset =>
                new Resource()
                    .wizard(this.wizard)
                    .url(asset.url)
                    .name(asset.name)
                    .get()
            );
    }
};
