---
title: "script.js"
permalink: /script-js/
toc: true
---

## QuickScript

The QuickScript should be sufficient for the vast majority of scripts. It provides a simple interface to install the following types of applications:
* Local Windows executable (LocalInstallerScript)
* Online Windows executable (OnlineInstallerScript)
* Steam game (SteamScript)
* .zip file (ZipScript)

QuickScripts use the latest stable wine version by default (recommended).

### SteamScript
A basic script looks like:

```javascript
include(["engines", "wine", "quick-script", "steam-script"]);

new SteamScript()
    .name("A Game")              // name of the game
    .editor("The developer")     // editor of the game (see Steam store: developer)
    .author("Forename Surname")  // author of this script (you)
    .appId(123456)               // Steam application ID
    .go();
```

This script will install the game for the category "Games" and create a shortcut for 
```
Steam.exe -silent -applaunch 265890
```
To disable the game overlay:
```javascript
    .gameOverlay(false)
```
If you need a different category, use:
```javascript
    .catgory("Category") 
```
For a different shortcut (e.g. if you want to pass arguments):
```javascript
    .executable("Steam.exe", ["-silent", "-applaunch", 123456, "-someArgument"]) 
```

### UplayScript
A basic script looks like:

```javascript
include(["engines", "wine", "quick-script", "uplay-script"]);

new UplayScript()
    .name("A Game")                                 // name of the game
    .editor("The developer")                        // editor of the game (see Steam store: developer)
    .applicationHomepage("http://www.someurl.com")  // application homepage
    .author("Forename Surname")                     // author of this script (you)
    .appId(123456)                                  // Uplay application ID
    .go();
```
You can determine the app ID by starting the download and checking the folders in `Ubisoft/Ubisoft Game Launcher/data/`.

### LocalInstallerScript
Installs a local Windows executable. Shows a setup window browse step (see [SetupWizard]({{ site.baseurl }}{% link _pages/setup-wizard.md %})) to query the executable.

A basic script looks like:

```javascript
include(["engines", "wine", "quick-script", "local-installer-script"]);

new LocalInstallerScript()
    .name("Application-Name")                       // name of the application
    .editor("Editor")                               // editor of the application
    .applicationHomepage("http://www.someurl.com")  // application homepage
    .author("Forename Surname")                     // author of this script (you)
    .category("Category")                           // category
    .executable("Application.exe")                  // exe name (for the shortcut)
    .go();
```

### OnlineInstallerScript
Downloads and installs a Windows executable.

A basic script looks like:

```javascript
include(["engines", "wine", "quick-script", "online-installer-script"]);

new OnlineInstallerScript()
    .name("Application-Name")                       // name of the application
    .editor("Editor")                               // editor of the application
    .applicationHomepage("http://www.someurl.com")  // application homepage
    .author("Forename Surname")                     // author of this script (you)
    .url("http://url_to_exe")                       // where the exe can be downloaded
    .checksum("exe_checksum")                       // sha1sum of the exe
    .category("Category")                           // category
    .executable("Application.exe")                  // exe name (for the shortcut)
    .go();
```

### CustomInstallerScript
Executes a custom installation command:
```javascript
include(["engines", "wine", "quick-script", "custom-installer-script"]);

new CustomInstallerScript()
    .name("Application-Name")                                           // name of the application
    .editor("Editor")                                                   // editor of the application
    .applicationHomepage("http://www.someurl.com")                      // application homepage
    .author("Forename Surname")                                         // author of this script (you)
    .installationCommand(function(wizard) {                             // function specifying the installation command
        return {command: "msiexec", args: ["/i", "C://app.msi"]};
    })
    .category("Category")                                               // category
    .executable("Application.exe")                                      // exe name (for the shortcut)
    .go();
```

### ZipScript
A basic script looks like:

```javascript
include(["engines", "wine", "quick-script", "zip-script"]);

new ZipScript()
    .name("Application-Name")                       // name of the application
    .editor("Editor")                               // editor of the application
    .applicationHomepage("http://www.someurl.com")  // application homepage
    .author("Forename Surname")                     // author of this script (you)
    .url("http://url_to_exe")                       // where the .zip can be downloaded
    .checksum("exe_checksum")                       // sha1sum of the zip
    .category("Category")                           // category
    .executable("Application.exe")                  // exe name (for the shortcut)
    .go();
```

### Advanced
This section describes some advanced methods which give you more possibilities to control your script.

#### Executable arguments
By default, the `.executable` runs the application without arguments. If you need arguments, pass an array as second parameter.

For example, for a steam game:
```javascript
    .executable("Steam.exe", ["-silent", "-applaunch", 123456, "-someArgument"]) 
```

#### Pre/Post install hooks
With the pre/post install hooks, you can specify a function which is executed before/after the installation. The function receives a wine object and the [SetupWizard]({{ site.baseurl }}{% link _pages/setup-wizard.md %}). By default, the pre/post install hooks do nothing.

These hooks are especially useful to set DLL overrides.
You can find the complete list of available verbs [here](https://github.com/PhoenicisOrg/scripts/tree/master/Engines/Wine/Verbs).

For example, in the script for "Assassin’s Creed: Brotherhood":
```javascript
include(["engines", "wine", "verbs", "d3dx9"]);
include(["engines", "wine", "verbs", "crypt32"]);

new SteamScript()
         ...
    .preInstall(function(wine, wizard) {
        wine.crypt32();
        wine.d3dx9();
    })
```
The wizard can be used to show additional setup pages (e.g. to query a file path).

#### Wine settings
Specific distribution ("upstream" or "staging"):
```javascript
    .wineDistribution("staging")
```
Specific wine version:
```javascript
    .wineVersion("1.9.23")
```
You can also use variables for the wine version:
* LATEST_DEVELOPMENT_VERSION
* LATEST_STAGING_VERSION

Specific wine architecture ("x86" or "amd64"):
```javascript
    .wineArchitecture("x86")
```
Specific windows version:
```javascript
    .preInstall(function(wine, wizard) {
        wine.windowsVersion("win7");
    })
```

#### Registry
If the script requires a special registry setting, there are 2 options:
1. If the setting is something which could be useful for other scripts as well, extend the [Wine script](https://github.com/PhoenicisOrg/scripts/blob/master/Engines/Wine/Engine/Object/script.js) (compare e.g. Wine.prototype.nativeApplication).

2. If the setting is special for this script, use a registry file. Create a `registry.reg` in `<scriptname>/resources` (see [IE6](https://github.com/PhoenicisOrg/scripts/blob/master/Applications/Internet/Internet%20Explorer%206.0/resources/ie6.reg)) and apply this in `pre/postInstall()` via
```javascript
var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
wine.regedit().patch(registrySettings);
```

## Custom script
If the QuickScript is not sufficient for you, you can still write a custom script which will give you control over the complete installation process.

The frame for a custom script looks like this:
```javascript
include(["engines", "wine", "engines", "wine"]);
include(["engines", "wine", "shortcuts", "wine"]);

var application = "application name"

var setupWizard = SetupWizard(application);

setupWizard.presentation(application, "Editor", "http://applicationhomepage.com", "script author");

var wine = new Wine()
    .wizard(setupWizard)
    .architecture("x86")
    .version(LATEST_STABLE_VERSION)
    .prefix(application)
    .luna()
    .run("your command")
    .wait();

new WineShortcut()
    .name(application)
    .prefix(application)
    .search("application.exe")
    .miniature(["category", application])
    .create();

setupWizard.close();
```

You can take [Internet Explorer 7.0](https://github.com/PhoenicisOrg/scripts/blob/master/Applications/Internet/Internet%20Explorer%207.0/Online/script.js) as an example.

## Debug
To print debug output, simply use:
```javascript
print("Debug output");
```

You can also use JavaScript debugging in your IDE (e.g. with [IntelliJ IDEA](https://blog.jetbrains.com/idea/2014/03/debugger-for-jdk8s-nashorn-javascript-in-intellij-idea-13-1/))
