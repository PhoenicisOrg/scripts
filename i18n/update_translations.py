#!/usr/bin/env python
import errno
import fnmatch
import json
import os
import shutil
import subprocess

cwd = os.getcwd()

# update the .pot
print "\nrun xgettext to update the .pot"
xgettext = 'find . -iname "*.js" | sort | xargs -d \'\n\' xgettext --from-code=UTF-8 --language=Javascript -ktr -o i18n/keys.pot'
ps = subprocess.Popen(xgettext, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
ps.communicate()[0]

# merge .po's and update .properties for all available languages
print "\nmerge .po's and update .properties for all available languages"
languages = []
for root, dir_names, file_names in os.walk(cwd + '/i18n'):
    # the .po's are named lanuage.po (e.g. de.po)
    # therefore we can get the available languages by finding all .po's and removing the file extension
    for file_name in fnmatch.filter(file_names, '*.po'):
        languages.append(os.path.splitext(file_name)[0])
for language in languages:
    print " {}".format(language)
    # update .po with changes in .pot
    ps = subprocess.Popen('msgmerge -U i18n/{}.po i18n/keys.pot'.format(language), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    ps.communicate()[0]
    # generate .properties based on .po
    ps = subprocess.Popen('msgcat --properties-output i18n/{0}.po -o i18n/Messages_{0}.properties'.format(language), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    ps.communicate()[0]
