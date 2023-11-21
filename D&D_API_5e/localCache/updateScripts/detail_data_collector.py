# This file should not be moved from the update_scripts folder.
# Use a parameter that is a source folder to create a single file named "<parameter>DetailData.json" which holds all the details for all items of that type.
# Run by using the syntax: $ Python3 <filename>.py <source_folder> - Example: Python3 detail_data_collector.py example

import os
import json
import requests
import sys

# Step 1: User-defined source folder
if len(sys.argv) != 2:
    print("Usage: python3 detail_data_collector.py <source_folder>")
    sys.exit(1)

# Get the source folder from command-line arguments
source_folder = sys.argv[1]

# Check if source_folder ends with a forward slash, and add one if missing
""" if not source_folder.endswith("/"):
    source_folder += "/" """

# Assume localCache.json within the source folder
source_file_location = os.path.join(source_folder, "localCache.json")

# Extract the file name from the source_file_location
file_name = os.path.basename(source_file_location)

# Set the target directory to be one directory back towards the root from the source folder
# Define the target directory
target_directory = os.path.join('..', source_folder)

# Check if the provided parameters are "traits" or "subraces"
if sys.argv[1] in ["ability-scores","traits", "subraces", "subclasses"]:
    # Adjust target_directory for "traits" or "subraces"
    target_directory = os.path.join('..', 'Characters', source_folder)

# Change the current working directory to the target directory
os.chdir(target_directory)

# Step 2: Open the existing JSON file
with open(file_name, "r") as json_file:
    data = json.load(json_file)

# Step 3: Create a variable file_name
file_name = source_folder + "DetailData"

# Step 4: Create a new JSON file using the new var as its filename
output_file = file_name + ".json"

# Step 5: Process and fetch data from URLs
results = data["results"]
detail_data = {}  # Change to a dictionary

for item in results:
    full_url = "https://www.dnd5eapi.co" + item["url"]
    response = requests.get(full_url)

    if response.status_code == 200:
        detail_data[item["index"]] = response.json()  # Use "index" as the key
        print(f"Data for {item['name']} has been added to the file")
    else:
        print(f"Failed to fetch data for {item['name']}")

# Step 6: Add the fetched data to the output file
with open(output_file, "w") as output_json_file:
    json.dump(detail_data, output_json_file, indent=2)

print(f"Detail data saved to {output_file}")