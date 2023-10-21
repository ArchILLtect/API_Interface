import os
import requests
import json
import subprocess

# Step 1: Fetch data from the main API endpoint
main_api_url = 'https://www.dnd5eapi.co/api/spells/'
response = requests.get(main_api_url)

if response.status_code == 200:
    data = response.json()

    # Step 2: Extract "index" values
    index_values = [item["index"] for item in data.get("results", []) if "index" in item]

    # Step 3: Create new URLs and execute the script for each URL
    for index_value in index_values:
        new_url = f'{main_api_url}{index_value}'
        
        # Fetch and save data using the same script
        response = requests.get(new_url)
        if response.status_code == 200:
            data = response.json()

            # Get the desired value to use for naming
            name_value = data.get("index", "unknown")

            # Create a directory with the name from the value
            directory_name = name_value
            os.makedirs(directory_name, exist_ok=True)

            # Create a file in the directory and write the data to it
            file_path = os.path.join(directory_name, f'{name_value}.json')
            with open(file_path, 'w') as file:
                json.dump(data, file, indent=4)

            print(f'Data saved to {file_path}')
        else:
            print(f'Failed to retrieve data from the API (Status Code: {response.status_code})')
else:
    print('Failed to retrieve data from the main API endpoint')
