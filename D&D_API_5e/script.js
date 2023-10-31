/* Created on 10/11/23 by ArchILLtect */

const API_MAIN_URL = 'https://www.dnd5eapi.co/api/';
const MON_IMG_ALL = "./images/monsters.json";

const pageHeaderDiv = document.getElementById('pageHeader');
const mainElement = document.querySelector('main');
const homePage = document.createElement('h3');

let dataType = '';
let raceData = '';
let classData = '';
let spellData = '';
let currentPage = '';
let itemCounter = 1;
let apiCount = 0;

let apiData;
let jsonData;

let raceCount = '';
let classCount = '';
let spellCount = '';

const dataCache = {};

// Main Functions:
async function goHome(page) {

    currentPage = page;

    setMainClass();

    // Clear previous page
    clearPrevPage();

    // Set page header to HOME

    SetHeader(page);

    mainElement.classList.remove('sheets');
    mainElement.classList.add('homeContent');

    // Add HOME info to <main>
    const leftHomeArticle = document.createElement('article');
    const homeArticle = document.createElement('article');
    const rightHomeArticle = document.createElement('article');
    const homeImageSlot1 = document.createElement('img');
    const homeImageSlot2 = document.createElement('img');
    homeImageSlot1.src = "./images/page-elements/spinner-dnd.gif";
    homeImageSlot2.src = "./images/page-elements/spinner-dnd.gif";
    const homeArticleItem1 = document.createElement('p');
    const homeArticleItem2 = document.createElement('p');
    const homeArticleItem3 = document.createElement('p');
    const homeArticleItem4 = document.createElement('p');
    const homeArticleItem5 = document.createElement('p');
    const homePageTxt = document.createTextNode('Welcome to the homepage');
    const article1Txt1 = document.createTextNode('This page is under heavy construction! Please forgive the chaos! ');
    const article1Txt2 = document.createTextNode('This site is dedicated to bringing the data from the D&D 5e API to life!');
    const article1Txt3 = document.createTextNode('Please check in regurlarly for new updates. THX!!');
    const article1Txt4 = document.createTextNode('10/20/23 - COMING SOON: Editable and printable character sheets!!');
    const article1Txt5 = document.createTextNode('This site dedicated to Nick JR!!!');
    leftHomeArticle.appendChild(homeImageSlot1);
    homePage.appendChild(homePageTxt);
    homeArticle.appendChild(homePage);
    homeArticleItem1.appendChild(article1Txt1);
    homeArticleItem2.appendChild(article1Txt2);
    homeArticleItem3.appendChild(article1Txt3);
    homeArticleItem4.appendChild(article1Txt4);
    homeArticleItem5.appendChild(article1Txt5);
    homeArticle.appendChild(homeArticleItem1);
    homeArticle.appendChild(homeArticleItem2);
    homeArticle.appendChild(homeArticleItem3);
    homeArticle.appendChild(homeArticleItem4);
    homeArticle.appendChild(homeArticleItem5);
    rightHomeArticle.appendChild(homeImageSlot2);
    mainElement.appendChild(leftHomeArticle);
    mainElement.appendChild(homeArticle);
    mainElement.appendChild(rightHomeArticle);
    leftHomeArticle.id = "leftHomeArticle";
    homeArticle.id = "homeArticle";
    rightHomeArticle.id = "rightHomeArticle";

    await prepLoad('monsters', 'images');
  
    homeImageSlot1.src = imageRandomizer('monsters');
    homeImageSlot2.src = imageRandomizer('monsters');

};
goHome('home');

function SetHeader (title, count) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('pageHeader');
    let pageHeaderTxt = '';

    if (title === 'home' || title === 'sheets') {
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title === 'characters') {
        //TODO Once page is setup swap lines and delete unused line.
        //pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title === 'races') {

        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else if (title === 'classes') {

        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else if (title === 'spells') {

        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else if (title === 'monsters') {
        //TODO Once page is setup swap lines and delete unused line.
        //pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title === 'equipment') {
        //TODO Once page is setup swap lines and delete unused line.
        //pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title === 'misc') {
        //TODO Once page is setup swap lines and delete unused line.
        //pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else {
        pageHeaderTxt = document.createTextNode('ERROR');
    }

    curPageHeader.appendChild(pageHeaderTxt);
    pageHeader.appendChild(curPageHeader);
};
/*
async function fetchInfo(page) {

    // This URL is changed to use local files for fetching during dev.
    //const API_LOC_CUR = API_MAIN_URL + page;
    const API_LOC_CUR = `./localCache/${page}/localCache.json`;
    
    currentPage = page;
    //TODO Make a function to determine whether page is a 'main' or 'details' like in AddContent();
    
    if (verifyLoadNeed(page, 'main')) {

        console.log('API LOAD NEEDED! LOAD NEEDED!');

        const apiPromise = await fetch(API_LOC_CUR);
        apiIndex = await apiPromise.json();

        apiData = apiIndex.results;
        apiCount = apiIndex.count;

        // Set data to variable to prevent loading from API on next run:
 
        dataCache[page] = apiData;
        dataCache[page].details = [];
        addContent(apiData, setContentType(apiCount));

    } else {

        //CUR_COUNT = getCount(page);
        console.log('API Load NOT needed!');
        //setCount(apiCount, page)
        addContent(dataCache[page], setContentType(getCount(page)));

    }
}; */
 
function cacheData(data, itemType, itemName) {
    //console.log('@ cacheData: current dataCache on next log line:');
    //console.log(dataCache);
    // data = data to be stored
    // itemType = Used to identify the main list items
    //TODO dataType = 'main' or 'images'
    // itemName = Used only for detail items

    //console.log(data)

    function deepEqual(obj1, obj2) {
        if (obj1 === obj2) {
            //console.log('first');
          return true;
        }
      
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            //console.log('second');
          return false;
        }
      
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
            //console.log('third');
          return false;
        }
      
        for (const key of keys1) {
          if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            //console.log('fourth');
            return false;
          }
        }
        //console.log('fifth');
        return true;
      }

    const numberOfItems = Object.keys(data).length;
    //console.log(numberOfItems)

    if (itemName) {
        // This condiition caches single item details
    
        if (dataCache[itemType][itemName]) {
            if (deepEqual(dataCache[itemType][itemName], data)) {
                console.log(`${itemName} is already cached`);
                return;
            } else {
                console.log(`Data conflict for ${itemType} object. DataCache already contains items.`);
            }
        }

        dataCache[itemType][itemName] = dataCache[itemType][itemName] || {};
        dataCache[itemType][itemName] = data;
        console.log(`Caching data: ${itemType}/${itemName} object now has ${numberOfItems} items`);
        return;
    
    
    } else if (numberOfItems > 1 && data['count'] ) {
        // This condition caches main lists

        if (
            dataCache[itemType] &&
            dataCache[itemType] === data
        ) {
            console.log(`${itemType} is already cached`)
            return;
        }
        const checkAsset = Object.keys(dataCache[itemType]).length
        if (checkAsset > 0) {
            console.log('ERROR: The data cache holds the wrong data or the wrong data is trying to be stored in the<br>' + 
            `wrong place. ${data} is trying to go to dataCache[${itemType}]<br>` +
            `which already contains ${dataCache[itemType]}`);
            return;
        }

        dataCache[itemType] = dataCache[itemType] || {};
        data.results.forEach(item => {
            dataCache[itemType][item.index] = item;
        });
        const count = Object.keys(dataCache[itemType]).length;
        //console.log(`Caching data: ${itemType} object now has ${count} items`);
        return;

    } else if (data.filenames) {
        // This condition caches image lists
        if (
            dataCache['images'] &&
            dataCache['images'][itemType] === data
            ) {
            console.log('Data already exists');
            return;

        } else {
            dataCache['images'][itemType] = dataCache['images'][itemType] || {};
            dataCache['images'][itemType] = data.filenames;
            //console.log(`Caching data: images.${itemType} object now has ${numberOfItems} items`);
            return;
        }
    } else if (data.filterData) {
        // This condition caches filterData
        if (
            dataCache['filterData'] &&
            dataCache['filterData'][itemType] === data
            ) {
            console.log('Data already exists');
            return;

        } else {
            dataCache['filterData'][itemType] = dataCache['filterData'][itemType] || {};
            dataCache['filterData'][itemType] = data.filterData;
            console.log(`Caching data: images.${itemType} object now has ${numberOfItems} items`);
            return;
        }
    } else {
        console.log('ERROR: Data did not cache. Data contains nothing or is corrupted.');
    }
};

function addContent(data, type) {
    //console.log(`At addContent() currentPage = ${currentPage}`);
    if (type === 'main') {
        addCards(data, getCount(currentPage));
    } else if (type === 'list'){
        addList(data, getCount(currentPage));
    } else if (type === 'details'){
        addList(data, getCount(currentPage));
    } else { console.log( `Error - bad type in addContent function = line 146 to 151. current type = ${type}`) }
};

async function addCards(data, count) {

    setMainClass();
    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage, count);
    //SetHeader(globalData.currentPage);

    // Add cards to the page:
    for (const key in data) {
        createCard(data[key]);
    };

    const ALL_IMG = document.querySelectorAll('#mainContent article');
    const IMG_LIST_LOC = './images/' + currentPage + '.json';

    resetFilter();
    readyFilter();

    await prepLoad(currentPage, 'images')
    //await fetchData(IMG_LIST_LOC, currentPage, 'image');

    placeImages(ALL_IMG, 'card');

};

async function addList(data, count) {
    
    setMainClass();
    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage, count);
    //SetHeader(globalData.currentPage);

    //Load page's secondary data
    await prepLoad(currentPage, 'images');
    await prepLoad(currentPage, 'filterData');

    // Add list to the page:
    for (const key in data) {
        createListItem(data[key]);
    };

    const ALL_IMG = document.querySelectorAll('#mainContent article');
    const IMG_LIST_LOC = './images/' + currentPage + '.json';

    resetFilter();
    readyFilter();



    placeImages(ALL_IMG, 'list');

};

function createCard(data) {
    const cardNameRaw = data.index
    //console.log(data.index)
    //console.log(`At createCard() currentPage = ${currentPage}`)
    const card = document.createElement('article');
    card.id = cardNameRaw;

    const cardName = document.createElement('h3');
    const cardNameTxt = document.createTextNode(data.name);
    cardName.appendChild(cardNameTxt);

    const cardPic = document.createElement('img');

    //TODO NEEDS NEW REGEX TO COVER ANY FOWARD SLASHES = (/) IN INPUTS
    const cardTitleName = cardNameRaw.replace(/ /g, "-");
    cardPic.id = cardTitleName + 'Img';
        

    const buttonContainer = document.createElement('div');
    const selectButton = document.createElement('button');
    const selectButtonTxt = document.createTextNode("Click for more info");
    selectButton.appendChild(selectButtonTxt);

    card.appendChild(cardName);
    card.appendChild(cardPic);
    card.appendChild(buttonContainer);   
    buttonContainer.appendChild(selectButton);
    mainElement.appendChild(card);

    const cardImg = document.querySelector(`#${cardNameRaw}`);

    cardImg.src = "./images/page-elements/spinner-dnd.gif";
    // cardImg.src = `./images/${globalData.currentPage}/${data.index}.jpg`;
    selectButton.addEventListener('click', () => { prepLoad(currentPage, 'data', cardNameRaw) } );
};

function createListItem(data) {
    const itemNameRaw = data.index
    //console.log(data)
    //console.log(`At createCard() currentPage = ${currentPage}`)
    const listItem = document.createElement('article');
    listItem.id = itemNameRaw;
    
    const listItemName = document.createElement('h3');
    const listItemTxt = document.createTextNode(data.name);
    listItemName.appendChild(listItemTxt);

    const listItemPic = document.createElement('img');
  
    //TODO NEEDS NEW REGEX TO COVER ANY FOWARD SLASHES = (/) IN INPUTS
    const itemName = itemNameRaw.replace(/ /g, "-");
    listItemPic.id = itemName + 'Img';
    
    const buttonContainer = document.createElement('div');
    const deatilsButton = document.createElement('button');
    const selectButtonTxt = document.createTextNode("Click for more info");
    deatilsButton.appendChild(selectButtonTxt);


    listItem.appendChild(listItemName);
    listItem.appendChild(listItemPic);
    listItem.appendChild(buttonContainer);
    buttonContainer.appendChild(deatilsButton);
    mainElement.appendChild(listItem);

    //Add filter data to each list item
    //TODO P1-1 - FILTER - figure out how to deal with "non attributes" with values of "unknown"
    const curFilterData = dataCache.filterData[currentPage][data.index];
    //TODO P1-1 - FILTER - figure how to add filter data for class due to being an array and potentially having more than one data point
/*     if (curFilterData.classes.length > 1) {
        let acc = 1
        curFilterData.classes.forEach( dataItem => {
        listItem.setAttribute(`data-class${acc}`, dataItem);
        acc += 1;
        });
    } else if (curFilterData.classes.length === 1) {
        listItem.setAttribute('data-class', curFilterData.classes);
    } */

    if (curFilterData.classes.length > 1) {
        curFilterData.classes.forEach( dataItem => {
        const classesJSON = JSON.stringify(curFilterData.classes);
        //console.log(classesJSON)
        listItem.setAttribute('data-classes', classesJSON);
        });
    } else if (curFilterData.classes.length === 1) {
        listItem.setAttribute('data-class', curFilterData.classes);
    }

    listItem.setAttribute('data-school', curFilterData.school);
    listItem.setAttribute('data-level', curFilterData.level);
    listItem.setAttribute('data-damage_type', curFilterData.damage);
    listItem.setAttribute('data-range', curFilterData.range);
    listItem.setAttribute('data-aoe', curFilterData.aoe);
    listItem.setAttribute('data-conc', curFilterData.concentration);
    listItem.setAttribute('data-ritual', curFilterData.ritual);

    const listItemImg = document.querySelector(`#${itemNameRaw} img`);
    //console.log(listItemImg);

    listItemImg.src = "./images/page-elements/spinner-dnd.gif";
    deatilsButton.addEventListener('click', () => { prepLoad(currentPage, 'data', itemNameRaw) } );
};

function createDetailsWindow(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    //console.log(data)
    //console.log(`${data.index} has ${NUM_OF_ITEMS} data points.`);

    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //Name
    const detailsHeader = document.createElement('div');
    const detailName = document.createElement('h3');
    detailsHeader.appendChild(detailName);
    detailModal.appendChild(detailsHeader)
    detailsHeader.id = 'detailsHeader';
    detailName.textContent = data.name;

    //Image
    const detailImage = document.createElement('img');
    detailImage.src = `./images/${currentPage}/${data.index}.gif`;
    //listItemImg.src = `./images/${globalData.currentPage}/${data.index}.gif`;


    //Add Items
    const detailItemsDiv = document.createElement('div');
    detailItemsDiv.classList.add('detailItemsDiv');

    // For objects:
    for (const key in data) {

        if (data.hasOwnProperty(key)) {
            const eachItem = data[key];
            const currentItem = `detailItem${itemCounter}`;
            const detailItemDiv = document.createElement('div');
            detailItemDiv.id = 'detailItemsDiv' + key;
            const detailItem = document.createElement('p');
            const detailItemName = document.createElement('p');
            itemCounter++;

            if (key == 'desc') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Description:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Desc';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv);
            } else if (key == 'school') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'School:';
                detailItem.textContent = eachItem.name;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'School';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv);
            } else if (key == 'level') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Level:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Level';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv);
            } else if (key == 'higher_level') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Higher Level:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'HiLevel';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv);
            } else if (key == 'range') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Range:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Range';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'duration') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Duration:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Duration';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'casting_time') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Casting Time:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'CastTime';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'components') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Components:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Components';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'material') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Material:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Material';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); /* DOWN FROM HERE */
            } else if (key == 'ritual') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Ritual:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Ritual';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'concentration') {
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Concentration:';
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Concentration';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'dc') {
                const NUM_OF_ITEMS = Object.keys(data.dc).length;
                const CUR_KEY = key;

                let currentItems = [];
                // This ITEM has .name removed from the array push.
                for (const key in data[CUR_KEY]) {
                    currentItems.push(` ${eachItem[key]}`)
                }

                detailItem.textContent = `Type: ${data.dc.dc_type.name} / Success: ${data.dc.dc_success}`;

                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'DC:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'dc';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'heal_at_slot_level') {
                const NUM_OF_ITEMS = Object.keys(data.classes).length;
                const CUR_KEY = key;

                let currentItems = [];
                // This ITEM has .name removed from the array push.
                for (const key in data[CUR_KEY]) {
                    currentItems.push(` ${eachItem[key]}`)
                }

                detailItem.textContent = currentItems;

                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Heal at Slot Level:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'heal_at_slot_level';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'classes') {
                const NUM_OF_ITEMS = Object.keys(data.classes).length;
                const CUR_KEY = key;

                let currentItems = [];

                for (const key in data[CUR_KEY]) {
                    currentItems.push(` ${eachItem[key].name}`)
                }

                detailItem.textContent = currentItems;

                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Classes:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Classes';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'subclasses') {
                const NUM_OF_ITEMS = Object.keys(data.subclasses).length;
                const CUR_KEY = key;

                let currentItems = [];

                for (const key in data[CUR_KEY]) {
                    currentItems.push(` ${eachItem[key].name}`)
                }

                detailItem.textContent = currentItems;
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Subclasses:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Subclasses';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'area_of_effect') {
                const NUM_OF_ITEMS = Object.keys(data.area_of_effect).length;
                const CUR_KEY = key;

                let currentItems = [];

                for (const key in data[CUR_KEY]) {
                    currentItems.push(` ${eachItem[key].name}`)
                }

                //detailItem.textContent = currentItems;
                //TODO MANUALLY ADDED:
                detailItem.textContent = `Type: ${data.area_of_effect.type} / Size: ${data.area_of_effect.size}`;


                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Area of Effect:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Area_of_effect';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'attack_type') {
                const NUM_OF_ITEMS = Object.keys(data.attack_type).length;
                const CUR_KEY = key;

                let currentItems = [];

                for (const key in data[CUR_KEY]) {
                    currentItems.push(` ${eachItem[key].name}`)
                }

                detailItem.textContent = data.attack_type;
                
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Attack Type:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Attack_Type';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv); 
            } else if (key == 'damage') {
                // FIXME This doesn't work yet
                const NUM_OF_ITEMS = Object.keys(data.damage).length;
                const damageObject = data[key]
                //console.log(data[key])

            
                let currentItems = [];
                let damageTypeName = '';
                let damageType = [];
                let damageSlotLvlName = [];
                let damageSlotLvl = [];

                for (const damagekey in damageObject) {
                        //console.log(damageObject);
                        //console.log(damagekey);
                    if (!damageObject[damagekey].name) {
                        const damslotObject = damageObject[damagekey];
                        damageSlotLvlName = damagekey
                        //console.log(damagekey);
                        //console.log("No");
                        // Add items into a variable
                        //console.log(damageObject[damagekey]);
                            for (const damslotkey in damslotObject) {
                                //console.log(damslotObject[damslotkey]);
                                damageSlotLvl += ` ${damslotObject[damslotkey]}`
                                //damageSlotLvl += ` `
                            }


                    } else if (damageObject[damagekey].name) {
                        damageTypeName = damagekey
                        damageType = `${damageObject[damagekey].name}`;
                }
                }
                //GET THESE DISPLAYED
/*                 console.log(damageTypeName);
                console.log(damageType);
                console.log(damageSlotLvl);
                console.log(damageSlotLvlName) */
                // TODO MANUALLY DISPLAYED FOR NOW:
                const damageTypeTitle = document.createElement('p');
                //damageTypeTitle.textContent = damageTypeName
                damageTypeTitle.innerHTML = `Damage Type: <span id='damageTypeTitle'>${damageType}</span>`
                //const damageTypeItems = document.createElement('p');
                //damageTypeItems.textContent = damageType
                const damageSlotlvlTitle = document.createElement('p');
                //damageSlotlvlTitle.textContent = damageSlotLvlName
                //damageSlotlvlTitle.textContent = 'Damage at Slot Level:'
                damageSlotlvlTitle.innerHTML = `Damage at Slot Level: <span id='damageTypeItem'>${damageSlotLvl}</span>`
                //const damageSlotlvlItems = document.createElement('p');
                //damageSlotlvlItems.textContent = damageSlotLvl
                const damageItemsDiv = document.createElement('div');
                

                //const damageDiv = document.getElementById('detailItemsDivdamage');




                detailItem.textContent = currentItems;
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(damageItemsDiv);
                damageItemsDiv.id = 'damageItemsDiv';
                damageItemsDiv.appendChild(damageTypeTitle)
                //damageItemsDiv.appendChild(damageTypeItems);
                damageItemsDiv.appendChild(damageSlotlvlTitle);
                //damageItemsDiv.appendChild(damageSlotlvlItems);

                //detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = 'Damage:';
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Damage';
                detailItem.classList.add('detailItem');


                detailItemsDiv.appendChild(detailItemDiv);

                //damageDiv.appendChild(damageItemsDiv);
                //damageItemsDiv.appendChild(damageTypeTitle);

            } else {
                //console.log(`Did not add: ${key}`);
                /*
                detailItemsDiv.appendChild(detailItem);
                detailItem.id = currentItem;
                detailItem.classList.add('detailItem');
                detailItem.textContent = eachItem;
                */
            }
        }
    }

    const mainDetailsDiv = document.createElement('div');
    const detailsFooter = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const closeButton = document.createElement('button');
    mainDetailsDiv.appendChild(detailImage);
    mainDetailsDiv.appendChild(detailItemsDiv);
    mainDetailsDiv.classList.add('mainDetailContent');
    detailsFooter.appendChild(buttonContainer);
    detailsFooter.id = 'detailsFooter';
    closeButton.id = 'closeButton';
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.appendChild(closeButtonTxt);
    document.addEventListener('click', (event) => {
        if (event.target === detailModal) {
            detailModal.close();
            detailModal.remove();
        }
    });
    closeButton.addEventListener('click', () => {
        detailModal.close();
        detailModal.remove();
    });

    detailModal.showModal();
    detailModal.appendChild(mainDetailsDiv);
    detailModal.appendChild(detailsFooter)
    //detailModal.appendChild(buttonContainer);
    buttonContainer.appendChild(closeButton);
};

function createDetailsWindowNEW(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    //console.log(data)
    //console.log(`${data.index} has ${NUM_OF_ITEMS} data points.`);

    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //Name
    const detailsHeader = document.createElement('div');
    const detailName = document.createElement('h3');
    detailsHeader.appendChild(detailName);
    detailModal.appendChild(detailsHeader)
    detailsHeader.id = 'detailsHeader';
    detailName.textContent = data.name;

    //Image
    const detailImage = document.createElement('img');
    detailImage.className = 'detailImage'

    if (currentPage === 'spells') {
        detailImage.src = `./images/${currentPage}/${data.index}.gif`;
    } else {
        detailImage.src = `./images/${currentPage}/${data.index}.jpg`;
    }
    //listItemImg.src = `./images/${globalData.currentPage}/${data.index}.gif`;


    //Add Items
    const detailItemsDiv = document.createElement('div');
    detailItemsDiv.classList.add('detailItemsDiv');

        // For objects:
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                //console.log(data)
                //console.log(key)
                const eachItem = data[key];
                const currentItem = `detailItem${itemCounter}`;
                const detailItemDiv = document.createElement('div');
                detailItemDiv.id = 'detailItemsDiv' + key;
                const detailItem = document.createElement('p');
                const detailItemName = document.createElement('p');
                itemCounter++;
                detailItemDiv.appendChild(detailItemName);
                detailItemDiv.appendChild(detailItem);
                detailItemName.textContent = key.toUpperCase();
                detailItem.textContent = eachItem;
                detailItemName.classList.add('detailTitle');
                detailItem.id = currentPage + 'Desc';
                detailItem.classList.add('detailItem');
                detailItemsDiv.appendChild(detailItemDiv);
                for (const secondkey in data[key]) {
                    let newData = data[key];
                    //console.log(secondkey);
                    //console.log(data[key]);
                    if (Array.isArray(newData)) {
                        //console.log(data[key]);
                        //console.log(secondkey);
                        for (const lastkey in newData[key]) {
                            let lastData = newData[key];
                            console.log(lastkey);
                            console.log(lastData)

                        }
                    }
                };//typeof newKey === 'object'
            }//Array.isArray(key)
        };//newKey.hasOwnProperty(key)

    const mainDetailsDiv = document.createElement('div');
    const detailsFooter = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton'
    mainDetailsDiv.appendChild(detailImage);
    mainDetailsDiv.appendChild(detailItemsDiv);
    mainDetailsDiv.classList.add('mainDetailContent');
    detailsFooter.appendChild(buttonContainer);
    detailsFooter.id = 'detailsFooter';
    closeButton.id = 'closeButton';
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.appendChild(closeButtonTxt);



    detailModal.showModal();
    detailModal.appendChild(mainDetailsDiv);
    detailModal.appendChild(detailsFooter)
    //detailModal.appendChild(buttonContainer);
    buttonContainer.appendChild(closeButton);
        modalListeners()

};

function setUpSheets() {

    currentPage = 'sheets';
    setMainClass();

    mainElement.classList.remove('homeContent');
    mainElement.classList.add('sheets');

    clearPrevPage();
    SetHeader(currentPage);


    // Add HOME info to <main>
    const mainArticle = document.createElement('article');
    const characterSheet = document.createElement('iframe');
    characterSheet.id = 'sheet';
    characterSheet.src = "./src/templates/DnD_5E_CharacterSheet_-_Form_Fillable.pdf"
    const mainPageTxt = document.createTextNode('Welcome to the Character Sheets Page');

    homePage.appendChild(mainPageTxt);
    mainArticle.appendChild(homePage);
    mainArticle.appendChild(characterSheet);
    mainElement.appendChild(mainArticle);
    mainArticle.id = "mainArticle";

};

/*//////////////////////////
// Event Listeners:      //
//////////////////////////*/

// VARs - Main
homeNav = document.getElementById('#home');
characterNav = document.getElementById('#character');
monsterNav = document.getElementById('#monster');
itemNav = document.getElementById('#item');
miscNav = document.getElementById('#misc');
allNav = document.querySelectorAll('nav ul li a');

// NavBar:
function setNavListen() {
    allNav.forEach( eachItem => {
        eachItem.addEventListener('click', async function(e){
            e.preventDefault();
            //console.log(eachItem.id)
            if (eachItem.id === 'home' || eachItem.id === 'characters' || eachItem.id === 'monsters' || eachItem.id === 'equipment' || eachItem.id === 'misc') {
                hideFilters();
                goHome(eachItem.id);
            } else if (eachItem.id === 'sheets') {
                hideFilters();
                setUpSheets();
            } else if (eachItem.id === 'races' || eachItem.id === 'classes') {
                hideFilters();
                currentPage = eachItem.id;
                await prepLoad(eachItem.id);
                addContent(dataCache[eachItem.id], 'main');
            } else {
                console.log('ELSE')
                hideFilters();
                currentPage = eachItem.id;
                await prepLoad(eachItem.id);
                addContent(dataCache[eachItem.id], 'list');
            }
        }); 
    });
};
setNavListen();

/* ORIGINAL readyFilter
function readyFilter() {
    // VARs - Filter
    const filterInput = document.getElementById('filterInput');
    const filterContainer = document.getElementById('filterInputContainer');
    const spellFilter = filterContainer.getElementsByClassName('spellFilter');
    const itemList = document.getElementById('mainContent');
    const items = Array.from(itemList.getElementsByTagName('article'));
    const resultCountElement = document.getElementById('filterCount');
    const filterTypeSelect = document.getElementById('nameFilter');
    const filterClassSelect = document.getElementById('classFilter');
    const filterSchoolSelect = document.getElementById('schoolFilter');
    const filterLevelSelect = document.getElementById('levelFilter');
    const filterDamTypeSelect = document.getElementById('damTypeFilter');
    const filterToggleBtns = document.querySelectorAll(`.spellFilter button`)
    const resetButton = document.getElementById('resetFilter');

    let resultCount = items.length;

    if (currentPage === 'spells') { 
        for (const eachItem of spellFilter) {
            eachItem.style.display = 'block';
        }
    }

    startsWithFilter()
    includesFilter()

    // Initial count message
    resultCountElement.textContent = `This filter returns ${resultCount} entries.`;

    // Filter container
    filterContainer.style.display = 'flex';
 
    filterToggleBtns.forEach(item => {
        item.addEventListener( 'click', buttonToggle ); ;
    });
 
    // Add listener for reset button to reset filter results
    resetButton.addEventListener('click', resetFilter);

    function handleSelectChange() {
        // Remove existing event listeners
        //removeInputListeners();
        const schoolFilterBtn = document.getElementById('schoolFilterBtn');
    
        const selectedSchool = filterSchoolSelect.value;
        const selectedLevel = filterLevelSelect.value;
        const selectedDamageType = filterDamTypeSelect.value;
    
        const selectedOption = filterTypeSelect.value;

        startsWithFilter();
        includesFilter();

        if (schoolFilterBtn.className === 'filterToggleOn') {
            schoolFilter(selectedSchool)
        }

        // Ensure to update the result count after all filters are applied
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }

    // Helper Functions for filtering
    // *************************************************
    //Function for school filtering
    function schoolFilter(school) {
        items.forEach(item => {
            const itemSchool = item.dataset.school;
            if (school === 'all' || itemSchool === school) {
                if (item.style.display === 'none') {
                    item.style.display = 'block'
                } else {
                    return
                }
                //item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
            
        // Update the result count
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }

    //Function for class filtering
    function classFilter() {
        // Code goes here
    }

    //Function for level filtering
    function levelFilter(level) {
        if (level === 'all') {
            items.forEach(item => {
                item.style.display = 'block';
            });
        } else {
            items.forEach(item => {
                const itemLevel = item.dataset.level;
                if (itemLevel === level) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // Update the result count
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }

    //Function for damage_type filtering
    function damageTypeFilter(damageType) {
        if (damageType === 'all') {
            items.forEach(item => {
                item.style.display = 'block';
            });
        } else {
            items.forEach(item => {
                const itemDamType = item.dataset.damage_Type;
                if (itemDamType === damageType) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // Update the result count
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }

    //Function for range filtering
    function rangeFilter() {
        // code goes here
    }

    //Function for AoE filtering
    function aoeFilter() {
        // code goes here
    }

    // Function for "starts with" filtering
    function startsWithFilter() {
        const searchText = filterInput.value.trim().toLowerCase();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.startsWith(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Update the result count
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }

    // Function for "includes" filtering
    function includesFilter() {
        const searchText = filterInput.value.trim().toLowerCase();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (searchText === '' || text.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Update the result count
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }

    // Helper function for toggling filter options
    function buttonToggle(event) {
        const curButton = event.target
        if (curButton.className === 'filterToggleOff') {
            curButton.classList.remove('filterToggleOff');
            curButton.classList.add('filterToggleOn');
            curButton.textContent = "ON"
        } else {
            curButton.classList.remove('filterToggleOn');
            curButton.classList.add('filterToggleOff');
            curButton.textContent = "OFF"
        }
    }

    // Helper function to remove existing event listeners
    function removeInputListeners() {
        filterInput.removeEventListener('input', startsWithFilter);
        filterInput.removeEventListener('input', includesFilter);
    }

    // Add event listeners for filter changes
    filterSchoolSelect.addEventListener('change', handleSelectChange);
    filterLevelSelect.addEventListener('change', handleSelectChange);
    filterDamTypeSelect.addEventListener('change', handleSelectChange);
    filterTypeSelect.addEventListener('change', () => {
        // Remove existing event listeners
        removeInputListeners();

        const selectedOption = filterTypeSelect.value;

        if (selectedOption === 'startsWith') {
            nameFilter.options[0].disabled = true;
            filterInput.placeholder = "starts with";
            filterInput.value = '';

            // Add "starts with" event listener
            filterInput.addEventListener('input', startsWithFilter);
        } else if (selectedOption === 'includes') {
            nameFilter.options[0].disabled = true;
            filterInput.placeholder = "include";
            filterInput.value = '';
            
            // Add "includes" event listener
            filterInput.addEventListener('input', includesFilter);
        }



    });

};
 */

function readyFilter() {
    const filterInput = document.getElementById('filterInput');
    const filterContainer = document.getElementById('filterInputContainer');
    const filterLast = document.getElementById('filterLast');
    const spellFilter = filterContainer.getElementsByClassName('spellFilter');
    const itemList = document.getElementById('mainContent');
    const items = Array.from(itemList.getElementsByTagName('article'));
    const resultCountElement = document.getElementById('filterCount');
    const filterTypeSelect = document.getElementById('nameFilter');
    const filterClassSelect = document.getElementById('classFilter');
    const filterSchoolSelect = document.getElementById('schoolFilter');
    const filterLevelSelect = document.getElementById('levelFilter');
    const filterDamTypeSelect = document.getElementById('damTypeFilter');
    const filterRangeSelect = document.getElementById('rangeFilter');
    const filterAreaSelect = document.getElementById('areaFilter');



    const filterToggleBtns = document.querySelectorAll(`.spellFilter button`)
    const resetButton = document.getElementById('resetFilter');

    let resultCount = items.length;

    if (currentPage === 'spells') { 
        for (const eachItem of spellFilter) {
            eachItem.style.display = 'block';
        }
        filterLast.style.display = 'inline-flex';
    }



    resultCountElement.textContent = `This filter returns ${resultCount} entries.`;

    filterContainer.style.display = 'flex';

    // Add listener for reset button to reset filter results
    resetButton.addEventListener('click', resetFilter);
 
    filterToggleBtns.forEach(item => {
        item.addEventListener( 'click', buttonToggle ); ;
    });
 
    // Helper function for toggling filter options
    function buttonToggle(event) {
        const curButton = event.target
        if (curButton.className === 'filterToggleOff') {
            curButton.classList.remove('filterToggleOff');
            curButton.classList.add('filterToggleOn');
            curButton.textContent = "ON"
        } else {
            curButton.classList.remove('filterToggleOn');
            curButton.classList.add('filterToggleOff');
            curButton.textContent = "OFF"
        }
    }

    // Helper function to remove existing event listeners
    function removeInputListeners() {
        filterInput.removeEventListener('input', startsWithFilter);
        filterInput.removeEventListener('input', includesFilter);
    }

    const compileBtn = document.getElementById('resultsBtn');
    compileBtn.addEventListener('click', compileResults);

    function compileResults() {
        const selectedOption = filterTypeSelect.value;
        const selectedClass = filterClassSelect.value;
        const selectedSchool = filterSchoolSelect.value;
        const selectedLevel = filterLevelSelect.value;
        const selectedDamType = filterDamTypeSelect.value;
        const selectedRange = filterRangeSelect.value;
        const selectedArea = filterAreaSelect.value;



        items.forEach(item => {
            // Reset all items to the initial state
            item.style.display = 'block';
            const text = item.textContent.toLowerCase();
            const searchText = filterInput.value.trim().toLowerCase();

            const itemClasses = item.dataset.classes;
            const itemClass =  item.dataset.class;
            const itemSchool = item.dataset.school;
            const itemLevel = item.dataset.level;
            const itemDamType = item.dataset.damage_type;
            const itemRange = item.dataset.range;
            const itemArea = item.dataset.aoe;
            const itemConc = item.dataset.conc;
            const itemRitual = item.dataset.ritual;

            const classFilterBtn = document.getElementById('classFilterBtn');
            const schoolFilterBtn = document.getElementById('schoolFilterBtn');
            const levelFilterBtn = document.getElementById('levelFilterBtn');
            const damTypeFilterBtn = document.getElementById('damTypeFilterBtn');
            const rangeFilterBtn = document.getElementById('rangeFilterBtn');
            const areaFilterBtn = document.getElementById('areaFilterBtn');
            const concFilterBtn = document.getElementById('concFilterBtn');
            const ritualFilterBtn = document.getElementById('ritualFilterBtn');

            const classesJSON = item.getAttribute('data-classes');
            const classes = JSON.parse(classesJSON);

            if (selectedOption === 'startsWith') {
                if (!text.startsWith(searchText)) {
                    item.style.display = 'none';
                }
            } else if (selectedOption === 'includes') {
                if (searchText !== '' && !text.includes(searchText)) {
                    item.style.display = 'none';
                }
            }
            
            if (classFilterBtn.className === 'filterToggleOn' && selectedClass !== 'all') {
                let matchFound = false;

                if (itemClass) {
                    if (selectedClass === itemClass) {
                        matchFound = true
                    }
                } else if (itemClasses) {
                    classes.forEach( eachClass => {
                        if (selectedClass === eachClass) {
                            matchFound = true;
                        }
                    });
                }
                if (!matchFound) {
                    item.style.display = 'none';
                }
            }
            
            if (schoolFilterBtn.className === 'filterToggleOn' && selectedSchool !== 'all' && selectedSchool !== itemSchool) {
                item.style.display = 'none';
            }

            if (levelFilterBtn.className === 'filterToggleOn' && selectedLevel !== 'all' && selectedLevel !== itemLevel) {
                item.style.display = 'none';
            }

            if (damTypeFilterBtn.className === 'filterToggleOn' && selectedDamType !== 'all' && selectedDamType !== itemDamType) {
                item.style.display = 'none';
            }

            if (rangeFilterBtn.className === 'filterToggleOn' && selectedRange !== 'all' && selectedRange !== itemRange) {
                item.style.display = 'none';
            }

            if (areaFilterBtn.className === 'filterToggleOn' && selectedArea !== 'all' && selectedArea !== itemArea) {
                item.style.display = 'none';
            }

            if (concFilterBtn.className === 'filterToggleOn' && itemConc === 'false') {
                item.style.display = 'none';
            }

            if (ritualFilterBtn.className === 'filterToggleOn' && itemRitual === 'false') {
                item.style.display = 'none';
            }
        });
    
        const visibleItems = items.filter(item => item.style.display === 'block');
        resultCount = visibleItems.length;
        resultCountElement.textContent = `This filter returns ${resultCount} entries.`;
    }
};

function resetFilter() {
    const filterInput = document.getElementById('filterInput');
    const itemList = document.getElementById('mainContent');
    const items = Array.from(itemList.getElementsByTagName('article'));
    const resultCountElement = document.getElementById('filterCount');
    const filterTypeSelect = document.getElementById('nameFilter');


    // Reset the filter input
    filterInput.value = '';

    // Reset the display style of all items
    items.forEach(item => {
        item.style.display = 'block';
    });

    // Update the result count
    resultCount = items.length;
    resultCountElement.textContent = `This filter returns ${resultCount} entries.`;

    // Reset the filter type select
    filterTypeSelect.selectedIndex = 0;

    // Enable the first option in the filter type select
    nameFilter.options[0].disabled = false;
};

function hideFilters() {
    const filterInput = document.getElementById('filterInput');
    const filterContainer = document.getElementById('filterInputContainer');
    const classFilter = document.getElementById('classFilter');
    const schoolFilter = document.getElementById('schoolFilter');
    const spellFilter = filterContainer.getElementsByClassName('spellFilter');
    const itemList = document.getElementById('mainContent');
    const items = Array.from(itemList.getElementsByTagName('article'));

    //Clear the filter inputs:
    filterInput.value = '';
    //classFilter.selectedIndex = -1;
    //schoolFilter.selectedIndex = -1;

    //Hide the spells filters:
    for (const eachItem of spellFilter) {
        eachItem.style.display = 'none';
    };

    //Hide the name filter:
    filterContainer.style.display = 'none';

    //Remove the filter's event listener:
    filterInput.removeEventListener('input', function () {
        const searchText = filterInput.value.toLowerCase();
    
        items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
        });
    })
};

/*//////////////////////////
// Helper Functions:      //
//////////////////////////*/

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// Use removeAllChildNodes() function to clear the page.
function clearPrevPage() {
    removeAllChildNodes(homePage);
    removeAllChildNodes(pageHeaderDiv);
    removeAllChildNodes(mainElement);
};

function verifyLoadNeed(prop, dataType) {
    //const asset = dataCache
    
    if (dataType === 'main') {
        //const checkAsset = asset.hasOwnProperty(prop);
        const checkAsset = Object.keys(dataCache[prop]).length
        //console.log('Checking main...........');
        if (checkAsset > 0) {
            //console.log('Returning No')
            return false;
        } else {
            //console.log('Returning Yes')
            return true;
        }
    } else if (dataType === 'details') {
        //const checkAsset = asset[currentPage].hasOwnProperty(prop);
        const asset = dataCache[currentPage][prop]
        //console.log('Checking details...........');
        if (
            asset &&
            Object.keys(asset).length > 3
            ) {
            //console.log('Returning No')
            return false;
        } else {
            //console.log('Returning Yes')
            return true;
        }
    } else if (dataType === 'images') {
        //const checkAsset = asset['images'].hasOwnProperty(prop);
        const asset = dataCache['images'][prop]
        //console.log('Checking images...........');
        if (
            asset &&
            Object.keys(asset).length
            ) {
            //console.log('Returning No')
            return false;
        } else {
            //console.log('Returning Yes')
            return true;
        }
    } else if (dataType === 'filterData') {
        //const checkAsset = asset['images'].hasOwnProperty(prop);
        const asset = dataCache['filterData'][prop]
        //console.log('Checking images...........');
        if (
            asset &&
            Object.keys(asset).length
            ) {
            //console.log('Returning No')
            return false;
        } else {
            //console.log('Returning Yes')
            return true;
        }
    }
       
};

function modalListeners() {
    const closeButton = document.getElementById('closeButton')

   // Define named functions for event listeners
   function keydownListener(e) {
        if (e.key === 'Escape') {
            cleanUpModal();
        }};

    function clickListener(e) {
        if (e.target === detailModal) {
            cleanUpModal();
        }};

    function closeButtonListener() {
        cleanUpModal();
    }

    // Add event listeners
    document.addEventListener('keydown', keydownListener);
    document.addEventListener('click', clickListener);
    closeButton.addEventListener('click', closeButtonListener);

    /*     document.addEventListener('keydown', function keydownListener(e) {
            if (e.key === 'Escape') {
                cleanUpModal();
            }
        });
        document.addEventListener('click', function clickListener(e) {
            if (e.target === detailModal) {
                cleanUpModal();
            }
        });
        closeButton.addEventListener('click', function clickListener() {
            cleanUpModal();
        }); */

    function cleanUpModal() {
        const modal = document.getElementById('detailModal');
        modal.remove();
        
        // Remove event listeners
        document.removeEventListener('click', clickListener);
        document.removeEventListener('keydown', keydownListener);
        closeButton.removeEventListener('click', clickListener);
    }
};

function setContentType(count) {
    if (count > 20) {
        return 'details';
    } else {
        return 'main';
    }
};

//TODO P1-2 - Make this function the new loader!! And delete all obselete fetching functions!!
async function prepLoad(itemType, dataType='data', itemName) {
    // itemType: use this parameter only for main list items.
    // dataType: data or images. Leave blank for data lists.
    // itemName: use all three parameters for detail items. MUST enter data or images in second parameter if getting details.

    // FIXME P5 - It seems the var "location" is in scope at root - WHY? Try ti get rid of it and then use it here.
    let curLocation;

        if (dataType === 'data') {
            if (itemName) {
                // Get details
                //console.log('details!')
                dataCache[itemType][itemName] = dataCache[itemType][itemName] || {};

                const content = dataCache[itemType][itemName];
                curLocation = "./localCache/" + itemType + "/" + itemName + "/" + itemName + ".json";

                //(verifyLoadNeed(itemName, 'details')) {
                if (verifyLoadNeed(itemName, 'details')) {
                    console.log('API LOAD NEEDED! LOAD NEEDED!');
                    await fetchData(curLocation);
                    //
                    //TODO UPDATE - Move createDetailsWindowNEW to prepLoad like spells is done.
                    cacheData(apiData, itemType, itemName);
                    if (itemType === 'spells') {
                        createDetailsWindow(apiData);
                    } else {
                        createDetailsWindowNEW(apiData);
                    }
                } else {
                    console.log('API Load NOT needed!');
                    if (itemType === 'spells') {
                        createDetailsWindow(content);
                    } else {
                        createDetailsWindowNEW(content);
                    }
                }
            } else if (itemType === 'spells') {
                // Get spells main items list
                //console.log('spells')
                dataCache[itemType] = dataCache[itemType] || {};
                //console.log(itemType)
                const content = dataCache[itemType];
                curLocation = "./localCache/" + itemType + "/localCache.json";

                if (verifyLoadNeed(itemType, 'main')) {
                    console.log('API LOAD NEEDED! LOAD NEEDED!');
                    await fetchData(curLocation);
                    //console.log(itemType)
                    cacheData(apiData, itemType);
                    return;
                    //addContent Removed
                } else {
                    console.log('API Load NOT needed!');
                    return;
                    //addContent Removed(content, 'list'); 
                }
            } else {
                // Get main items list
                //console.log('main')
                dataCache[itemType] = dataCache[itemType] || {};
                //console.log(itemType)
                const content = dataCache[itemType];
                curLocation = "./localCache/" + itemType + "/localCache.json";

                if (verifyLoadNeed(itemType, 'main')) {
                    console.log('API LOAD NEEDED! LOAD NEEDED!');
                    await fetchData(curLocation);
                    //console.log(itemType)
                    cacheData(apiData, itemType);
                    return;
                    //addContent Removed
                } else {
                    console.log('API Load NOT needed!');
                    return;
                    //addContent Removed
                }
            }
        } else if (dataType === 'images') {
                // Get image list

                dataCache['images'] = dataCache['images'] || {};
                dataCache['images'][itemType] = dataCache['images'][itemType] || {};
/* 
                if (!dataCache['images']) {
                    dataCache['images'] = {}; // Initialize 'images' if it doesn't exist
                }

                if (!dataCache['images'][itemType]) {
                    dataCache['images'][itemType] = {}; // Initialize 'itemType' if it doesn't exist
                }
 */
                //let content = dataCache['images'][itemType];
                curLocation = "./images/" + itemType + "/" + itemType + "Images.json";
/* 
                if (!content) {
                    content = {}; // Initialize 'content' if it doesn't exist
                } */

                if (verifyLoadNeed(itemType, 'images')) {
                    //console.log(`@ prepLoad: itemType: ${itemType}`);
                    //console.log('@ prepLoad: apiIndex on next log line:');
                    //console.log(apiIndex);
                    console.log('API LOAD NEEDED! LOAD NEEDED!');
                    await fetchSecondaryData(curLocation, 'images');
                    cacheData(jsonData, itemType);
                } else {
                    console.log('API Load NOT needed!');
                }
        } else if (dataType === 'filterData') {

            dataCache['filterData'] = dataCache['filterData'] || {};
            dataCache['filterData'][itemType] = dataCache['filterData'][itemType] || {};

            curLocation = "./localCache/" + itemType + "/filterInfo.json";

            if (verifyLoadNeed(itemType, 'filterData')) {
                //console.log(`@ prepLoad: itemType: ${itemType}`);
                //console.log('@ prepLoad: apiIndex on next log line:');
                //console.log(apiIndex);
                console.log('API LOAD NEEDED! LOAD NEEDED!');
                await fetchSecondaryData(curLocation, 'filterData');
                cacheData(jsonData, itemType);
            } else {
                console.log('API Load NOT needed!');
            }
    } else {
            throw new Error(`ERROR: ${itemType} is a new data type or something is VERY wrong!!`)
        }
};

function imageRandomizer(itemType) {
    //console.log('at RNDMIZER');
    //console.log(dataCache);
    const FILE_NAMES = dataCache['images'][itemType];
    //console.log(FILE_NAMES);
    const FILE_NUM = FILE_NAMES.length;
    const RAND_NUM = Math.floor(Math.random() * FILE_NUM);
    const RAND_FILE = FILE_NAMES[RAND_NUM];
    const RAND_IMG = 'images/monsters/' + RAND_FILE
    //console.log(RAND_IMG);
    return RAND_IMG;
};

async function fetchData(curLocation) {
    //console.log(curLocation)

        const apiPromise = await fetch(curLocation);
        apiIndex = await apiPromise.json();
        //console.log(apiIndex)
        itemType = extractPortion(curLocation, 2)
        //console.log(itemType)
        apiData = apiIndex
        apiCount = apiIndex.count;

        setCount(apiCount, itemType);
        //console.log()
};

async function fetchSecondaryData(curLocation, dataType) {
    //console.log(curLocation)
    if (dataType === 'images') {
        const jsonPromise = await fetch(curLocation);
        jsonIndex = await jsonPromise.json();

        jsonData = jsonIndex;
        jsonCount = jsonIndex.count;

    } else if (dataType === 'filterData') {
        const jsonPromise = await fetch(curLocation);
        jsonIndex = await jsonPromise.json();

        jsonData = jsonIndex;
    } else {
        console.log('fetchSecondaryData failed due to bad dataType.')
    }
        

};

function placeImages(articles, type) {

    if (type === 'card') {
        const CUR_FILES = dataCache['images'][currentPage];
        //console.log(CUR_FILES)
        for (article of articles) {
            const CUR_NAME = article.id
            let currentFile;

            if (type === 'card') {
                currentFile = article.id + '.jpg';
            } else {
                currentFile = article.id + '.gif';
            }

            const CUR_IMG = document.getElementById(`${CUR_NAME}Img`);
            let matchFound = false;
            //console.log(CUR_NAME);
            //console.log(CUR_IMG);
            for (filename of CUR_FILES) {
                //console.log(`${filename} === ${CUR_FILE}`);
                if (filename === currentFile) {
                    //console.log(filename)
                    CUR_IMG.src = './images/' + currentPage + '/' + filename;
                    matchFound = true;
                    break;                 
                }
            }
            if (!matchFound) {
                // Set placeholder when no match is found
                CUR_IMG.src = './images/page-elements/image_placeholder.gif';
            }
        }

    } else {
        const CUR_FILES = dataCache['images'][currentPage]
        for (article of articles) {
            const CUR_NAME = article.id
            const CUR_FILE = article.id + '.gif';
            const CUR_IMG = document.getElementById(`${CUR_NAME}Img`);
            let matchFound = false;
            //console.log(CUR_NAME);
            //console.log(CUR_IMG);
            for (filename of CUR_FILES) {
                //console.log(`${filename} === ${CUR_FILE}`);
                if (filename === CUR_FILE) {
                    CUR_IMG.src = './images/' + currentPage + '/' + filename;
                    matchFound = true;
                } else {
                    
                }
            }
            if (!matchFound) {
                // Set placeholder when no match is found
                CUR_IMG.src = './images/page-elements/image_placeholder.gif';
            }
        };
    };

};

function setMainClass() {

    if (currentPage === 'races' || currentPage === 'classes') {
        mainElement.classList.remove('homeContent');
        mainElement.classList.remove('pageContent');
        mainElement.classList.remove('listContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('cardContent');
        return
    } else if (currentPage === 'spells') {
        mainElement.classList.remove('homeContent');
        mainElement.classList.remove('pageContent');
        mainElement.classList.remove('cardContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('listContent');
        return
    } else {
        mainElement.classList.remove('cardContent');
        mainElement.classList.remove('listContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('pageContent');
        return
    }

};

function extractPortion(string, portionIndex, separator="/") {
    // Ex. console.log(extractPortion(url, 0));  // Returns "www.example.co"
    // Ex. console.log(extractPortion(url, 4, "/"));  // Returns "with"
    // Takes a string and returns a string that consists of the wanted portion only

    string = string.trim().replace(/(^\/|\/$)/g, ''); // Remove leading/trailing separators ("/") and any trim
    const portions = string.split(separator).filter(part => part !== ''); // Filter out empty strings

    // Returns ERROR if portionIndex argument is invalid
    if (portionIndex < 0 || portionIndex >= portions.length) {
        return "ERROR: Invalid portion index";
    }

    // Remove https: if it exists so it doesn't ever return at all
    if (portions[0] === 'https:') {
        // Remove the "https:" portion
        portions.shift();
    }

    return portions[portionIndex];
}

// TEMP/EXPERIMENTAL FUNCTIONS:
// NOT USED
function countItems(obj) {
    let count = 0;

    function countRecursively(item) {
        if (typeof item === 'object' && !Array.isArray(item)) {
            for (const key in item) {
                countRecursively(item[key]);
                count++;
            }
        } else {
            count++;
        }
    }

    countRecursively(obj);
    console.log(`Total number of items: ${count}`);
};

// NOT USED
function findItems(objItem) {
    const itemKeys = Object.keys(objItem);
    let totalItems = 0;

    for (const key of itemKeys) {
        if (Array.isArray(objItem[key])) {
            console.log(`${key}:`);
            for (let i = 0; i < objItem[key].length; i++) {
                console.log(objItem[key][i].name)
                //console.log(`  [${i}] ${JSON.stringify(objItem[key][i])}`);
                totalItems++;
            }
        } else if (typeof objItem[key] === 'object') {
            console.log(`${key}:`);
            totalItems += findItems(objItem[key]);
        } else {
            console.log(`${key}: ${objItem[key]}`);
            totalItems++;
        }
    }

    return totalItems;
};

function checkCache() {
    console.log(dataCache)
};


// TODO TEMP?? function for count

function setCount(count, page) {
    if (page === 'races') {
        raceCount = count;
    } else if (page === 'classes') {
        classCount = count;
    } else if (page === 'spells') {
        spellCount = count;
    } else if (page === 'races') {
        raceCount = count;
    };
};

function getCount(page) {
    if (page === 'races') {
        return raceCount;
    } else if (page === 'classes') {
        return classCount;
    } else if (page === 'spells') {
        return spellCount;
    } else if (page === 'races') {
        return raceCount;
    };
};

//For DEV ONLY:


function checkSchools() {
    const allSpellObjects = dataCache.spells;

    for (const spell in allSpellObjects) {
        console.log(dataCache.spells[spell].school);
    }
};