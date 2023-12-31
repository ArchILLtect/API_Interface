# This file should not be moved from the update_scripts folder.
# Use this file to update the filterInfo.json file with current filtering details.
# Run by using the syntax: $ Python3 <filename>.py <type of data>  - Example: Python3 localize_all_api_details.py spells


import os
import requests
import json
import sys

if len(sys.argv) != 2:
    print("Usage: python3 fetch_and_filter_api.py <api_last_part>")
    sys.exit(1)

# Step 1: User-defined last part of the API URL (from command-line argument)
api_last_part = sys.argv[1]

#if not api_last_part.endswith("/"):
#    api_last_part += "/"

# Define the class_info dictionary
class_info = {}

# Step 2: Construct the main API URL
main_api_url = f"https://www.dnd5eapi.co/api/{api_last_part}"
response = requests.get(main_api_url)

if response.status_code == 200:
    data = response.json()
    details_data_list = []
    count = data.get("count", 0)

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
            # print(f"Detail data for {index}: {detail_data}")

            # Conditionally extract key-value pairs based on the value of sys.argv[1]
            if api_last_part == 'spells':
                index = detail_data.get("index", ""),
                name = detail_data.get("name", ""),
                url = detail_data.get("url", ""),
                school_index = detail_data.get("school", {}).get("index", "")
                classes = [cls.get("index") for cls in detail_data.get("classes", "")]
                damage_type = detail_data.get("damage", {}).get("damage_type", {}).get("index", "")
                dc_type = detail_data.get("dc", {}).get("dc_type", {}).get("index", [])
                aoe_type = detail_data.get("area_of_effect", {}).get("type", [])
                level = detail_data.get("level", [])
                distance = detail_data.get("range", "")
                attack_type = detail_data.get("attack_type", "")
                concentration = detail_data.get("concentration", [])
                ritual = detail_data.get("ritual", [])

                if "heal_at_slot_level" in detail_data:
                    heal_spell = True  # Set to True if the key exists
                else:
                    heal_spell = False  # Set to False if the key doesn't exist
                
                # Update class_info with a new structure
                details_data_list.append({
                    "index": index[0],
                    "name": name[0],
                    "url": url[0],
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
                })
                print(f'Data for {index} has been added to the file')
            elif api_last_part == 'magic-items':
                index = detail_data.get("index", "")
                name = detail_data.get("name", "")
                url = detail_data.get("url", "")
                type = detail_data.get("equipment_category", {}).get("index", "unknown")
                rarity = detail_data.get("rarity", {}).get("name", "unknown")
                description = detail_data.get("desc", [])
                if len(description) > 0:
                    first_string = description[0]
                    if "(requires attunement)" in first_string:
                        req_attune = True
                    else:
                        req_attune = False

                # Update class_info with a new structure
                details_data_list.append({
                    "index": index,
                    "name": name,
                    "url": url,
                    "type": type,
                    "rarity": rarity,
                    "req_attune": req_attune
                    # Add other information as needed
                })
                print(f'Data for {index} has been added to the file')
            elif api_last_part == 'skills':
                index = detail_data.get("index", "")
                name = detail_data.get("name", "")
                url = detail_data.get("url", "")
                ability_score = detail_data.get("ability_score", {}).get("index", "unknown")

                # Update class_info with a new structure
                details_data_list.append({
                    "index": index,
                    "name": name,
                    "url": url,
                    "ability_score": ability_score,
                    # Add other information as needed
                })
                print(f'Data for {index} has been added to the file')
            # Add more conditions for other data types
        else:
            print(f'Failed to retrieve data for {index} (Status Code: {detail_response.status_code})')

    # Step 6: Create a new file "filterInfo.json" and save filtered data with "filterData" object
    data_to_save = {
        "count": count,
        "filterData": details_data_list
        }

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
