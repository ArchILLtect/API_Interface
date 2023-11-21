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
10/27/23 - Finally finished upgrading localCache, cacheData and the fetching functionalities<br>
10/27/23 - Created the filter_details_update script to create data for the filters<br>
10/29/23 - Major updates to filter functionality<br>
10/30/23 - Fix image placeholder for missing images<br>
10/30/23 - Fixed CSS for filters and main articles<br>
10/31/23 - Filter by class, concentration and ritual are now fully functional<br>
10/31/23 - Filter by range is now fully functional<br>
10/31/23 - Filter by AoE is now fully functional<br>
10/31/23 - Filter by DC saving throw and healing spells are both now fully functional<br>
10/31/23 - Fixed buggy CSS and updated it to accomodate changes<br>
10/31/23 - Upgraded localCache and site content to include MONSTERS! Minimal functionality currently though<br>
11/01/23 - Upgraded localCache and site content to include equipment-categories. Minimal functionality currently though<br>
11/01/23 - Upgraded localCache and site content to include EQUIPMENT! functionality currently though<br>
11/01/23 - Upgraded localCache and site content to include MAGIC ITEMS! Minimal functionality currently though<br>
11/01/23 - Upgraded localCache and site content to include weapon properties. Minimal functionality currently though<br>
11/01/23 - Upgraded localize_all_api_details to UPDATE AND add new non-existing detail data! Renamed to update_all_api_details<br>
11/04/23 - Upgraded cacheData to handle object item counts which makes getCount and setCount obselete<br>
11/04/23 - Updates to details<br>
11/05/23 - Added new fonts<br>
11/05/23 - Added resources<br>
11/06/23 - Added new fonts<br>
11/06/23 - Upgraded details modals and monsters details display<br>
11/08/23 - Updated details modals for races details display<br>
11/08/23 - Updated to add watermarks to details display<br>
11/09/23 - Updated Python scripts to run from the updateScripts folder<br>
11/09/23 - Upgraded localCache to include multiple new categories<br>
11/09/23 - Updated CSS, integrate traits and homepage info json files<br>
11/10/23 - Updated CSS, charaters homepage info json file and characters hompepage content<br>
11/10/23 - Upgraded races details to contain traits info<br>
11/10/23 - Added filter data<br>
11/12/23 - Added additional data source integration functionality<br>
11/12/23 - Added missing API basic subraces and traits<br>
11/12/23 - Upgraded main to integrate additonal-data for traits and subraces in localCache<br>
11/14/23 - Upgraded magic items list and detail display<br>
11/15/23 - Upgraded magic items list and detail display<br>
11/16/23 - Upgraded magic items list and detail display<br>
11/20/23 - Got rid of filterData object in dataCache and made filterData the base data for content<br>
11/20/23 - Clean up functions and updated Python scripts<br>
11/20/23 - Added localCache data for skills<br>
11/20/23 - Added localCache data for races<br>
11/21/23 - Upgraded update_all_api_details.py script to accept second parameter and to include class levels capability<br>
11/21/23 - Added localCache data for languages<br>
11/21/23 - Added localCache data for backgrounds<br>
11/21/23 - Added localCache data for class levels<br>
<br>
<br>
<br>
<br>
TTD:<br>
<br>
*3* Images for magic items getting error when clicked for details and then reload magic item list<br>
*1* Remove equipment-category as an item for items sub-menu<br>
*1*Get rid of the really bad MAIN selector and switch to class selectors<br>
*1*Upgrade Python scripts to check files and update with changes - IF changed<br>
Add page setup functions to prepare pages CSS and other info before loading. Add JS/CSS rule mixture to accomodate<br>
Fix Nav Bar:<br>
---Need drop down menus.<br>
Integrate Monsters, equipment, etc. that needs to be imported.<br>
Fix the modal window footer and header styles.<br>
Work on spells:<br>
---Make gifs using extra images.<br>
*1*Continue building localCache.<br>
Fix details for races and classes.<br>
*5*Fix the other Python scripts:<br>
---Make them able to be run from the updateScripts folder.<br>
---Fix filter_details_update.py to save better data into file - for example how it saves unknown data points.<br>
Think about how to create Python scripts that update local data.<br>
*2*Heavy cleaning<br>
---Clean up unused/obselete code within the functions.<br>
*5*Pics need to be cropped:<br>
---Equipment = the four "packs"<br>
---Conditions = all<br>
*5*Fix the main variables/ids that have dashes in them i.e. "magic-items", "weapon-proficiencies", etc.<br>
Functions needing work:<br>
---createDetailsWindow<br>
*7*Upgrade example usage comments for Python scripts<br>
<br>
<br>
<br>
CREDITS:<br>
Traffic Cone Image courtesy of Tribaliumivanka @ depositphotos.com/vector/traffic-cone-icon-34326829.html<br>
<br>
<br>
NOTES:<br>
<br>
To use filter_details_update.py:<br>
---1 Make sure you have Python installed<br>
---2 Run with $ python3 create_file_list.py <dataType><br>
---3 The created file will be placed in, or more likey replace, the old file in the folder you specify as the argument when running the script<br>
<br>
To use create_file_list.py:<br>
---1 Make sure you have Python installed<br>
---2 Place create_file_list.py in the folder one up from the folder that contains the files you want to include<br>
---3 Edit create_file_list.py so the folder_path variable matches the desired folder<br>
---3 Run with $ python3 create_file_list.py<br>
---4 The created file will be in the folder you are in<br>
<br>
<br>
To use update_all_api_details:<br>
---1 Make sure you have Python installed<br>
---2 If fetching new data create a folder with the data type(also API endpoint) as it's name in localCache folder<br>
---3 Run with $ python3 update_all_api_details.py <data type ex. "monsters"><br>
---4 The parameter passed will be the folder containing all the newly created folders which contain the json files<br>
<br>
<br>
Things to oconsider:<br>
Is filtering spells by casting time needed?<br>
<br>
