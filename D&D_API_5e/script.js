/* Created on 10/11/23 by ArchILLtect */

const API_MAIN_URL = 'https://www.dnd5eapi.co/api/';

const pageHeaderDiv = document.getElementById('currentPageHeader');
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

let raceCount = '';
let classCount = '';
let spellCount = '';

const dataCache = {};

// Main Functions:
function goHome(page) {
    // Clear previous page
    clearPrevPage();

    // Set page header to HOME
    currentPage = page;
    SetHeader(currentPage);

    /* Use only if I decide to keep the global vars in an object
    globalData.currentPage = 'Homepage';
    SetHeader(globalData.currentPage);
    */

    // Add HOME info to <main>
    const homeArticle = document.createElement('article');
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
    homePage.appendChild(homePageTxt);
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
    mainElement.appendChild(homePage);
    mainElement.appendChild(homeArticle);
    homeArticle.id = "homeArticle"
};
goHome('homepage');

function SetHeader (title, count) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('currentPageHeader');
    let pageHeaderTxt = '';

    if (title == 'homepage') {
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title == 'races') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else if (title == 'classes') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else if (title == 'spells') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else {
        pageHeaderTxt = document.createTextNode('ERROR');
    }

    curPageHeader.appendChild(pageHeaderTxt);
    pageHeader.appendChild(curPageHeader);
};

async function fetchInfo(page) {

    // This URL is changed to use local files for fetching during dev.
    //const API_LOC_CUR = API_MAIN_URL + page;
    const API_LOC_CUR = `./localCache/${page}/localCache.json`;
    
    currentPage = page;
    //TODO Make a function to determine whether page is a 'main' or 'details' like in AddContent();
    
    if (verifyLoadNeed(dataCache, page, 'main')) {


        console.log('API LOAD NEEDED! LOAD NEEDED!');


        const apiPromise = await fetch(API_LOC_CUR);
        apiIndex = await apiPromise.json();

        apiData = apiIndex.results;
        apiCount = apiIndex.count;

        // Set data to variable to prevent loading from API on next run:
        setCount(apiCount, page)
        dataCache[page] = apiData;
        dataCache[page].details = [];
        addContent(apiData, setContentType(apiCount));

    } else {

        //CUR_COUNT = getCount(page);
        console.log('API Load NOT needed!');
        //setCount(apiCount, page)
        addContent(dataCache[page], setContentType(getCount(page)));

    }
};

async function fetchDetails(page) {
    //console.log(`At fetchDetails() page = ${page}`);

    // This URL is changed to use local files for fetching during dev.
    const API_LOC_CUR = API_MAIN_URL + currentPage + "/" + page;
    //const API_LOC_CUR = `./localCache/${currentPage}/${page}/localCache.json`;

    //const currentFetch = API_MAIN_URL + currentPage + "/" + page;
    
    pageType = 'details'
    detailData = dataCache[currentPage].details;

    if (verifyLoadNeed(detailData, page, pageType)) {


        console.log('API LOAD NEEDED! LOAD NEEDED!');


        const apiPromise = await fetch(API_LOC_CUR);
        apiIndex = await apiPromise.json();
        apiData = apiIndex.results;
        apiCount = apiIndex.count;

        // Cache the data:
        cacheData(apiIndex, currentPage);
        //addContent(apiData, apiCount);

        //SWITCH for - TOP = SPELLS AND BOTTOM = ALL ELSE For now/
        if (currentPage == 'spells') {
            createDetailsWindow(apiIndex);
        } else {
            createDetailsWindowNEW(apiIndex);
        };

    } else {

        //CUR_COUNT = GetCount(page);
        console.log('API Load NOT needed!');

        //addContent(dataCache[page], setContentType(getCount(page)));

        //SWITCH for - TOP = SPELLS AND BOTTOM = ALL ELSE For now/
        if (currentPage == 'spells') {
            createDetailsWindow(detailData[page]);
        } else {
            createDetailsWindowNEW(detailData[page]);
        };
    }
};

function addContent(data, type) {
    //console.log(`At addContent() currentPage = ${currentPage}`);
    //console.log(`At addContent() type = ${type}`)
    if (type === 'main') {
        addCards(data, getCount(currentPage));
    } else if (type === 'details'){
        addList(data, getCount(currentPage));
    } else { console.log( `Error - bad type in addContent function = line 146 to 151. current type = ${type}`) }
};

function addCards(data, count) {
    //console.log(data)

    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage, count);
    //SetHeader(globalData.currentPage);

    // Add cards to the page:
    data.forEach(eachItem => {
        createCard(eachItem);
    });

    readyFilter()

};

function addList(data, count) {

    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage, count);
    //SetHeader(globalData.currentPage);

    // Add list to the page:
    data.forEach(eachItem => {
    createList(eachItem);
    });

    readyFilter()

};

function createCard(data) {
    //console.log(`At createCard() currentPage = ${currentPage}`)
    const card = document.createElement('article');

    const cardName = document.createElement('h3');
    const cardNameTxt = document.createTextNode(data.name);
    cardName.appendChild(cardNameTxt);

    const cardPic = document.createElement('img');
    const cardNameRaw = data.index
    //TODO NEEDS NEW REGEX TO COVER ANY FOWARD SLASHES = (/) IN INPUTS
    const cardTitleName = cardNameRaw.replace(/ /g, "-");
    cardPic.id = cardTitleName
        

    const buttonContainer = document.createElement('div');
    const selectButton = document.createElement('button');
    const selectButtonTxt = document.createTextNode("Click for more info");
    selectButton.appendChild(selectButtonTxt);

    card.appendChild(cardName);
    card.appendChild(cardPic);
    card.appendChild(buttonContainer);   
    buttonContainer.appendChild(selectButton);
    mainElement.appendChild(card);

    const cardImg = document.querySelector(`#${data.index}`)

    cardImg.src = `./images/${currentPage}/${data.index}.jpg`;
    // cardImg.src = `./images/${globalData.currentPage}/${data.index}.jpg`;
    selectButton.addEventListener('click', () => { fetchDetails(cardNameRaw, cardImg) } );
};

function createList(data) {
    const listItem = document.createElement('article');

    const listItemName = document.createElement('h3');
    const listItemTxt = document.createTextNode(data.name);
    listItemName.appendChild(listItemTxt);

    const listItemPic = document.createElement('img');
    const itemNameRaw = data.index
    //TODO NEEDS NEW REGEX TO COVER ANY FOWARD SLASHES = (/) IN INPUTS
    const itemName = itemNameRaw.replace(/ /g, "-");
    listItemPic.id = itemName
    
    const buttonContainer = document.createElement('div');
    const selectButton = document.createElement('button');
    const selectButtonTxt = document.createTextNode("Click for more info");
    selectButton.appendChild(selectButtonTxt);


    listItem.appendChild(listItemName);
    listItem.appendChild(listItemPic);
    listItem.appendChild(buttonContainer);
    buttonContainer.appendChild(selectButton);
    mainElement.appendChild(listItem);

    const listItemImg = document.querySelector(`#${itemName}`)

    // TODO Uncomment line under to display photos
    listItemImg.src = `./images/${currentPage}/${data.index}.gif`;
    //listItemImg.src = `./images/${globalData.currentPage}/${data.index}.jpg`;
    selectButton.addEventListener('click', () => { fetchDetails(itemNameRaw, listItemImg) } );
};

/* async function getDetails(itemType) {
    console.log(itemType);
    const currentFetch = API_MAIN_URL + currentPage + "/" + itemType;
    //console.log(currentFetch);



    const detailsIndexPromise = await fetch(currentFetch);
    detailsIndex = await detailsIndexPromise.json();

    console.log(detailsIndex);

    // Cache the data:
    cacheData(detailsIndex, currentPage);

    //SWITCH for - TOP = SPELLS AND BOTTOM = ALL ELSE For now/
    if (currentPage == 'spells') {
        createDetailsWindow(detailsIndex);
    } else {
        createDetailsWindowNEW(detailsIndex);
    }
} */

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
    detailImage.src = `./images/${currentPage}/${data.index}.jpg`;
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


/*//////////////////////////
// Event Listeners:      //
//////////////////////////*/

// VARs - Main
homeNav = document.getElementById('#home');
characterNav = document.getElementById('#character');
monsterNav = document.getElementById('#moster');
itemNav = document.getElementById('#item');
miscNav = document.getElementById('#misc');
allNav = document.querySelectorAll('nav ul li a');

// NavBar:
function setNavListen() {
    allNav.forEach( eachItem => {
        eachItem.addEventListener('click', function(e){
            e.preventDefault();
            //console.log(eachItem.id)
            if (eachItem.id == 'home') {
                hideFilters()
                goHome('homepage');
            } else {
                hideFilters()
                fetchInfo(eachItem.id);
            }
        }); 
    });
};
setNavListen();

function readyFilter() {
    // VARs - Filter
    const filterInput = document.getElementById('filterInput');
    const filterContainer = document.getElementById('filterInputContainer');
    const spellFilter = filterContainer.getElementsByClassName('spellFilter');
    const itemList = document.getElementById('mainContent');
    const items = Array.from(itemList.getElementsByTagName('article'));

    if (currentPage === 'spells') { 

        for (const eachItem of spellFilter) {
            eachItem.style.display = 'block';
        }
    }

    // Filter:
    filterContainer.style.display = 'flex';
    filterInput.addEventListener('input', function () {
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
    classFilter.selectedIndex = -1;
    schoolFilter.selectedIndex = -1;

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

function verifyLoadNeed(asset, prop, type) {
    
    if (type === 'main') {
        const checkAsset = asset.hasOwnProperty(prop);
        if (checkAsset) {
            //console.log('Returning No')
            return false;
        } else {
            //console.log('Returning Yes')
            return true;
        }
    } else if(type === 'details') {
        const checkAsset = asset.hasOwnProperty(prop);

        if (checkAsset) {
            //console.log('Returning No')
            return false;
        } else {
            //console.log('Returning Yes')
            return true;
        }};
       
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

function cacheData(data, itemType) {
    const numberOfItems = Object.keys(data).length;
    //console.log(numberOfItems)

    if (numberOfItems > 1) {
        if (
            dataCache[itemType] &&
            dataCache[itemType].details &&
            dataCache[itemType].details[data.index] &&
            dataCache[itemType].details[data.index] === data
        ) {
            return;
        }
        if (!dataCache[itemType]) {
            dataCache[itemType] = {};
        }

        dataCache[itemType].details = dataCache[itemType].details || {};
        dataCache[itemType].details[data.index] = data;

        //console.log(`Caching data: ${itemType} object now has ${numberOfItems} items`);
        return;
    } else if (numberOfItems === 1) {
        console.log(`Caching data: ${itemType} object now has ${numberOfItems} items`);
        console.log('Check the data being used - why is it using a single object item??')
        return;
    } else {
        throw new Error('ERROR: Data did not cache. Data contains nothing or is corrupted.');
    }
};

/*
function cacheData(data, itemType) {
    const numberOfItems = Object.keys(data).length;
    console.log(numberOfItems)

    try {
        if (numberOfItems > 1) {
            if (dataCache[itemType].details[data.index] === data) {
                return;
            }
            if (!dataCache[itemType]) {
                dataCache[itemType] = {};
            }

            dataCache[itemType].details = dataCache[itemType].details || {};
            dataCache[itemType].details[data.index] = data;

            console.log(`Caching data: ${itemType} object now has ${numberOfItems} items`);
            return;
        } else if (numberOfItems === 1) {
            console.log(`Caching data: ${itemType} object now has ${numberOfItems} items`);
            console.log('Check the data being used - why is it using a single object item??')
            return;
        } else {
            throw new Error('ERROR: Data did not cache. Data contains nothing or is corrupted.');
        }
    } catch (error) {
        //console.error(error.message);
        // Handle the error or perform additional actions as needed.
    }
} */

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


// TODO TEMP function for count

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


/* 
function processItem(key, item, parentDiv) {
    if (Array.isArray(item)) {
        const arrayDiv = document.createElement('div');
        arrayDiv.id = 'detailItemsDiv' + key;
        parentDiv.appendChild(arrayDiv);

        const arrayName = document.createElement('p');
        arrayName.textContent = key.toUpperCase();
        arrayName.classList.add('detailTitle');
        arrayDiv.appendChild(arrayName);

        for (let i = 0; i < item.length; i++) {
            const arrayItem = item[i];
            const arrayItemDiv = document.createElement('div');
            arrayItemDiv.id = 'detailItemsDiv' + key + i;
            arrayDiv.appendChild(arrayItemDiv);

            const arrayItemName = document.createElement('p');
            arrayItemName.textContent = `Item ${i + 1}`;
            arrayItemName.classList.add('detailTitle');
            arrayItemDiv.appendChild(arrayItemName);

            const arrayItemText = document.createElement('p');
            arrayItemText.textContent = arrayItem;
            arrayItemText.classList.add('detailItem');
            arrayItemDiv.appendChild(arrayItemText);
        }
    } else if (typeof item === 'object') {
        const objectDiv = document.createElement('div');
        objectDiv.id = 'detailItemsDiv' + key;
        parentDiv.appendChild(objectDiv);

        const objectName = document.createElement('p');
        objectName.textContent = key.toUpperCase();
        objectName.classList.add('detailTitle');
        objectDiv.appendChild(objectName);

        for (const subKey in item) {
            if (item.hasOwnProperty(subKey)) {
                processItem(subKey, item[subKey], objectDiv);
            }
        }
    }
} */