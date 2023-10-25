<br>
<br>
<br>
<br>
10/11/23 - Created the interface.<br>
10/17/23 - Added Spells page and functionality. Also added count to the page header.br
10/17/23 - Added image functionality for SPELLS and fixed responsiveness and media queries.br
10/18/23 - Added first version of detail display functionality. Added modal windows and many more images.<br>
10/18/23 - Fixed modal window close button to be fixed inside window.<br>
10/19/23 - Added footer to details view.<br>
10/19/23 - Added DC data point to details.<br>
10/19/23 - Updated the modal windows to remove itself once closed.<br>
10/19/23 - Added json files to localStorage folders as TEMPORARY files to avoid fetching from API while in development.<br>
10/20/23 - Did clean up and removed some functions that I incorporated into another function<br>
10/20/23 - Starting work on filter functionality<br>
10/20/23 - Made a Python function for making api info local and integrated some of them<br>
10/20/23 - Ran Python function on spells and localized all spell details<br>
10/21/23 - Updated some CSS - Added random image displayers, made backgrounds prettier<br>
10/21/23 - Cleaned up some functions and expanded dataCache<br>
10/21/23 - Created Python function for making filename lists for random picture displaying<br>
10/22/23 - Fixed buggy CSS<br>
10/22/23 - Made image loading asyncronous and added placeholders for missing images<br>
10/23/23 - Updated localCache files and file system for better performance<br>
10/23/23 - Added helper function extractPortion<br>
10/23/23 - Update(func) Migrating import functionality to use node.js require since I'm using localCache<br>
<br>
<br>
TTD<br>
<br>
Fix Nav Bar<br>
---Need drop down menus<br>
*1*Add more filter options<br>
Integrate Monsters, equipment, etc. that needs to be imported.<br>
Add if conditional for input of None on modal window items.<br>
Fix the modal window footer and header styles<br>
Figure out what to do about missing pictures<br>
---Make gifs using extra images<br>
*1*Continue building localCache<br>
Fix details for races and classes<br>
Think about how to create Python scripts that update local data<br>
<br>
<br>
<br>
Functions needing work:<br>
<br>
<br>
<br>
<br>
CREDITS:<br>
Traffic Cone Image courtesy of Tribaliumivanka @ depositphotos.com/vector/traffic-cone-icon-34326829.html<br>
<br>
<br>
NOTES:<br>
<br>
To use create_file_list.py:<br>
---1 Make sure you have Python installed<br>
---2 Place create_file_list.py in the folder one up from the folder that contains the files you want to include<br>
---3 Edit create_file_list.py so the folder_path variable matches the desired folder<br>
---3 Run with $ python3 create_file_list.py<br>
---4 The created file will be in the folder you are in<br>
<br>
<br>
To use localize_all_api_details:<br>
---1 Make sure you have Python installed<br>
---2 Place localize_all_api_details.py in the folder you desire to contain the files<br>
---3 Edit localize_all_api_details.py so the main_api_url variable holds the correct desired API endpoint<br>
---4 Run with $ python3 test_apiEndPointCopy.py<br>
---5 The folder you are in will contain all the newly created folders which contain the json files.
<br>
<br>
<br>


