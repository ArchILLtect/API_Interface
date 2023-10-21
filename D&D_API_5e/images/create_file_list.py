import os
import json

# Define the folder containing the images
folder_path = 'monsters'

# Check if the folder exists
if os.path.exists(folder_path) and os.path.isdir(folder_path):
    # Get the list of files in the folder
    filenames = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    
    # Create a dictionary with the folder name and the list of filenames
    data = {"filenames": filenames}
    
    # Create a JSON file with the data
    with open(f'{folder_path}.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)
    
    print(f'File list saved to {folder_path}.json')
else:
    print(f'The folder {folder_path} does not exist.')
