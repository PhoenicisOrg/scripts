---
title: "Verbs"
category: Develop
order: 5
toc: true
---

The following text describes Verbs for the example of the Wine engine.

## Writing a new verb
Probably, the functionality of the verb you want to add has already been implemented somewhere else. 
To find out whether someone else has already implemented the functionality you can for example look at:
* [winetricks](https://github.com/Winetricks/winetricks/blob/master/src/winetricks)
* [playonlinux.com search](https://www.playonlinux.com/en/forums.html)

To create a new verb create a new folder in `Engines/Wine/Verbs` and add a `script.js`. 
The `script.js` must follow this template:

```javascript
const Wine = include("engines.wine.engine.object");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install <verb>
 */
// TODO: replace Verb by your own class name
class Verb {
    constructor(wine) {
        this.wine = wine;

        // do some optional initialisation work
    }

    go() {
        // TODO: add implementation of your verb here
        ...
    }

    static install(container) {
        const wine = new Wine();
        // TODO: change <verb> to the target verb name
        const wizard = SetupWizard(InstallationType.VERBS, "<verb>", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        // TODO: replace Verb by your own class name
        new Verb(wine).go();

        wizard.close();
    }
};

// TODO: replace Verb by your own class name
module.default = Verb;
```

The main implementation of your verb needs to be contained in the `go` method.

### Resource
To download a file, use `Resource`:

```javascript
const setupFile = new Resource()
    .wizard(this.wine.wizard())
    .url("http://url/file.exe")
    .checksum("sha1sum")
    .algorithm("SHA" / "MD5") // optional: default is "SHA"
    .name("file.exe")
    .get();
```

To install the downloaded `Resource`:

```javascript
this.wine
    .run(setupFile, ["arg1", "arg2"])
    .wait("Please wait while {0} is installed ...".format("Verb"));
```

If possible, perform a silent installation. Many installers provide parameters like `/q`, `/S`, `-silent` etc. to do so.

### CabExtract
Sometimes, it is necessary to extract files from the download instead of installing it directly. You can do that with `CabExtract`:

```javascript
new CabExtract()
    .archive(setupFile)         // the Resource
    .wizard(this.wine.wizard())
    .to("path/to/directory")    // often: this.wine.system32directory()
    .extract();
```

It is also possible to pass additional parameters to the `extract()`, e.g.

```javascript
    .extract(["-L", "-F", "*d3dx9*x86*"]);
```

If you extract many files, don't forget to add a progress bar like it is done for [d3dx9](https://github.com/PhoenicisOrg/scripts/blob/master/Engines/Wine/Verbs/d3dx9/script.js).

### Copying DLL's to `C:\windows\sys*`
On Windows 32 bits, 32 bits dll's go to `C:\windows\system32`.
On Windows 64 bits, 32 bits dll's go to `C:\windows\syswow64` and 64 bits dll's go to system32.

This is already handled inside the engine implementation if you use the functions `wine.system64directory()` for 64 bits dll's and bits and `wine.system32directory()` for 32 bits dll's inside your scripts.

### DLL Overrides

```javascript
this.wine.overrideDLL()
    .set("native, builtin", ["dll1.dll", "dll2.dll"])
    .do();
```
