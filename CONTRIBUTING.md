Phoenicis install it's supported software based on instructions from this repository written in javascript and stated file hierarchy.

### Quality Assurance

Q1. All code is expected to work without bugs and vulnerabilities assuming that those vulnerabilities and bugs are known and reported.

Q2. If the code reveals vulnerability that exposes user's system to malicious code execution or causes unexpected behavior the codeblock should be revoked immediately untill the vulnerability is fixed depending on the severity.

Q3. If there is a better way to introduce a feature the method should be researched and implemented if it improves the previous code and causes no other issues that are known at the day of report.

Q4. Standartization has to be conformed

    Q4.1. Merge requests naming

    ```
    <Category>/<Title> : <short_summary>

    <Fixes/Depends/refference> : <HYPERLINK>
    <Changelog>
    <Changelog>
    ...
    Signed-off-by : <NAME> <SURNAME> <<EMAIL>>
    ```

Q5. All installers has to work as expected to be approved in official and non-testing repository, if the proposed change is not applicable to be accepted in a repository comments in code are accepted otherwise the installers should be comment-free.

Q999. Everyone has to follow set of rules below

#### Code of Contribution
These set of rules ensures quality of provided contribution making their merge into master more effective and possible without sacrificing the quality of provided code and contribution.


C1. **Trolling is not tollerated**
*Purposefully participation only to aggrevate other parties of phoenicis is not tollerated and will result in a ban for six hours times two if the issue presist after the ban.*

C2. **Spamming is not tollerated**
*Purposefully posting content that is not relevant to the project and/or propagates NSFW/malicious content without person's consciousness is not tolerated and will result in a ban for 1 month

If person's account was hijacked he/she can contact team in PhoenicisOrg/PublicRelation and requst unban assuming that person did neccesary procautions to prevent such outcome in the future.*

C3. **Approach the contribution open-minded**
*Purpose of this set of rules is to ensure code quality including the informations and knowledge that the contributors have. That's why you are required consider the posibility that you are wrong if you are proven to be wrong from verified source.*

C4. **Challenge other members if you have a valid reason**
*If you think that 'something' in phoenicis project can be improved and you have a verified proof to support your claim, then you have the right to challenge other members of the project.

Valid reason is understand as verified proof meaning that the proof was confirmed by a truested source or is based on valid research.*

C5. **Nothing is permanent**
*Everyone has the right to suggest changes to the project assuming they have a valid proof to support their reasoning.*

C6. **European Copyright Directive**
*Due new European Copyright directive you are required to sign your merge request with your real name and surname as mensioned above.*
    C6.1: Merge can be signed by other community member assuming that he/she is willing to take responsibility for a proposed code.

#### Code of Maintainers
*Maintainer is designation for contributions/members that are trusted to maintain given part of phoenicis, speciall set of rules apply.*

M1. **Maintain entrusted section of phoenicis**
*You ware entruested to maintain specified part of phoenicis and you are expected to make sure that this part is updated based on quality standarts and Code Of Contribution.*

M2. **You have a right to recruit testers to test your codeblock**
*You have the right to file an issue in PhoenicisOrg/PublicRelations to recruit testers to help you maintain your code

If secrion has multiple maintainers without lead maintainer all maintainers have to agree on the recruitment.*

M3. **You have a right to chose your lead**
*if section has more then three maintainers you have a right to chose a lead maintainer

All maintainers of specified section have to agree on the lead maintainer in proportion to 50% or more.*

M4. **YOu have a right to overrule your lead**
*If you disagree with your lead you have a right to vote agains his/hers decision

Vote has to be in proportion to 50% or more of specified section maintainers.* 

#### Special set of rules

S1. Project members have the authority to ignore the rules above assuming that there is an conflict which forces them to act based on these sets of rules. (This is a placeholder untill the cource of action is made clear and was proved to be working in a practice.)


### How to write an installer
There are the set of instructions to write an installer in Phoenicis/Installers

#### Preparing the working environemnt
Best practice is to make a local repository and push changes to a forked branch to be merged.

To start fork PhoenicisOrg/Installers on github followed by:
```bash

# Change Directory to your desired path
cd <PATH>

# Clone your fork on github in your desired path
git clone https://github.com/<YOUR_GITHUB_USERNAME>/scripts.git

# Change Directory to a directory that you've just downloaded
cd <PATH_TO_LOCAL_REPOSITORY>

# check available branches
## branch with a *<NAME> is selected branch
git branch

# Make a new branch
## It's recommended to keep branch name relevant
git checkout <NEW_BRANCH_NAME>

# Add new file to a tracking
## Tracking is term used by git for syncing the local repository with remote
echo "test" >> test
git add test # Will add test to tracking

# Make a new commit
git commit -a # Opens nano with instructions

# Push a new commit
git push

# Sync master with your forked master
git remote add upstream https://github.com/PhoenicisOrg/Installers # adds new remote for upstream
git fetch upstream # Fetches remote for upstream
git pull upstream master # Fetches upstream to master

# Squash the commit
git rebase -i <COMMIT> # Rebase everything AFTER this commit
```

<!-- TODO: instructions to use git instead of text above --> 

<!-- TODO -->  
6. Verify changes:
    * Ensure that the changes fulfill the code quality requirements and the files are formatted correctly (see [tools](https://phoenicisorg.github.io/scripts/General/tools/)).

<!-- END-OF-TODO -->

Once the commit is present on github make a push (pull) request
    * Make a one push (pull) request per script!
    * Example of the pull request (https://github.com/PhoenicisOrg/scripts/pull/797) :
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


### OLD TEXT ###

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