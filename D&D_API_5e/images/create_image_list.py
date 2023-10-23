# Created on 10/22/23 by ArchILLtect
# Version 1.2

import os
import json
import sys

# Check if the correct number of command-line arguments is provided
if len(sys.argv) != 2:
    print("Usage: python3 create_file_list.py <target_folder>")
    sys.exit(1)

# Get the target folder from the command-line argument
folder_path = sys.argv[1]

# Check if the folder exists
if os.path.exists(folder_path) and os.path.isdir(folder_path):
    # Get the list of files in the folder
    filenames = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    
    # Calculate the file count
    file_count = len(filenames)
    
    # Create a dictionary with the folder name and the list of filenames
    data = {"filenames": filenames}
    
    # Create a JSON file with the data
    with open(f'{folder_path}.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)
    
    print(f'File list saved to {folder_path}.json')
else:
    print(f'The folder {folder_path} does not exist.')
