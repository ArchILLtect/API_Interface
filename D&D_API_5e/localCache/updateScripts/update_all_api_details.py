# This file should not be moved from the update_scripts folder.
# Use a parameter that is a source folder and a data type. Creates multiple files and their respective directories that each contain the details for that item.
# Run by using the syntax: $ Python3 <filename>.py <type of data>  - Example: Python3 update_all_api_details.py races

# Import the necessary modules
import os
import requests
import json
import subprocess
import sys  # Import the sys module

if len(sys.argv) != 2:
    print("Usage: python3 localize_all_api_details.py <api_last_part>")
    sys.exit(1)

# Step 1: User-defined last part of the API URL (from command-line argument)
api_last_part = sys.argv[1]

# Check if api_last_part ends with a forward slash, and add one if missing
if not api_last_part.endswith("/"):
    api_last_part += "/"

# Define the target directory
target_directory = os.path.join('..', api_last_part)

# Check if the provided parameters are "traits" or "subraces"
if sys.argv[1] in ["traits", "subraces"]:
    # Adjust target_directory for "traits" or "subraces"
    target_directory = os.path.join('..', 'Characters', api_last_part)

# Change the current working directory to the target directory
os.chdir(target_directory)

# Construct the main API URL
main_api_url = f'https://www.dnd5eapi.co/api/{api_last_part}'

# Fetch data from the main API endpoint
response = requests.get(main_api_url)

if response.status_code == 200:
    data = response.json()

    # Step 3: Extract "index" values
    index_values = [item["index"] for item in data.get("results", []) if "index" in item]

    # Step 4: Create new directories and save data in its compressed form
    for index_value in index_values:
        new_url = f'{main_api_url}{index_value}'

        # Check if the directory for this API endpoint exists
        directory_name = index_value
        os.makedirs(directory_name, exist_ok=True)

        # Check if a file with the same name as the item index exists
        file_path = os.path.join(directory_name, f'{index_value}.json')
        
        # Fetch and save data using the same script
        response = requests.get(new_url)
        if response.status_code == 200:
            data = response.json()
            compressed_data = json.dumps(data)

            if os.path.exists(file_path):
                    # Compare the data in the file with the data retrieved from the API
                    with open(file_path, 'r') as file:
                        local_data = json.load(file)

                    # Compare local_data with the data variable obtained from the API
                    if local_data == data:
                        print(f'Data identical - no update initiated.')
                    else:
                        # Update the local file with the new data
                        with open(file_path, 'w') as file:
                            file.write(compressed_data)
                            print(f'Data updated in {file_path}')
            else:
                # Create a file and write the compressed data to it
                with open(file_path, 'w') as file:
                    file.write(compressed_data)
                    print(f'Data saved to {file_path}')
        else:
            print(f'Failed to retrieve data from the API (Status Code: {response.status_code})')
else:
    print('Failed to retrieve data from the main API endpoint')