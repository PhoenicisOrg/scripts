#!/usr/bin/env python
import errno
import fnmatch
import json
import os
import shutil
import subprocess

cwd = os.getcwd()
out_dir = cwd + '/i18n/tmp'

# load all .json files
json_file_names = []
for root, dir_names, file_names in os.walk(cwd):
    for file_name in fnmatch.filter(file_names, '*.json'):
        json_file_names.append(os.path.join(root, file_name))

data = {}
for file_name in json_file_names:
    with open(file_name) as f:
        data[file_name] = json.loads(f.read().decode("utf-8-sig"))

# get messages which shall be translated
for key, value in data.iteritems():
    messages = []
    basename = os.path.basename(key)
    if basename == 'application.json':
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
        for message in messages:
            # no empty strings
            if message:
                translated_message = u'tr("{0}")\n'.format(message)
                out_file.write(translated_message.encode('utf-8'))

# update the .pot
xgettext = 'find . -iname "*.js" | xargs -d \'\n\' xgettext --from-code=UTF-8 --language=Javascript -ktr -o i18n/keys.pot'
ps = subprocess.Popen(xgettext, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
ps.communicate()[0]

shutil.rmtree(out_dir)
