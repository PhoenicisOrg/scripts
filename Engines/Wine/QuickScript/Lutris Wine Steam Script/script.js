include(["engines", "wine", "quick_script", "steam_script"]);
include(["utils", "functions", "net", "download"]);
include(["engines", "wine", "engine", "object"]);

function LutrisWineSteamScript() {
    SteamScript.call(this);
    this.installerStepsMethods = []
}

LutrisWineSteamScript.prototype = Object.create(SteamScript.prototype);

LutrisWineSteamScript.prototype.constructor = LutrisWineSteamScript;

LutrisWineSteamScript.prototype.slug = function (slug) {
    this._slug = slug;
    return this;
}

LutrisWineSteamScript.prototype.fetchScript = function () {
    var url = "https://lutris.net/api/installers/" + this._slug + "?format=json";
    return new Downloader().url(url).json();
}

LutrisWineSteamScript.prototype._setBasicInformation = function (scriptContent) {
    this.appId(scriptContent["script"]["game"]["steamid"]);
    this.name(scriptContent["name"]);
    this.author(scriptContent["user"]);
}

LutrisWineSteamScript.prototype._setArchitecture = function (scriptContent) {
    if (scriptContent["script"]["game"]["arch"] && scriptContent["script"]["game"]["arch"] === "win64") {
        this.wineArchitecture("amd64");
    }
    this.appId(scriptContent["script"]["game"]["steamid"]);
}

LutrisWineSteamScript.prototype._setArguments = function (scriptContent) {
    if (scriptContent["script"]["game"]["args"]) {
        this.arguments(scriptContent["script"]["game"]["args"].split(" "));
    }
}

LutrisWineSteamScript.prototype._evalInstallerSteps = function (scriptContent) {
    if (scriptContent["script"]["game"]["installer"]) {
        scriptContent["script"]["game"]["installer"].forEach(function (installerStep) {
            this.installerStepsMethods.add(function (wine, wizard) {
                this._evalInstallerStep(installerStep, wine, wizard)
            })
        })
    }
}

LutrisWineSteamScript.prototype._evalInstallerStep = function (installerStep, wine, wizard) {
    if (installerStep["task"] && installerStep["task"]["name"] === "winetricks") {
        var verb = nstallerStep["task"]["app"];

        // TODO
    }
}



LutrisWineSteamScript.prototype._evalOverrides = function (scriptContent) {
    if (scriptContent["script"]["winesteam"]) {
        var overrides = scriptContent["script"]["winesteam"]["overrides"];
        if (overrides) {
            Object.keys(scriptContent["script"]["winesteam"]["overrides"]).forEach(function (dll) {
                var dllStatus = overrides[dll];

                this.installerStepsMethods.add(function (wine, wizard) {
                    wine.overrideDLL()
                        .set(dllStatus, [dll])
                        .do();
                })
            })
        }
    }
}


LutrisWineSteamScript.prototype.go = function () {
    var scriptContent = this.fetchScript()["results"][0];

    this._setBasicInformation(scriptContent);
    this._setArchitecture(scriptContent);
    this._setArguments(scriptContent);
    this._evalInstallerSteps(scriptContent);
    this._evalOverrides(scriptContent);

    this.editor("");

    this.postInstall(function (wine, wizard) {
        this.installerStepsMethods.forEach(function (taskMethod) {
            taskMethod(wine, wizard);
        })
    });

    SteamScript.prototype.go.call(this);
}
