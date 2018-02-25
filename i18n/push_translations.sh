#!/bin/bash
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

python i18n/update_translations.py

# check if anything except "POT creation date" has changed
git diff --numstat i18n/keys.pot |  awk '{ if($1 == 1 && $2 == 1) { exit 1 } else exit 0 }'
if [ $? == 0 ];  then
    git add . *.pot *.po *.properties
    git commit --message "updated translations"
    git push https://${GH_TOKEN}@github.com/PhoenicisOrg/Scripts.git > /dev/null 2>&1
fi
