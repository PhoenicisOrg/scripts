[![Build Status](https://travis-ci.com/PhoenicisOrg/scripts.svg?branch=master)](https://travis-ci.com/PhoenicisOrg/scripts)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ff0c41daa31549e4a9bb3998ca0c87ae)](https://www.codacy.com/app/PhoenicisOrg/scripts?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=PhoenicisOrg/scripts&amp;utm_campaign=Badge_Grade)
[![Crowdin Badge](https://d322cqt584bo4o.cloudfront.net/phoenicis-scripts/localized.svg)](https://crowdin.com/project/phoenicis-scripts)

# How to add a script
1. Fork this repository, create a new branch and clone it 
    ```
    git clone https://github.com/<user>/scripts.git
    cd scripts
    git checkout <branch>
    ```

2. Add the local checkout as a local repository in Phoenicis (see [instructions](https://phoenicisorg.github.io/phoenicis/Users/repository/#local-directory))

3. Select the right category for the application
    * Accessories
    * Development
    * Games
    * Graphics
    * Internet
    * Multimedia
    * Office
    * Other
    * Science
  
4. Create a new folder for your script inside that category. The folder structure should be:
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

5. Fill the files:
    * [script.js](https://phoenicisorg.github.io/scripts/Develop/script-js/): actual installation script
    * [script.json](https://phoenicisorg.github.io/scripts/Develop/script-json/): describes the installation script
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
    * [application.json](https://phoenicisorg.github.io/scripts/Develop/application-json/): describes the application
        ```json
        {
        "name": "Steam",
        "description": "Application description"
        }
        ```
  
6. Verify changes:
    * Ensure that the changes fulfill the code quality requirements and the files are formatted correctly (see [tools](https://phoenicisorg.github.io/scripts/General/tools/)).
  
7. Create a pull request:
    * Please create one pull request per script if you want to commit multiple scripts.
    * use the following naming convention   
```
<application_category>/<application_name> : <short summary>

<Reference/Fixes/Dependant/...> : <ISSUE_URL> (relevant to a reference)
<Full (brief) list of changes (and reasoning if relevant)>
Signed-off-by : Your Name <Your e-mail>
```

Example of the pull request (https://github.com/PhoenicisOrg/scripts/pull/797) :
```
Games/League Of Legends : Update and fixes

Fixes: #777
BUG: Latin America South installer is missing
Updated SHA-1 for EUW, LAN, OCE, JP, TR, BR, EUNE, NA, RU
Expected the game to run on platinum.
pick 61ce52e Update script.js
pick 6fdf980 Update script.js
Signed-off-by: Jacob Hrbek werifgx@gmail.com
```
    * Once the changes are approved squash the merge request.
