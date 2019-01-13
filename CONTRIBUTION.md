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
	"name"			: "Application Name"
	"id"			: "application_name"
	"description" 	: "This is an example"
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