<!-- Introduction -->

<!-- Description -->

# How to add a script
1. Fork this repository, create a new branch and clone it 
    ```bash
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
 		"name":	"Steam",
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
Depends on: #790
Added new sources for installers from riot games
BUG: Latin America South installer is missing
Updated SHA-1 for EUW, LAN, OCE, JP, TR, BR, EUNE, NA, RU
Set MACOSX in testing since it's not tested.
TODO : Performance can be improved beyond native, needs research
Expected the game to run on platinum.
pick 61ce52e Update script.js
pick 6fdf980 Update script.js
Signed-off-by: Jacob Hrbek werifgx@gmail.com
```
    * Once the changes are approved squash the merge request.
All contributions are welcome.. blah blah.. motivation speech

## How to contribute an installer
phoenicis is using installers written in javascript... blah blah <!-- wikify -->

All installers has to respect given file hierarchy:
- `<Category>/<sub-category/<application_name>`
<!-- wikify -->
- `<Category>/<sub-category/<application_name>/application.json`
<!-- wikify -->
```json
{
    "name"          : "Application Name"
    "id"            : "application_name"
    "description"   : "This is an example"
}
```
- `<Category>/<sub-category/<application_name>/miniatures/main.png`
<!-- wikify -->
  - png/jpeg is accepted.
  - has to be exactly 200x200px <!-- TODO VERIFY -->
  - Images with copyright conflicts are not accepted.
- `<Category>/<sub-category/<application_name>/<Online/Steam/Origin/...>`
<!-- wikify -->

<!-- How to chose the name of the directory?-->

<!-- Provide reference -->

### Prepare your local repository 
Since you don't have write rights to a upstream repository you need to make a local repository followed by merge request.

Start by forking https://github.com/PhoenicisOrg/scripts on github <!-- Recommends renaming on `installers` since `scripts` is widely used for user scripts. -->

#### Using git

Dependencies
- git <!-- Any git version? -->
<!-- anything else? -->

```bash 
    # Clone the repository -> Make a local repository
    git clone git@github.com:<your_github_username>/<repository>.git

    # Change Directory to a repository
    cd <path_to_local_repository>

    # Change branch to a master (if not already)
    git checkout master

    # Make a new branch
    git branch -m <name_of_branch>

    # Change branch on <name_of_branch>
    git checkout <name_of_branch>

    # Once the changes are made make a commit
    git commit -a # Follow standartization!
```



#### Using GitHub GUI (Not recommended)
<!-- TODO -->

## How to contribute a translation
<!-- TODO -->