#!/usr/bin/env python
from __future__ import print_function
import errno
import fnmatch
import json
import os
import re
import shutil
import subprocess

cwd = os.getcwd()
out_dir = cwd + '/i18n/tmp'

print("write xgettext input files to {}".format(out_dir))

# load all .json files
json_file_names = []
for root, dir_names, file_names in os.walk(cwd):
    for file_name in fnmatch.filter(file_names, '*.json'):
        path = os.path.join(root, file_name)
        # filter json's (we don't want jsdoc_conf.json etc.)
        if re.search(r'^' + cwd + '/(Applications|Engines|Utils).*\.json$', path):
            json_file_names.append(path)

data = {}
for file_name in json_file_names:
    with open(file_name) as f:
        data[file_name] = json.loads(f.read())

# get messages which shall be translated
for key, value in data.items():
    messages = []
    basename = os.path.basename(key)
    if basename == 'script.json':
        messages.append(data[key]['scriptName'])
    elif basename == 'application.json':
        messages.append(data[key]['name'])
        messages.append(data[key]['description'])
    elif basename == 'category.json':
        messages.append(data[key]['name'])

    # create dir if it doesn't exist
    out_file_name_json = out_dir + key[len(cwd):]
    out_file_name = os.path.splitext(out_file_name_json)[0] + '.js'
    out_file_dir_name = os.path.dirname(out_file_name)
    if not os.path.exists(out_file_dir_name):
        try:
            os.makedirs(out_file_dir_name)
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise

    # write messages to file
    with open(out_file_name, 'w') as out_file:
        print(" generating {}".format(out_file_name))
        for message in messages:
            # no empty strings
            if message:
                translated_message = u'tr("{0}")\n'.format(message)
                out_file.write(translated_message)

# load all .js files (including generated)
js_file_names = []
for root, dir_names, file_names in os.walk(cwd):
    for file_name in fnmatch.filter(file_names, '*.js'):
        path = os.path.join(root, file_name)
        path = os.path.relpath(path, cwd)
        # filter json's (we don't want .js files in doc etc.)
        if re.search(r'^(Applications|Engines|Utils|i18n/tmp).*\.js$', path):
            js_file_names.append(path)

# run xgettext to create keys.pot
print("\nrun xgettext to update the .properties")
pot_file = cwd + '/i18n/tmp/keys.pot'
xgettext = ['xgettext', '--from-code=UTF-8', '--language=Javascript', '-ktr', '-o', pot_file]
xgettext.extend(js_file_names)
ps = subprocess.Popen(xgettext, shell=False, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
print(ps.communicate()[0])

# run msgen to create Messages.properties
print("\nrun msgen to create Messages.properties")
properties_file = cwd + '/i18n/Messages.properties'
# sort output for better traceability of changes in git
msgen = ['msgen', '--sort-output', '--properties-output', '-o', properties_file, pot_file]
ps = subprocess.Popen(msgen, shell=False, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
print(ps.communicate()[0])

shutil.rmtree(out_dir)

# delete header (Crowdin interprets it as context of first string)
lines = []
regex = re.compile(r"\A.*Content-Transfer-Encoding\\: 8bit\\n\n\n", re.MULTILINE|re.DOTALL)
orig = ""
with open(properties_file) as input_file:
    orig = regex.sub("", input_file.read())
with open(properties_file, 'w') as output_file:
    for line in orig:
        output_file.write(line)
