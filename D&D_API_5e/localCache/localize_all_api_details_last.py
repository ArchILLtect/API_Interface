# BE SURE TO RUN THIS FILE INSIDE THE DIR/FOLDER YOU WANT THE DATA INSIDE OF!!
# Run by using the syntax: $ Python3 <filename>.py <type of data> - Example: Python3 localize_all_api_details.py races

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
        
        # Fetch and save data using the same script
        response = requests.get(new_url)
        if response.status_code == 200:
            data = response.json()
            
            # Get the desired value to use for naming
            name_value = data.get("index", "unknown")
            
            # Create a directory with the name from the value
            directory_name = index_value
            os.makedirs(directory_name, exist_ok=True)

            # Create a file in the directory and write the compressed data to it
            file_path = os.path.join(directory_name, f'{index_value}.json')
            with open(file_path, 'w') as file:
                compressed_data = json.dumps(data)
                file.write(compressed_data)

            print(f'Data saved to {file_path}')
        else:
            print(f'Failed to retrieve data from the API (Status Code: {response.status_code})')
else:
    print('Failed to retrieve data from the main API endpoint')
