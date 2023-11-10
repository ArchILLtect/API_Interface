# This file should not be moved from the update_scripts folder.
# Use this file to update the spellFilter,json file with current filtering details.
# Run by using the syntax: $ Python3 <filename>.py <type of data>  - Example: Python3 localize_all_api_details.py spells
# This is only set up for spells ATM


import os
import requests
import json
import sys

if len(sys.argv) != 2:
    print("Usage: python3 fetch_and_filter_api.py <api_last_part>")
    sys.exit(1)

# Step 1: User-defined last part of the API URL (from command-line argument)
api_last_part = sys.argv[1]

if not api_last_part.endswith("/"):
    api_last_part += "/"

# Define the class_info dictionary
class_info = {}

# Step 2: Construct the main API URL
main_api_url = f"https://www.dnd5eapi.co/api/{api_last_part}"
response = requests.get(main_api_url)

if response.status_code == 200:
    data = response.json()
    details_data = {}

    # Step 3: Extract "index" and "url" values for each object in the "results" array
    results = data.get("results", [])
    for item in results:
        index = item.get("index", "unknown")
        url = item.get("url")

        # Step 4: Construct details API URL
        detail_url = f"https://www.dnd5eapi.co{url}"
        detail_response = requests.get(detail_url)

        if detail_response.status_code == 200:
            detail_data = detail_response.json()
            # Extract the information you need from detail_data and store it in class_info
            print(f"Detail data for {index}: {detail_data}")

            # Example of extracting and storing "school" and "classes"
            school_index = detail_data.get("school", {}).get("index", "unknown")
            classes = [cls.get("index") for cls in detail_data.get("classes", [])]
            damage_type = detail_data.get("damage", {}).get("damage_type", {}).get("index", "unknown")
            dc_type = detail_data.get("dc", {}).get("dc_type", {}).get("index", "unknown")
            aoe_type = detail_data.get("area_of_effect", {}).get("type", "unknown")
            level = detail_data.get("level", "unknown")
            distance = detail_data.get("range", "unknown")
            attack_type = detail_data.get("attack_type", "unknown")
            concentration = detail_data.get("concentration", "unknown")
            ritual = detail_data.get("ritual", "unknown")

            if "heal_at_slot_level" in detail_data:
                heal_spell = True  # Set to True if the key exists
            else:
                heal_spell = False  # Set to False if the key doesn't exist
            
            # Update class_info with a new structure
            class_info[index] = {
                "school": school_index,
                "classes": classes,
                "damage": damage_type,
                "dc": dc_type,
                "aoe": aoe_type,
                "level": level,
                "range": distance,
		        "attack_type": attack_type,
		        "concentration": concentration,
		        "ritual": ritual,
                "healing_spell": heal_spell
                # Add other information as needed
            }

            print(f'Data for {index} has been added to the file')
        else:
            print(f'Failed to retrieve data for {index} (Status Code: {detail_response.status_code})')

    # Step 6: Create a new file "filterInfo.json" and save filtered data with "filterData" object
    data_to_save = {"filterData": class_info}
    # Define the directory path where you want to save the file
    save_dir = os.path.join('..', api_last_part)

    # Define the file path to save the file in the specified directory
    file_path = os.path.join(save_dir, 'filterInfo.json')

    # Save the file in the specified directory
    with open(file_path, 'w') as file:
        json.dump(data_to_save, file, indent=2)

    # Step 7: Print and save the file
    print("Data has been added to filterInfo.json")
else:
    print("Failed to retrieve data from the main API endpoint")
