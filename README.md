[![Build Status](https://travis-ci.org/PhoenicisOrg/Scripts.svg?branch=master)](https://travis-ci.org/PhoenicisOrg/Scripts)   [![Codacy Badge](https://api.codacy.com/project/badge/Grade/ec5268b4e2c0412ead8d90e561795fd1)](https://app.codacy.com/app/PhoenicisOrg/Scripts?utm_source=github.com&utm_medium=referral&utm_content=PhoenicisOrg/Scripts&utm_campaign=badger)

# How to add a script
1. Select the right category
  * Accessories
  * Development
  * Games
  * Graphics
  * Internet
  * Multimedia
  * Office
  * Other
  * Science
  
2. Create a new folder for your script inside that category. The folder structure should be:
    ```
    category
    └── application-name
        ├── script-name
        │   ├── script.js
        │   └── script.json
        ├── miniatures
        │   └── main.png
        └── application.json
    ```

    Typically, `script-name` will be something like "Steam", "Online" or "v1.2".
    
    Even if the application name contains ®, ™ or the like, you should not use it in the folder name.

3. Fill the files:
  * [script.js](https://github.com/PlayOnLinux/Scripts/wiki/script.js): actual installation script
  * [script.json](https://github.com/PlayOnLinux/Scripts/wiki/script.json): describes the installation script
  ```json
  {
		"scriptName": "Online",
		"compatibleOperatingSystems": ["MACOSX", "LINUX"],
		"testingOperatingSystems": [],
		"free": true,
		"requiresPatch": false
  }
  ```
  * main.png: application icon (400px x 300px)
  * [application.json](https://github.com/PlayOnLinux/Scripts/wiki/application.json): describes the application
  ```json
  {
 		"name":	"Steam",
		"description": "Application description"
  }
  ```
  
  4. Create a pull request
  * Please create one pull request per script if you want to commit multiple scripts.
  * use the following naming convention  
       * for a new script: "added \<application name\>" (e.g. "added 7-zip")
       * for an updated script: "updated \<application name\> \<what changed\>" (e.g. "updated 7-zip to use Wine 2.1")
