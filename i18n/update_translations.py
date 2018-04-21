#!/usr/bin/env python
import errno
import fnmatch
import json
import os
import re
import shutil
import subprocess

cwd = os.getcwd()
out_dir = cwd + '/i18n/tmp'

print "write xgettext input files to {}".format(out_dir)

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
        data[file_name] = json.loads(f.read().decode("utf-8-sig"))

# get messages which shall be translated
for key, value in data.iteritems():
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
        print " generating {}".format(out_file_name)
        for message in messages:
            # no empty strings
            if message:
                translated_message = u'tr("{0}")\n'.format(message)
                out_file.write(translated_message.encode('utf-8'))

# load all .js files (including generated)
js_file_names = []
for root, dir_names, file_names in os.walk(cwd):
    for file_name in fnmatch.filter(file_names, '*.js'):
        path = os.path.join(root, file_name)
        path = os.path.relpath(path, cwd)
        # filter json's (we don't want .js files in doc etc.)
        if re.search(r'^(Applications|Engines|Utils|i18n/tmp).*\.js$', path):
            js_file_names.append(path)

# run xgettext to update .properties
print "\nrun xgettext to update the .properties"
properties_file = cwd + '/i18n/Messages.properties'
# sort output for better traceability of changes in git
xgettext = ['xgettext', '--sort-output', '--properties-output', '--from-code=UTF-8', '--language=Javascript', '-ktr',
            '-o', properties_file]
xgettext.extend(js_file_names)
ps = subprocess.Popen(xgettext, shell=False, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
print ps.communicate()[0]

shutil.rmtree(out_dir)

# delete date to avoid changes in git
lines = []
regex = re.compile(r"POT-Creation-Date\\:.*\\nPO-Revision-Date")
with open(properties_file) as input_file:
    for line in input_file:
        lines.append(regex.sub("POT-Creation-Date\: YEAR-MO-DA HO\:MI+ZONE\\\\nPO-Revision-Date", line))
with open(properties_file, 'w') as output_file:
    for line in lines:
        output_file.write(line)
