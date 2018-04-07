---
title: "Verbs"
permalink: /verbs/
toc: true
---

The following text describes Verbs for the example of the Wine engine.

## Writing a new verb
Probably, the verb you want to add has already been implemented somewhere else. Take that as an example:
* [winetricks](https://github.com/Winetricks/winetricks/blob/master/src/winetricks)
* [playonlinux.com search](https://www.playonlinux.com/en/forums.html)

Create a new folder in `Engines/Wine/Verbs` and add a `script.js`. The `script.js` must contain a function like this:
```javascript
Wine.prototype.verb = function() {
    ...
    return this;
}
```

The verb extends `Wine`. You can therefore access `Ẁine` methods via `this`.

### Resource
To download a file, use `Resource`:
```javascript
var setupFile = new Resource()
    .wizard(this._wizard)
    .url("http://url/file.exe")
    .checksum("sha1sum")
    .algorithm("SHA" / "MD5") // optional: default is "SHA"
    .name("file.exe")
    .get();
```

To install the downloaded `Resource`:
```javascript
this.run(setupFile, ["arg1", "arg2"])
        .wait("Please wait while {0} is installed ...".format("Verb"));
```
If possible, perform a silent installation. Many installers provide parameters like `/q`, `/S`, `-silent` etc. to do so.

### CabExtract
Sometimes, it is necessary to extract files from the download instead of installing it directly. You can do that with `CabExtract`:
```javascript
new CabExtract()
    .archive(setupFile)         // the Resource
    .wizard(null)
    .to("path/to/directory")    // often: this.system32directory()
    .extract();
```

It is also possible to pass additional parameters to the `extract()`, e.g.
```javascript
    .extract(["-L", "-F", "*d3dx9*x86*"]);
```

If you extract many files, don't forget to add a progress bar like it is done for [d3dx9](https://github.com/PhoenicisOrg/scripts/blob/master/Engines/Wine/Verbs/d3dx9/script.js).

### DLL Overrides
```javascript
this.overrideDLL()
    .set("native, builtin", ["dll1.dll", "dll2.dll"])
    .do();
```
