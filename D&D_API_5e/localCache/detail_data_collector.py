import json
import requests

# Step 1: Create a variable source_file that the user defines
source_file = "localCache.json"  # Change this to the user-defined source file

# Step 2: Open the existing JSON file
with open(source_file, "r") as json_file:
    data = json.load(json_file)

# Step 3: Create a variable file_name
file_name = data["dataType"] + "DetailData"

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
