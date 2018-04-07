---
title: "SetupWizard"
permalink: /setup-wizard/
toc: true
---

The SetupWizard guides the user through the installation. It provides tools for several purposes.

## Create
```javascript
var setupWizard = SetupWizard(InstallationType.APPS, applicationName, miniature);
```
or
```javascript
var setupWizard = SetupWizard(InstallationType.ENGINES, applicationName, miniature);
```

The miniature can be retrieved like:
```javascript
var appsManager = Bean("repositoryManager");
var application = appsManager.getApplication(["Applications", "Development", "Notepad++"]);
var miniature = application.getMainMiniature();
```

## Presentation
Shows a default script presentation with information about the installed application, its editor, application homepage and the author of the script.
```javascript
setupWizard.presentation(application, editor, applicationHomepage, scriptAuthor);
```

## License
Message + license file:
```javascript
setupWizard.licenceFile(message, filePath);
```

Message + license text:
```javascript
setupWizard.licence(message, licenseText);
```

## Show a message
To show a message and wait until the user clicks "Next":
```javascript
setupWizard.message(message);
```

## Query user input
### Text
Query text:
```javascript
var userText = setupWizard.textbox(message);
```

Query text with default value:
```javascript
var userText = setupWizard.textbox(message, default);
```
### File
Query file:
```javascript
var userFilePath = setupWizard.browse(message);
```

Query file with default directory and allowed file extension:
```javascript
var userFilePath = setupWizard.browse(message, directoryPath, ["txt", "pdf"]);
```

### Menu
Show a menu with items to select from:
```javascript
var userChoice = setupWizard.menu(message, ["option1", "option2"]);
var selectedText = userChoice.text;
var selectedIndex = userChoice.index;
```

Show a menu with a default option:
```javascript
var userChoice = setupWizard.menu(message, ["option1", "option2"], "option2");
```

## Show progress
For a spinning wheel:
```javascript
setupWizard.wait(message);
```

For a progress bar:
```javascript
var progressBar = setupWizard.progressBar(message);
progressBar.setText(text);
progressBar.setProgressPercentage(0.);
```
You can find an example for the progress bar usage in the [corefonts verb](https://github.com/PhoenicisOrg/scripts/blob/master/Engines/Wine/Verbs/corefonts/script.js).

## Close
Don't forget to close the SetupWizard when the installation is finished:
```javascript
setupWizard.close();
```
