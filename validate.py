#!/usr/bin/env python
import argparse
import json
import jsonschema
import os
from PIL import Image
import sys

parser = argparse.ArgumentParser(description="Validates scripts")
parser.add_argument('--scripts_dir',
                    help="scripts directory (default: working directory)",
                    default=os.getcwd())
args = parser.parse_args()
scripts_dir = args.scripts_dir

is_valid = True

id_pattern = '^[a-z0-9_.]+$'

# get type directories
type_dirs = []
for type_dir in next(os.walk(scripts_dir))[1]:
    if os.path.isfile(scripts_dir + '/' + type_dir + '/type.json'):
        type_dirs.append(scripts_dir + '/' + type_dir)

# validate type.json
type_schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string'},
        'id': {'type': 'string', 'pattern': id_pattern},
    },
    'required': ['name', 'id']
}

for type_dir in type_dirs:
    type_json_file = type_dir + '/type.json'
    try:
        with open(type_json_file) as f:
            type_json = json.loads(f.read())
            jsonschema.validate(type_json, type_schema)
    except ValueError as value_error:
        print("invalid type.json {}: {}".format(type_json_file, value_error))
        is_valid = False
    except jsonschema.exceptions.ValidationError as validation_error:
        print("invalid type.json {}: {}".format(type_json_file, validation_error))
        is_valid = False

# get category directories
category_dirs = []
for type_dir in type_dirs:
    for category in next(os.walk(type_dir))[1]:
        if os.path.isfile(type_dir + '/' + category + '/category.json'):
            category_dirs.append(type_dir + '/' + category)

# validate category.json
category_schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string'},
        'id': {'type': 'string', 'pattern': id_pattern},
        'type': {'enum': ['FUNCTIONS', 'INSTALLERS']},
    },
    'required': ['name', 'id', 'type']
}

for category_dir in category_dirs:
    category_json_file = category_dir + '/category.json'
    try:
        with open(category_json_file) as f:
            category_json = json.loads(f.read())
            jsonschema.validate(category_json, category_schema)
    except ValueError as value_error:
        print("invalid category.json {}: {}".format(category_json_file, value_error))
        is_valid = False
    except jsonschema.exceptions.ValidationError as validation_error:
        print("invalid category.json {}: {}".format(category_json_file, validation_error))
        is_valid = False

# get application directories
application_dirs = []
for category_dir in category_dirs:
    for application in next(os.walk(category_dir))[1]:
        if os.path.isfile(category_dir + '/' + application + '/application.json'):
            application_dirs.append(category_dir + '/' + application)

# validate application.json
application_schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string'},
        'id': {'type': 'string', 'pattern': id_pattern},
        'description': {'type': 'string'},
    },
    'required': ['name', 'id', 'description']
}

for application_dir in application_dirs:
    application_json_file = application_dir + '/application.json'
    try:
        with open(application_json_file) as f:
            application_json = json.loads(f.read())
            jsonschema.validate(application_json, application_schema)
    except ValueError as value_error:
        print("invalid application.json {}: {}".format(application_json_file, value_error))
        is_valid = False
    except jsonschema.exceptions.ValidationError as validation_error:
        print("invalid application.json {}: {}".format(application_json_file, validation_error))
        is_valid = False

# get script directories
script_dirs = []
for application_dir in application_dirs:
    script_dirs_for_app = []
    for script in next(os.walk(application_dir))[1]:
        if os.path.isfile(application_dir + '/' + script + '/script.json') \
                and os.path.isfile(application_dir + '/' + script + '/script.js'):
            script_dirs_for_app.append(application_dir + '/' + script)
    if script_dirs_for_app:
        script_dirs.extend(script_dirs_for_app)
    else:
        print("application {} must contain at least one script directory with 'script.js' and 'script.json'".format(
            application_dir))
        is_valid = False

# validate script.json
script_schema = {
    'type': 'object',
    'properties': {
        'scriptName': {'type': 'string'},
        'id': {'type': 'string', 'pattern': id_pattern},
        'compatibleOperatingSystems': {
            'type': 'array',
            'items': {'enum': ['LINUX', 'MACOSX']},
            'maxItems': 2
        },
        'testingOperatingSystems': {
            'type': 'array',
            'items': {'enum': ['LINUX', 'MACOSX']},
            'maxItems': 2
        },
        'free': {'type': 'boolean'},
        'requiresPatch': {'type': 'boolean'},
    },
    'required': ['scriptName', 'id', 'compatibleOperatingSystems', 'testingOperatingSystems', 'free', 'requiresPatch']
}

for script_dir in script_dirs:
    script_json_file = script_dir + '/script.json'
    try:
        with open(script_json_file) as f:
            script_json = json.loads(f.read())
            jsonschema.validate(script_json, script_schema)
            # check that testingOperatingSystems is a subset of compatibleOperatingSystems
            if not set(script_json['testingOperatingSystems']) <= set(script_json['compatibleOperatingSystems']):
                print("{}: testingOperatingSystems must be a subset of compatibleOperatingSystems".format(script_json_file))
                is_valid = False
    except ValueError as value_error:
        print("invalid script.json {}: {}".format(script_json_file, value_error))
        is_valid = False
    except jsonschema.exceptions.ValidationError as validation_error:
        print("invalid script.json {}: {}".format(script_json_file, validation_error))
        is_valid = False

# check miniature
for application_dir in application_dirs:
    # do not check miniature for verbs etc.
    if "Applications" in application_dir:
        main_miniature_file = application_dir + '/miniatures/main.png'
        if os.path.isfile(main_miniature_file):
            image = Image.open(main_miniature_file)
            width, height = image.size
            if width != 400 or height != 300:
                print("main.png {} must be 400x300px".format(main_miniature_file))
                is_valid = False
        else:
            print("missing main.png: {}".format(main_miniature_file))
            is_valid = False

sys.exit(0 if is_valid else 1)
