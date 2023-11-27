/* Created on 10/11/23 by ArchILLtect */

const API_MAIN_URL = 'https://www.dnd5eapi.co/api/';
const MON_IMG_ALL = "./images/monsters.json";

const pageHeaderDiv = document.getElementById('pageHeaderContainer');
const mainElement = document.querySelector('main');
const homePage = document.createElement('h3');

let dataType = '';
let currentPage = '';
let itemCounter = 1;

let apiData;
let jsonData;
let jsonIndex;
let addedData;

/*   //Filter Count Variable Declartions
    //Range Count Variable Declaration
let listItemCount = 0;
let valueSelf = 0;
let valueTouch = 0;
let valueSight = 0;
let lessThanTwentyFive = 0;
let twentyFiveToFifty = 0;
let fiftyToOneHundred = 0;
let oneHundredToTwoFifty = 0;
let twoFiftyToFiveHundred = 0;
let valueFeet = 0;
let valueOneMile = 0;
let valueSpecial = 0;
let valueUnlimited = 0;

let aoeItemCount = 0;
let aoeCone = 0;
let aoeCube = 0;
let aoeCylinder = 0;
let aoeLine = 0;
let aoeSphere = 0;
 */

const dataCache = {};
const localCacheAssets = {};

loadLCAssets();

// Main Functions:
async function goHome(page) {

    currentPage = page;
    setMainClass();
    clearPrevPage();
    SetHeader(page);

    mainElement.classList.remove('sheets');
    mainElement.classList.add('homePageContent');

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
    const homeArticleItem6 = document.createElement('p');
    const homePageTxt = document.createTextNode('Welcome to the homepage');
    const article1Txt1 = document.createTextNode('This page is under heavy construction! Please forgive the chaos! ');
    const article1Txt2 = document.createTextNode('This site is dedicated to bringing the data from the D&D 5e API to life!');
    const article1Txt3 = document.createTextNode('Please check in regurlarly for new updates. THX!!');
    const article1Txt4 = document.createTextNode('11/01/23 - ADDED MONSTERS AND ITEMS!!! Though be warned it needs LOTS of work still');
    const article1Txt5 = document.createTextNode('November 2023 -COMING SOON: Subclasses, subraces, feats, traits, skills and rule info!!');
    const article1Txt6 = document.createTextNode('Check the repo @ https://github.com/ArchILLtect/API_Interface');
    leftHomeArticle.appendChild(homeImageSlot1);
    homePage.appendChild(homePageTxt);
    homeArticle.appendChild(homePage);
    homeArticleItem1.appendChild(article1Txt1);
    homeArticleItem2.appendChild(article1Txt2);
    homeArticleItem3.appendChild(article1Txt3);
    homeArticleItem4.appendChild(article1Txt4);
    homeArticleItem5.appendChild(article1Txt5);
    homeArticleItem6.appendChild(article1Txt6);
    homeArticle.appendChild(homeArticleItem1);
    homeArticle.appendChild(homeArticleItem2);
    homeArticle.appendChild(homeArticleItem3);
    homeArticle.appendChild(homeArticleItem4);
    homeArticle.appendChild(homeArticleItem5);
    homeArticle.appendChild(homeArticleItem6);
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

async function charHome(page) {

    currentPage = page;
    setMainClass();
    clearPrevPage();
    SetHeader(page);

    await prepLoad(page, 'pageData');

    mainElement.classList.remove('sheets');
    mainElement.classList.add('homeContent');

    //Main Page
    const charMain = document.createElement('div');
    mainElement.appendChild(charMain);

    // Add Characters info to <main>
    const charRaceDiv = document.createElement('div');
    charMain.className = 'charMain'
    charMain.appendChild(charRaceDiv);

    //Races Header
    const charRaceHdr = document.createElement('div');
    charRaceHdr.className = 'homepageTxtHeader';
    charRaceHdr.textContent = 'Races';
    charRaceDiv.appendChild(charRaceHdr);

    //Races Introduction
    const raceIntro = document.createElement('div');
    const raceIntroPara1 = document.createElement('p');
    const raceIntroPara2 = document.createElement('p');
    const raceIntroPara3 = document.createElement('p');
    const raceIntroTxt1 = document.createTextNode(dataCache['characters']['pageData']['races']['intro'].para1);
    const raceIntroTxt2 = document.createTextNode(dataCache['characters']['pageData']['races']['intro'].para2);
    const raceIntroTxt3 = document.createTextNode(dataCache['characters']['pageData']['races']['intro'].para3);
    raceIntroPara1.appendChild(raceIntroTxt1);
    raceIntroPara2.appendChild(raceIntroTxt2);
    raceIntroPara3.appendChild(raceIntroTxt3);
    raceIntro.appendChild(raceIntroPara1);
    raceIntro.appendChild(raceIntroPara2);
    raceIntro.appendChild(raceIntroPara3);
    charRaceDiv.appendChild(raceIntro);
    raceIntro.id = "raceIntro";
    raceIntro.className = "homepageText";

    //Choosing a Race Header
    const raceChooseHdr = document.createElement('div');
    raceChooseHdr.className = 'detailTxtHeader';
    raceChooseHdr.textContent = 'Choosing a Race';
    charRaceDiv.appendChild(raceChooseHdr);

    //Choosing a Race
    const raceChoose = document.createElement('div');
    const raceChoosePara1 = document.createElement('p');
    const raceChoosePara2 = document.createElement('p');
    const raceChoosePara3 = document.createElement('p');
    const raceChoosePara4 = document.createElement('p');
    const raceChooseTxt1 = document.createTextNode(dataCache['characters']['pageData']['races']['chooseRace'].para1);
    const raceChooseTxt2 = document.createTextNode(dataCache['characters']['pageData']['races']['chooseRace'].para2);
    const raceChooseTxt3 = document.createTextNode(dataCache['characters']['pageData']['races']['chooseRace'].para3);
    const raceChooseTxt4 = document.createTextNode(dataCache['characters']['pageData']['races']['chooseRace'].para4);
    raceChoosePara1.appendChild(raceChooseTxt1);
    raceChoosePara2.appendChild(raceChooseTxt2);
    raceChoosePara3.appendChild(raceChooseTxt3);
    raceChoosePara4.appendChild(raceChooseTxt4);
    raceChoose.appendChild(raceChoosePara1);
    raceChoose.appendChild(raceChoosePara2);
    raceChoose.appendChild(raceChoosePara3);
    raceChoose.appendChild(raceChoosePara4);
    charRaceDiv.appendChild(raceChoose);
    raceChoose.id = "raceChoose";
    raceChoose.className = "homepageText"

    //Racial Traits Header
    const racialTraitsHdr = document.createElement('div');
    racialTraitsHdr.className = 'detailTxtHeader';
    racialTraitsHdr.textContent = 'Racial Traits';
    charRaceDiv.appendChild(racialTraitsHdr);

    //Racial Traits
    const racialTraits = document.createElement('div');
    const racialTraitsDesc = document.createElement('p');
    const racialTraitsDiv1 = document.createElement('div');
    const racialTraitsPara1 = document.createElement('p');
    const racialTraitsDiv2 = document.createElement('div');
    const racialTraitsPara2 = document.createElement('p');
    const racialTraitsDiv3 = document.createElement('div');
    const racialTraitsPara3 = document.createElement('p');
    const racialTraitsDiv4 = document.createElement('div');
    const racialTraitsPara4 = document.createElement('p');
    const racialTraitsDiv5 = document.createElement('div');
    const racialTraitsPara5 = document.createElement('p');
    const racialTraitsDiv6 = document.createElement('div');
    const racialTraitsPara6 = document.createElement('p');
    racialTraitsDesc.textContent = dataCache['characters']['pageData']['races']['racialTraits'].desc;
    racialTraitsPara1.innerHTML = `<span>Ability Score Increase</span>. ${dataCache['characters']['pageData']['races']['racialTraits'].abilScorInc}`;
    racialTraitsPara2.innerHTML = `<span>Age</span>. ${dataCache['characters']['pageData']['races']['racialTraits'].age}`;
    racialTraitsPara3.innerHTML = `<span>Size</span>. ${dataCache['characters']['pageData']['races']['racialTraits'].size}`;
    racialTraitsPara4.innerHTML = `<span>Speed</span>. ${dataCache['characters']['pageData']['races']['racialTraits'].speed}`;
    racialTraitsPara5.innerHTML = `<span>Languages</span>. ${dataCache['characters']['pageData']['races']['racialTraits'].languages}`;
    racialTraitsPara6.innerHTML = `<span>Subraces</span>. ${dataCache['characters']['pageData']['races']['racialTraits'].subraces}`;
    racialTraitsDiv1.className = 'racialTraitsDiv';
    racialTraitsDiv2.className = 'racialTraitsDiv';
    racialTraitsDiv3.className = 'racialTraitsDiv';
    racialTraitsDiv4.className = 'racialTraitsDiv';
    racialTraitsDiv5.className = 'racialTraitsDiv';
    racialTraitsDiv6.className = 'racialTraitsDiv';
    racialTraits.appendChild(racialTraitsDesc);
    racialTraits.appendChild(racialTraitsPara1);
    racialTraits.appendChild(racialTraitsPara2);
    racialTraits.appendChild(racialTraitsPara3);
    racialTraits.appendChild(racialTraitsPara4);
    racialTraits.appendChild(racialTraitsPara5);
    racialTraits.appendChild(racialTraitsPara6);
    charRaceDiv.appendChild(racialTraits);
    racialTraits.id = "racialTraits";
    racialTraits.className = "raceTraitsText";

    // Add Characters info to <main>
    const charClassDiv = document.createElement('div');
    charMain.appendChild(charClassDiv);
    
    //Classes Header
    const charClassHdr = document.createElement('div');
    charClassHdr.className = 'homepageTxtHeader';
    charClassHdr.textContent = 'Classes';
    charClassDiv.appendChild(charClassHdr);

    //Races Introduction
    const classIntro = document.createElement('div');
    const classIntroPara1 = document.createElement('p');
    const classIntroPara2 = document.createElement('p');
    const classIntroPara3 = document.createElement('p');
    const classIntroPara4 = document.createElement('p');
    const classIntroPara5 = document.createElement('p');
    const classIntroTxt1 = document.createTextNode(dataCache['characters']['pageData']['classes']['intro'].para1);
    const classIntroTxt2 = document.createTextNode(dataCache['characters']['pageData']['classes']['intro'].para2);
    const classIntroTxt3 = document.createTextNode(dataCache['characters']['pageData']['classes']['intro'].para3);
    const classIntroTxt4 = document.createTextNode(dataCache['characters']['pageData']['classes']['intro'].para4);
    const classIntroTxt5 = document.createTextNode(dataCache['characters']['pageData']['classes']['intro'].para5);
    classIntroPara1.appendChild(classIntroTxt1);
    classIntroPara2.appendChild(classIntroTxt2);
    classIntroPara3.appendChild(classIntroTxt3);
    classIntroPara4.appendChild(classIntroTxt4);
    classIntroPara5.appendChild(classIntroTxt5);
    classIntro.appendChild(classIntroPara1);
    classIntro.appendChild(classIntroPara2);
    classIntro.appendChild(classIntroPara3);
    classIntro.appendChild(classIntroPara4);
    classIntro.appendChild(classIntroPara5);
    charClassDiv.appendChild(classIntro);
    classIntro.id = "classIntro";
    classIntro.className = "homepageText";

    //Classes Summary Header
    const classChooseHdr = document.createElement('div');
    classChooseHdr.className = 'detailTxtHeader';
    classChooseHdr.textContent = 'Classes Summary';
    charClassDiv.appendChild(classChooseHdr);

    //Build the Classes Summary Table
    const classSummaryDiv = document.createElement('div');
    const classSummaryTable = document.createElement('table');
    const classSummaryKeys = Object.keys(dataCache['characters']['pageData']['classes']['classesSummary'][0]);
    const classSummaryData = dataCache['characters']['pageData']['classes']['classesSummary'];
    classSummaryDiv.className = 'class-summary-div';
    classSummaryTable.className = 'class-summary-table';
    charClassDiv.appendChild(classSummaryDiv);
    classSummaryDiv.appendChild(classSummaryTable);

    generateTable(classSummaryTable, classSummaryData);
    generateTableHead(classSummaryTable, classSummaryKeys);
};

function SetHeader (title, count) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('pageHeaderContainer');
    let pageHeaderTxt = '';

    //TODO PRelease When finished adding categories move lost consditional to Else and remove ERROR.
    if (title === 'home' || title === 'sheets' || title === 'characters' || title === 'items' || title === 'misc') {
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title === 'races' || title === 'classes' || title === 'spells' || title === 'monsters' || title === 'equipment' || title === 'magic-items' || title === 'weapon-properties' || title === 'conditions') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${count})`);
    } else if (title === 'equipCategories') {
        pageHeaderTxt = document.createTextNode(`EQUIPMENT CATEGORIES (${count})`);
    } else {
        pageHeaderTxt = document.createTextNode('ERROR');
    }

    curPageHeader.className = 'pageHeader'
    curPageHeader.appendChild(pageHeaderTxt);
    pageHeader.appendChild(curPageHeader);
};

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

            if (verifyLoadNeed(itemName, 'details')) {
                console.log('MAIN - API LOAD NEEDED! LOAD NEEDED!');
                await fetchData(curLocation);

                cacheData(apiData, itemType, itemName);
                if (itemType === 'spells') {
                    createDetailsWindow(apiData);
                } else if (currentPage === 'races') {
                    raceDetailsWindow(apiData);
                } else if (currentPage === 'classes') {
                    classDetailsWindow(apiData);
                } else if (currentPage === 'equipment') {
                    equipDetailsWindow(content);
                } else if (currentPage === 'magic-items') {
                    magicItemDetailsWindow(content);
                } else {
                    createDetailsWindowNEW(apiData);
                }
            } else {
                console.log('MAIN - API Load NOT needed!');
                console.log(`${itemType}, ${dataType}, ${itemName}`);
                if (itemType === 'spells') {
                    createDetailsWindow(content);
                } else if (currentPage === 'races') {
                    raceDetailsWindow(content);
                } else if (currentPage === 'classes') {
                    classDetailsWindow(content);
                } else if (currentPage === 'equipment') {
                    equipDetailsWindow(content);
                } else if (currentPage === 'magic-items') {
                    magicItemDetailsWindow(content);
                } else {
                    createDetailsWindowNEW(content);
                }
            } 
        } else {
            // Get spells, monsters & equipment main items list
            //console.log('main list items')
            dataCache[itemType] = dataCache[itemType] || {};
            //console.log(itemType)
            const content = dataCache[itemType];
            curLocation = "./localCache/" + itemType + "/filterInfo.json";

            if (verifyLoadNeed(itemType, 'main')) {
                console.log('MAIN - API LOAD NEEDED! LOAD NEEDED!');
                await fetchData(curLocation);
                cacheData(apiData, itemType);
                return;
            } else {
                console.log('MAIN - API Load NOT needed!');
                return;
            }
        } 
    } else if (dataType === 'pageData') {
        dataCache['characters'] = dataCache['characters'] || {};
        dataCache['characters'][dataType] = dataCache['characters'][dataType] || {};

        curFile = `./localCache/${capitalizeWords(itemType)}/${itemType}.json`;

        if (verifyLoadNeed(itemType, dataType)) {
            //console.log(`@ prepLoad: itemType: ${itemType}`);
            //console.log('@ prepLoad: apiIndex on next log line:');
            //console.log(apiIndex);
            console.log('MAIN - API LOAD NEEDED! LOAD NEEDED!');
            await fetchSecondaryData(curFile, dataType);
            cacheData(jsonData, itemType);
        } else {
            console.log('MAIN - API Load NOT needed!');
        }
    } else if (dataType === 'images') {
            // Get image list

            dataCache['images'] = dataCache['images'] || {};
            dataCache['images'][itemType] = dataCache['images'][itemType] || {};

            curLocation = "./images/" + itemType + "/" + itemType + "Images.json";

            if (verifyLoadNeed(itemType, 'images')) {
                //console.log(`@ prepLoad: itemType: ${itemType}`);
                //console.log('@ prepLoad: apiIndex on next log line:');
                //console.log(apiIndex);
                console.log('MAIN - API LOAD NEEDED! LOAD NEEDED!');
                await fetchSecondaryData(curLocation, 'images');
                cacheData(jsonData, itemType);
            } else {
                console.log('MAIN - API Load NOT needed!');
            }
    } else if (dataType === 'traits' || dataType === 'subraces'|| dataType === 'subclasses') {
        //console.log('traits prepping');
        dataCache['characters'] = dataCache['characters'] || {};
        dataCache['characters'][dataType] = dataCache['characters'][dataType] || {};

        curFile = `./localCache/Characters/${dataType}/${dataType}DetailsData.json`;
        if (verifyLoadNeed(itemType, dataType)) {
            //console.log(`@ prepLoad: itemType: ${itemType}`);
            //console.log('@ prepLoad: apiIndex on next log line:');
            //console.log(apiIndex);
            console.log('MAIN - API LOAD NEEDED! LOAD NEEDED!');
            await fetchSecondaryData(curFile, dataType);
            cacheData(jsonData, dataType);
        } else {
            console.log('MAIN - API Load NOT needed!');
        }
    } else {
        throw new Error(`ERROR: ${dataType} is a new data type or something has gone VERY wrong!!`)
    }
};

async function prepLoadSecondary(itemType, dataType='data', itemName) {

    let dataLocation;
    if (dataType === 'levels') {
        dataLocation = `./localCache/classes/${itemName}/levels/${itemName}-levels.json`;
    }

    dataCache['characters'][dataType] = dataCache['characters'][dataType] || {}

    if (verifyLoadNeed(itemName, dataType)) {
        //console.log(`@ prepLoad: itemType: ${itemType}`);
        //console.log('@ prepLoad: apiIndex on next log line:');
        //console.log(apiIndex);
        console.log('ADDED - API LOAD NEEDED! LOAD NEEDED!');
        await fetchSecondaryData(dataLocation, 'levels')
        dataCache['characters'][dataType][itemName] = jsonIndex;
    } else {
        console.log('ADDED - API Load NOT needed!');
    }
};

async function prepLoadAddition(itemType) {

    let dataLocation;
    if (itemType === 'subraces' || itemType === 'traits') {
        dataCache['characters'] = dataCache['characters'] || {};
        dataCache['characters'][itemType] = dataCache['characters'][itemType] || {};
        dataLocation = `./localCache/Characters/${itemType}/localCacheAdditonal.json`
    } else {
        dataLocation = `./localCache/${itemType}/localCacheAdditonal.json`
    }
    localCacheAssets['additional-data'][itemType] = localCacheAssets['additional-data'][itemType] || {};

    if (verifyLoadNeed(itemType, 'additional-data')) {
        //console.log(`@ prepLoad: itemType: ${itemType}`);
        //console.log('@ prepLoad: apiIndex on next log line:');
        //console.log(apiIndex);
        console.log('ADDED - API LOAD NEEDED! LOAD NEEDED!');
        await fetchAddedData(dataLocation);
        //TODO CHANGE THIS
        //cacheData(apiAdditionIndex, itemType, 'added');
        localCacheAssets['additional-data'][itemType] = apiAdditionIndex;
        const additionItems = localCacheAssets['additional-data'][itemType]['results'];
        if (itemType === 'subraces' || itemType === 'traits') {
            for (const key in additionItems) {
                const eachItem = additionItems[key];
                const curLocation = `./localCache/Characters/${itemType}/${eachItem.index}/${eachItem.index}.json`
                await fetchAddedData(curLocation);
                cacheData(apiAdditionIndex, itemType, 'added');
            }
        } else {
            for (const key in additionItems) {
                const eachItem = additionItems[key];
                const curLocation = `./localCache/${itemType}/${eachItem.index}/${eachItem.index}.json`
                await fetchAddedData(curLocation);
                cacheData(apiAdditionIndex, itemType, 'added');
            }
        }
    } else {
        console.log('ADDED - API Load NOT needed!');
    }
};

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

    if (itemName && itemName !== 'added') {
        // This condiition caches single item details
    
        if (dataCache[itemType][itemName]) {
            if (deepEqual(dataCache[itemType][itemName], data)) {
                //console.log(`${itemName} is already cached`);
                return;
            } else {
                //console.log(`Data conflict for ${itemType} object. DataCache already contains items.`);
            }
        }

        dataCache[itemType][itemName] = dataCache[itemType][itemName] || {};
        dataCache[itemType][itemName] = data;
        //console.log(`Caching data: ${itemType}/${itemName} object now has ${numberOfItems} items`);
        return;
    
    
    } else if (itemName === 'added') {
        //console.log(data)
        const dataIndex = data.index
        // This condition caches additonal data
        let currentData;
        if (itemType === 'traits' || itemType === 'subraces' ) {
            currentData = dataCache['characters'][itemType];
        } else {
            currentData = dataCache[itemType];
        }
        if (!currentData[dataIndex]) {
            currentData[dataIndex] = data;
        }
        //console.log(`Caching data: ${itemType} object has been added`);
        return;
    } else if (numberOfItems > 1 && data['count']) {
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
            `which already contains:`);
            console.log(dataCache[itemType])
            return;
        }

        dataCache[itemType] = dataCache[itemType] || {};

        data.filterData.forEach(item => {
            dataCache[itemType][item.index] = item;
        });

        dataCache['count'] = dataCache['count'] || {};
        dataCache['count'][itemType] = data.count;
        const count = Object.keys(dataCache[itemType]).length;
        //console.log(`Caching data: ${itemType} object now has ${count} items`);
        return;

    } else if (data.pageData) {
        // This condition caches pageData
        if (
            dataCache['characters'] &&
            dataCache['characters']['pageData'] === data
            ) {
            console.log('Data already exists');
            return;

        } else {
            dataCache['characters']['pageData'] = dataCache['characters']['pageData'] || {};
            dataCache['characters']['pageData'] = data.pageData;
            console.log(`Caching data: ${itemType}.pageData object now has ${numberOfItems} items`);
            return;
        }
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
    } else if (data.traitsData || data.subracesData  || data.subclassesData) {
        const curData = `${itemType}Data`;
        // This condition caches traitsData and subracesData
        if (
            dataCache['characters'] &&
            dataCache['characters'][itemType] === data
            ) {
            console.log('Data already exists');
            return;

        } else {
            dataCache['characters'][itemType] = dataCache['characters'][itemType] || {};
            dataCache['characters'][itemType] = data[curData];
            //console.log(`Caching data: images.${itemType} object now has ${numberOfItems} items`);
            return;
        }
    } else {
        console.log('ERROR: Data did not cache. Data contains nothing or is corrupted.');
    }
};

//TODO P3-1 I think I can reduce the conditional statements by reusing for some
function verifyLoadNeed(prop, dataType) {
    //console.log('verifyLoadNeed running...')
    //console.log(prop)
    //console.log(dataType)
    
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
        if (currentPage === 'skills' || currentPage === 'monsters' || currentPage === 'spells' || currentPage === 'equipment' || currentPage === 'magic-items') {
            //const checkAsset = asset[currentPage].hasOwnProperty(prop);
            //ADD NEW DETAILS
            const asset = dataCache[currentPage][prop]
            let filterFacetCount = 0;
            if (currentPage === 'skills') {
                filterFacetCount = 4
            } else if (currentPage === 'monsters') {
                filterFacetCount = 3
            } else if (currentPage === 'spells') {
                filterFacetCount = 14
            } else if (currentPage === 'equipment') {
                filterFacetCount = 3
            } else if (currentPage === 'magic-items') {
                filterFacetCount = 6
            } else {
                filterFacetCount = 3
            }
            //console.log('Checking details...........');
            if (
                asset &&
                Object.keys(asset).length > filterFacetCount
                ) {
                //console.log('Returning No')
                return false;
            } else {
                //console.log('Returning Yes')
                return true;
            }
        } else {
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
        }
    } else if (dataType === 'pageData') {
        //const checkAsset = asset['images'].hasOwnProperty(prop);
        const asset = dataCache[prop][dataType]
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
    } else if (dataType === 'traits' || dataType === 'subraces' || dataType === 'subclasses') {
        const asset = localCacheAssets['additional-data'][dataType]
        //console.log(`Checking ${dataType}...........`);
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
    } else if (dataType === 'additional-data') {
        const asset = localCacheAssets['additional-data'][prop]
        //console.log('Checking additional Data...........');
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
    } else if (dataType === 'levels') {
        const asset = dataCache['characters'][dataType][prop]
        //console.log('Checking additional Data...........');
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

function addContent(data, type) {
    //console.log(`At addContent() currentPage = ${currentPage}`);
    if (type === 'main') {
        addCards(data, dataCache.count[currentPage]);
    } else if (type === 'list'){
        addList(data, dataCache.count[currentPage]);
    } else if (type === 'details'){
        addList(data, dataCache.count[currentPage]);
    } else { console.log( `Error - bad type in addContent function = line 146 to 151. current type = ${type}`) }
};

async function addCards(data, count) {
  
    setMainClass();
    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage, count);

    await prepLoad(currentPage, 'images');
    if (currentPage === 'races') {
        //FIXME Use prepLoadSecondary for these instead of prepLoad
        await prepLoad(currentPage, 'traits');
        await prepLoad(currentPage, 'subraces');
    }
    if (currentPage === 'classes') {
        await prepLoad(currentPage, 'subclasses');
    }

    await prepLoadAddition('traits');
    await prepLoadAddition('subraces');
    // Add cards to the page:
    for (const key in data) {
        createCard(data[key]);
    };

    const ALL_IMG = document.querySelectorAll('#mainContent article');
    const IMG_LIST_LOC = './images/' + currentPage + '.json';

    resetFilter();
    readyFilter();

    //await fetchData(IMG_LIST_LOC, currentPage, 'image');

    placeImages(ALL_IMG, 'card');
};

async function addList(data, count) {
    setMainClass();
    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage, count);

    //Load page's secondary data
    await prepLoad(currentPage, 'images');

    // Add list to the page:

    for (const key in data) {
        createListItem(data[key]);
        //prepLoad(currentPage, 'data', key)
    };

    const mainContent = document.getElementById("mainContent");
    const cardList = Array.from(mainContent.querySelectorAll('article'));
    cardList.sort((a, b) => {
        const indexA = a.getAttribute("id");
        const indexB = b.getAttribute("id");
        return indexA.localeCompare(indexB);
    });
    cardList.forEach((card) => {
        mainContent.appendChild(card);
    });
    
    //checkRangeValues()
    //checkAoeValues()

    const ALL_IMG = document.querySelectorAll('#mainContent article');

    resetFilter();
    readyFilter();
    //placeImages(ALL_IMG, 'list');
    //TODO Needs separation?
    if (currentPage === 'magic-items') {
        placeImages(ALL_IMG, currentPage);
    } else {
        placeImages(ALL_IMG, 'list');
    }
};

function createCard(data) {
    const cardNameRaw = data.index
    //console.log(data.index)
    //console.log(`At createCard() currentPage = ${currentPage}`)
    const card = document.createElement('article');
    card.id = cardNameRaw;

    if (currentPage === 'classes') {
        prepLoadSecondary(currentPage, 'levels', data.index)
    }

    const cardName = document.createElement('h3');
    const cardNameTxt = document.createTextNode(data.name);
    cardName.className = 'cardTitle';
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

    //Detail modal window listener will prepload on click
    selectButton.addEventListener('click', () => { prepLoad(currentPage, 'data', cardNameRaw) } );
};

function createListItem(data) {
    let itemNameRaw = data.index;
    let itemNameData = data.name;
    let curFilterData = '';

    if (itemNameRaw === 'flask-or-tankard') {
        itemNameRaw = 'flask';
        itemNameData = 'Flask';
    }
    
    //console.log(data)
    //console.log(`At createCard() currentPage = ${currentPage}`)
    const listItem = document.createElement('article');
    listItem.id = itemNameRaw;
    
    const listItemName = document.createElement('h3');
    const listItemTxt = document.createTextNode(itemNameData);
    listItemName.className = 'articleTitle';
    listItemName.appendChild(listItemTxt);

    const listItemPic = document.createElement('img');
  
    //TODO NEEDS NEW REGEX TO COVER ANY FOWARD SLASHES = (/) IN INPUTS
    const itemName = itemNameRaw.replace(/ /g, "-");
    listItemPic.id = itemName + 'Img';
    
    const buttonContainer = document.createElement('div');
    const detailsButton = document.createElement('button');
    const detailsButtonTxt = document.createTextNode("Click for more info");
    detailsButton.appendChild(detailsButtonTxt);

    listItem.appendChild(listItemName);
    listItem.appendChild(listItemPic);
    listItem.appendChild(buttonContainer);
    buttonContainer.appendChild(detailsButton);
    mainElement.appendChild(listItem);

    //Add filter data to each list item
    //TODO P1-1 - FILTER - figure out how to deal with "non attributes" with values of "unknown"
    // CUURENT FLOW
    if (currentPage === "magic-items") {

    } else {
        curFilterData = dataCache[currentPage][data.index];
    }

    /* // Range Count Counter
    function RangeCount() {
        const itemRange = curFilterData.range;
        listItemCount += 1;

        if (itemRange === 'Self'){
            valueSelf += 1;
        } else if (itemRange === 'Touch') {
            valueTouch += 1;
        } else if (itemRange === 'Sight') {
            valueSight += 1;
        } else if (itemRange === '1 mile') {
            valueOneMile += 1;
        } else if (itemRange === 'Special') {
            valueSpecial += 1;
        } else if (itemRange === 'Unlimited') {
            valueUnlimited += 1;
        } else {
            const splitRange = itemRange.split(" ");
            const valueRange = splitRange[0];
            const valueFoot = splitRange[1];

            valueFeet += 1;

            if (valueRange <= 25) {
                lessThanTwentyFive += 1;
            } else if (valueRange > 25 && valueRange <= 50 ) {
                twentyFiveToFifty += 1;
            } else if (valueRange > 50 && valueRange <= 100 ) {
                fiftyToOneHundred += 1;
            } else if (valueRange > 100 && valueRange <= 250 ) {
                oneHundredToTwoFifty += 1;
            } else if (valueRange > 250 && valueRange <= 500 ) {
                twoFiftyToFiveHundred += 1;
            }
        }
    };
    RangeCount(); 

    // AOE Count Counter
    function AoeCount() {
        const itemAoe = curFilterData.aoe;
        aoeItemCount += 1;

        if (itemAoe === 'cone'){
            aoeCone += 1;
        } else if (itemAoe === 'cube') {
            aoeCube += 1;
        } else if (itemAoe === 'cylinder') {
            aoeCylinder += 1;
        } else if (itemAoe === 'line') {
            aoeLine += 1;
        } else if (itemAoe === 'sphere') {
            aoeSphere += 1;
        } else {
            console.log(itemAoe)
        }
    };
    AoeCount();*/
    if (currentPage === 'spells') {
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
    listItem.setAttribute('data-dc', curFilterData.dc);
    listItem.setAttribute('data-heal', curFilterData.healing_spell);
    listItem.setAttribute('data-conc', curFilterData.concentration);
    listItem.setAttribute('data-ritual', curFilterData.ritual);
    }

    const listItemImg = document.querySelector(`#${itemNameRaw} img`);

    listItemImg.src = "./images/page-elements/spinner-dnd.gif";
    detailsButton.addEventListener('click', () => { prepLoad(currentPage, 'data', itemNameRaw) } );
};

function createDetailsWindow(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    console.log(data)
    console.log(`${data.index} has ${NUM_OF_ITEMS} data points.`);

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
    const detailImageDiv = document.createElement('div');
    const detailImage = document.createElement('img');
    detailImage.src = `./images/${currentPage}/${data.index}.gif`;
    //listItemImg.src = `./images/${globalData.currentPage}/${data.index}.gif`;


    //Add Items
    const detailItemsDiv = document.createElement('div');
    detailItemsDiv.classList.add('detailItemsDiv');
    detailImageDiv.classList.add('detailImageDiv');


    // For objects:
    for (const key in data) {

        if (data.hasOwnProperty(key)) {
            const eachItem = data[key];
            const currentItem = `detailItem${itemCounter}`;
            const detailItemDiv = document.createElement('div');
            detailItemDiv.id = 'detailItemsDiv' + capitalizeWords(key);
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
    detailImageDiv.appendChild(detailImage);
    mainDetailsDiv.appendChild(detailImageDiv);
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
    console.log(data)
    //console.log(`${data.index} has ${NUM_OF_ITEMS} data points.`);

    //Create Modal Window
    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //Watermark image
    const watermarkDiv = document.createElement('div');
    watermarkDiv.id = 'watermark';
    watermarkDiv.className = 'watermark';
    detailModal.appendChild(watermarkDiv);
    if (currentPage === 'spells') {
    watermarkDiv.style.backgroundImage = `url(./images/${currentPage}/${data.index}.gif)`;
    } else {
    watermarkDiv.style.backgroundImage = `url(./images/${currentPage}/${data.index}.jpg)`;
    }

    //Header
    if (currentPage === 'monsters') {
        
    } else {
        const detailsHeader = document.createElement('div');
        const detailName = document.createElement('h3');
        detailsHeader.appendChild(detailName);
        detailModal.appendChild(detailsHeader);
        detailsHeader.id = 'detailsHeader';
        detailName.textContent = data.name; 
    }

    //Details Content
    const mainDetailsDiv = document.createElement('div');
    mainDetailsDiv.classList.add('mainDetailContent');
    detailModal.appendChild(mainDetailsDiv);

    //Details Container
    const statHeaderBar = document.createElement('img');
    const detailTextContent = document.createElement('div');
    const detailItemsDiv = document.createElement('div');
    const detailInitialDiv = document.createElement('div');
    const detailInitialDesc = document.createElement('div');
    const statsContainerOne = document.createElement('div');
    const statsContainerTwo = document.createElement('div');
    const statBarDivOne = document.createElement('div');
    const statsBarOne = document.createElement('img');
    const statBarDivTwo = document.createElement('div');
    const statsBarTwo = document.createElement('img');
    const statBarDivThree = document.createElement('div');
    const statsBarThree = document.createElement('img');
    statHeaderBar.src = './images/page-elements/stat-bar-book.png';
    statsBarOne.src = "./images/page-elements/stat-block-header-bar.svg";
    statsBarTwo.src = "./images/page-elements/stat-block-header-bar.svg";
    statsBarThree.src = "./images/page-elements/stat-block-header-bar.svg";
    statHeaderBar.classList.add('statHeadFootBar');
    detailTextContent.classList.add('detailTextContent');
    detailItemsDiv.classList.add('detailItemsDiv');
    detailInitialDiv.classList.add('initialDetailInfo');
    detailInitialDesc.classList.add('initialDetailDesc');
    statBarDivOne.className = 'statsBarDiv';
    statsBarOne.className = 'statsBar';
    statsContainerOne.id = 'statsContainerOne';
    statBarDivTwo.className = 'statsBarDiv';
    statsBarTwo.className = 'statsBar';
    statsContainerTwo.id = 'statsContainerTwo';
    statBarDivThree.className = 'statsBarDiv';
    statsBarThree.className = 'statsBar';
    mainDetailsDiv.appendChild(statHeaderBar);
    mainDetailsDiv.appendChild(detailTextContent);
    detailTextContent.appendChild(detailItemsDiv);
    detailItemsDiv.appendChild(detailInitialDiv);
    detailInitialDiv.appendChild(detailInitialDesc);
    detailItemsDiv.appendChild(statBarDivOne);
    statBarDivOne.appendChild(statsBarOne);
    detailItemsDiv.appendChild(statsContainerOne);
    detailItemsDiv.appendChild(statBarDivTwo);
    statBarDivTwo.appendChild(statsBarTwo);
    detailItemsDiv.appendChild(statsContainerTwo);
    detailItemsDiv.appendChild(statBarDivThree);
    statBarDivThree.appendChild(statsBarThree);

    //FIXME Check these variable names - are Values and Divs the correct discriptor?
    let savThrowValues = [];
    let skillValues = [];
    let senseValues = [];
    let langValues = [];
    let challValues = '';
    let profBonus = '';
    let specAbilDivs = [];
    let actionDivs = [];
    let actionLegDivs = [];

    // For objects:
    if (currentPage === 'monsters') {
        for (const key in data) {
            //Add Initial Info
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'name') {
                    const detailName = document.createElement('p');
                    detailName.textContent = eachItem;
                    detailInitialDiv.appendChild(detailName);
                    detailName.classList.add('detailName');
                }
                if (key === 'size') {
                    const detailSize = document.createElement('p');
                    detailSize.textContent = capitalizeWords(eachItem + ' ');
                    detailInitialDesc.appendChild(detailSize);
                    detailSize.classList.add('detailText');
                }
                if (key === 'type') {
                    const detailType = document.createElement('p');
                    detailType.textContent = capitalizeWords(eachItem + ', ');
                    detailInitialDesc.appendChild(detailType);
                    detailType.classList.add('detailText');
                }
                if (key === 'alignment') {
                    const detailAlign = document.createElement('p');
                    detailAlign.textContent = capitalizeWords(eachItem);
                    detailInitialDesc.appendChild(detailAlign);
                    detailAlign.classList.add('detailText');
                }

            }

            //Add first stat group
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'armor_class') {
                    const acStatDiv = document.createElement('div');
                    const acTitle = document.createElement('p');
                    const currentAC = document.createElement('p');
                    acTitle.textContent = 'Armor Class';
                    currentAC.textContent = ` ${eachItem[0]['value']} (${capitalizeWords(eachItem[0]['type'])} Armor)`;
                    acStatDiv.classList.add('statDiv');
                    acTitle.classList.add('detailContent');
                    currentAC.classList.add('detailContent');
                    statsContainerOne.appendChild(acStatDiv);
                    acStatDiv.appendChild(acTitle);
                    acStatDiv.appendChild(currentAC);
                }
                if (key === 'hit_points') {
                    const hpStatDiv = document.createElement('div');
                    const hpTitle = document.createElement('p');
                    const currentHP = document.createElement('p');
                    hpTitle.textContent = 'Hit Points';
                    currentHP.textContent = ` ${eachItem} (${data.hit_points_roll})`;
                    hpStatDiv.classList.add('statDiv');
                    hpTitle.classList.add('detailContent');
                    currentHP.classList.add('detailContent');
                    statsContainerOne.appendChild(hpStatDiv);
                    hpStatDiv.appendChild(hpTitle);
                    hpStatDiv.appendChild(currentHP);
                }
                if (key === 'speed') {
                    const speedStatDiv = document.createElement('div');
                    const speedTitle = document.createElement('p');
                    const currentSpeed = document.createElement('p');
                    speedTitle.textContent = 'Speed';
                    currentSpeed.textContent = ` walk ${eachItem.walk}, swim ${eachItem.swim}`;
                    speedStatDiv.classList.add('statDiv');
                    speedTitle.classList.add('detailContent');
                    currentSpeed.classList.add('detailContent');
                    statsContainerOne.appendChild(speedStatDiv);
                    speedStatDiv.appendChild(speedTitle);
                    speedStatDiv.appendChild(currentSpeed);
                }

            }
            //Add second stat group
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'strength' || key === 'constitution' || key === 'dexterity' || key === 'intelligence' || key === 'wisdom' || key === 'charisma') {
                    const currentStat = key.slice(0, 3).toUpperCase();
                    const currentStatDiv = document.createElement('div');
                    const currentStatTitle = document.createElement('p');
                    const currentStatValue = document.createElement('p');
                    currentStatDiv.className = 'statDivTwo';
                    currentStatTitle.textContent = currentStat;
                    currentStatValue.textContent = eachItem;
                    currentStatDiv.appendChild(currentStatTitle);
                    currentStatDiv.appendChild(currentStatValue);
                    statsContainerTwo.appendChild(currentStatDiv);

                }
            }
            //Add third stat group
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'proficiencies') {

                    for (const profKey in eachItem) {
                        const profItem = eachItem[profKey];
                        const profType = profItem.proficiency.index;
                        const profNameRaw = profItem.proficiency.name;

                        if (profType.startsWith('saving-throw')) {
                            const profName = profNameRaw.replace(/^Saving Throw: /, '');
                            const profValue = profItem.value;

                            savThrowValues.push(`${profName} +${profValue}`)
                        } else if (profType.startsWith('skill')) {
                            const skillName = profNameRaw.replace(/^Skill: /, '');
                            const skillValue = profItem.value;

                            skillValues.push(`${skillName} +${skillValue}`)                        
                        }
                    }
                }
                if (key === 'senses') {

                    for (const eachKey in eachItem) {
                        const senseItem = eachItem[eachKey];

                        if (eachKey === 'passive_perception') {
                            const passPerc = capitalizeWords(eachKey.replace(/_/g, " "));

                            senseValues.push(`${passPerc} ${senseItem}`)
                        } else {
                            senseValues.unshift(`${capitalizeWords(eachKey)} ${senseItem}`)
                        }
                    }
                }
                if (key === 'languages') {
                    //TODO Test this with data as an array
                    if (eachItem.typeof === 'array') {
                        for (const eachKey in eachItem) {
                            const langItem = eachItem[eachKey];
    
                            const lang = capitalizeWords(eachKey.replace(/_/g, " "));
                            langValues.push(`${lang} ${langItem}`)
                        }
                    } else {
                        langValues = eachItem;
                    }
                }
                if (key === 'challenge_rating' || key === 'xp') {

                    if (key === 'challenge_rating') {
                        challValues = ` ${eachItem}`;
                    } else {
                        challValues += ` (${eachItem} XP)`;
                    }
                }
                if (key === 'proficiency_bonus') {
                    profBonus = ` +${eachItem}`;

                }
            }
            //Special Abilities Section
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'special_abilities') {
                    for (eachKey in eachItem) {
                        const specAbilItem = eachItem[eachKey];
                        const specAbilDiv = document.createElement('div');
                        const specAbilContent = document.createElement('p');
                        const curAbilTitle = specAbilItem.name;
                        const curAbilDesc = specAbilItem.desc;
                        specAbilDiv.className = 'detailTxtDiv';
                        specAbilContent.className = 'detailTxtContent';
                        specAbilContent.innerHTML = `<span>${curAbilTitle}</span>. ${curAbilDesc}`;
                        specAbilDiv.appendChild(specAbilContent);
                        specAbilDivs.push(specAbilDiv);
                    }

                }
            }
            //Actions Section
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'actions') {
                    for (eachKey in eachItem) {
                        const actionItem = eachItem[eachKey];
                        const actionDiv = document.createElement('div');
                        const actionContent = document.createElement('p');
                        const curActionTitle = actionItem.name;
                        const curActionDesc = actionItem.desc;
                        actionDiv.className = 'detailTxtDiv';
                        actionContent.className = 'detailTxtContent';
                        actionContent.innerHTML = `<span>${curActionTitle}</span>. ${curActionDesc}`;
                        actionDiv.appendChild(actionContent);
                        actionDivs.push(actionDiv);
                    }

                }
            }
            //Legendary Actions Section
            if (data.hasOwnProperty(key)) {
                const eachItem = data[key];
                const currentDetail = key.replace(/_/g, " ");

                if (key === 'legendary_actions') {
                    for (eachKey in eachItem) {
                        const actionLegItem = eachItem[eachKey];
                        const actionLegDiv = document.createElement('div');
                        const actionLegContent = document.createElement('p');
                        const curActionLegTitle = actionLegItem.name;
                        const curActionLegDesc = actionLegItem.desc;
                        actionLegDiv.className = 'detailTxtDiv';
                        actionLegContent.className = 'detailTxtContent';
                        actionLegContent.innerHTML = `<span>${curActionLegTitle}</span>. ${curActionLegDesc}`;
                        actionLegDiv.appendChild(actionLegContent);
                        actionLegDivs.push(actionLegDiv);
                    }

                }
            }
        }                 
    }

    //Third Stats Container
    //TODO Add Tooltips??
    const statsContainerThree = document.createElement('div');
    const statBarDivFour = document.createElement('div');
    const statsBarFour = document.createElement('img');
    const savThrowStatDiv = document.createElement('div');
    const skillsStatDiv = document.createElement('div');
    const sensesStatDiv = document.createElement('div');
    const langStatDiv = document.createElement('div');
    const challandBonusDiv = document.createElement('div');
    challandBonusDiv.id = 'challandBonusDiv';
    const challStatDiv = document.createElement('div');
    const proBonusStatDiv = document.createElement('div');

    //Saving Throws
    const savThrowTitle = document.createElement('p');
    const currentSavThrow = document.createElement('p');
    savThrowTitle.textContent = 'Saving Throws';
    const sTV = savThrowValues;
    sTV.forEach((value, index) => {
        currentSavThrow.textContent += value;
        if (index < sTV.length - 1) {
            currentSavThrow.textContent += ", ";
        }
    });
    savThrowStatDiv.classList.add('statDiv');
    savThrowTitle.classList.add('detailContent');
    currentSavThrow.classList.add('detailContent');
    //Skills
    const skillTitle = document.createElement('p');
    const currentSkill = document.createElement('p');
    skillTitle.textContent = 'Skills';
    const skV = skillValues;
    skV.forEach((value, index) => {
        currentSkill.textContent += value;
        if (index < skV.length - 1) {
            currentSkill.textContent += ", ";
        }
    });
    skillsStatDiv.classList.add('statDiv');
    skillTitle.classList.add('detailContent');
    currentSkill.classList.add('detailContent');
    //Senses
    const senseTitle = document.createElement('p');
    const currentSense = document.createElement('p');
    senseTitle.textContent = 'Senses';
    const seV = senseValues;
    seV.forEach((value, index) => {
        currentSense.textContent += value;
        if (index < seV.length - 1) {
            currentSense.textContent += ", ";
        }
    });
    sensesStatDiv.classList.add('statDiv');
    senseTitle.classList.add('detailContent');
    currentSense.classList.add('detailContent');
    //Languages
    const langTitle = document.createElement('p');
    const currentLang = document.createElement('p');
    langTitle.textContent = 'Languages';
    const lV = langValues;
    if (data.languages && data.languages.typeof === 'array'){
        lV.forEach((value, index) => {
            currentLang.textContent += value;
            if (index < lV.length - 1) {
                currentLang.textContent += ", ";
            }
        })
    } else {
        currentLang.textContent = langValues;
    };
    langStatDiv.classList.add('statDiv');
    langTitle.classList.add('detailContent');
    currentLang.classList.add('detailContent');
    //Challenge
    const challTitle = document.createElement('p');
    const currentChall = document.createElement('p');
    challTitle.textContent = 'Challenge';
    currentChall.textContent = challValues;
    challStatDiv.classList.add('statDiv');
    challTitle.classList.add('detailContent');
    currentChall.classList.add('detailContent');
    //Proficiency Bonus
    const proBonusTitle = document.createElement('p');
    const currentProBonus = document.createElement('p');
    proBonusTitle.textContent = 'Proficiency Bonus';
    currentProBonus.textContent = profBonus;
    proBonusStatDiv.classList.add('statDiv');
    proBonusTitle.classList.add('detailContent');
    currentProBonus.classList.add('detailContent');
    //End of Third Stats Container
    statsContainerThree.id = 'statsContainerThree';
    statsBarFour.src = "./images/page-elements/stat-block-header-bar.svg";
    statsBarFour.className = 'statsBar';
    detailItemsDiv.appendChild(statsContainerThree);
    detailItemsDiv.appendChild(statBarDivFour);
    statBarDivFour.appendChild(statsBarFour);
    statsContainerThree.appendChild(savThrowStatDiv);
    statsContainerThree.appendChild(skillsStatDiv);
    statsContainerThree.appendChild(sensesStatDiv);
    statsContainerThree.appendChild(langStatDiv);
    statsContainerThree.appendChild(challandBonusDiv);
    challandBonusDiv.appendChild(challStatDiv);
    challandBonusDiv.appendChild(proBonusStatDiv);
    savThrowStatDiv.appendChild(savThrowTitle);
    savThrowStatDiv.appendChild(currentSavThrow);
    skillsStatDiv.appendChild(skillTitle);
    skillsStatDiv.appendChild(currentSkill);
    sensesStatDiv.appendChild(senseTitle);
    sensesStatDiv.appendChild(currentSense);
    langStatDiv.appendChild(langTitle);
    langStatDiv.appendChild(currentLang);
    challStatDiv.appendChild(challTitle);
    challStatDiv.appendChild(currentChall);
    proBonusStatDiv.appendChild(proBonusTitle);
    proBonusStatDiv.appendChild(currentProBonus);

    //Special Abilities
    const specAbilMain = document.createElement('div');
    specAbilMain.className = 'specAbilMain';
    specAbilDivs.forEach((curDiv) => {
        specAbilMain.appendChild(curDiv);
    });
    detailTextContent.appendChild(specAbilMain);

    //Actions
    const actionsMain = document.createElement('div');
    const actionsHeader = document.createElement('div');
    actionsMain.className = 'detailTxtMain';
    actionsHeader.className = 'detailTxtHeader';
    actionsHeader.textContent = 'Actions';
    actionDivs.forEach((curDiv) => {
        actionsMain.appendChild(curDiv);
    });
    detailTextContent.appendChild(actionsHeader);
    detailTextContent.appendChild(actionsMain);

    //Legendary Actions
    if (data.legendary_actions && data.legendary_actions.length > 1) {
        const actionsLegMain = document.createElement('div');
        const actionsLegHeader = document.createElement('div');
        actionsLegMain.className = 'detailTxtLegMain';
        actionsLegHeader.className = 'detailTxtHeader';
        actionsLegHeader.textContent = 'Legendary Actions';
        actionLegDivs.forEach((curDiv) => {
            actionsLegMain.appendChild(curDiv);
        });
        detailTextContent.appendChild(actionsLegHeader);
        detailTextContent.appendChild(actionsLegMain);
    }

    //Footer
    const detailsFooter = document.createElement('div');
    const statFooterBar = document.createElement('img');
    detailsFooter.id = 'detailsFooter';
    statFooterBar.src = './images/page-elements/stat-bar-book.png';
    statFooterBar.classList.add('statHeadFootBar');
    mainDetailsDiv.appendChild(statFooterBar);
    detailModal.appendChild(detailsFooter)


    //Modal Close Button
    const closeButtonDiv = document.createElement('div');
    const closeButton = document.createElement('button');
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.id = 'closeButton'
    detailsFooter.appendChild(closeButtonDiv);
    closeButton.appendChild(closeButtonTxt);

    //Modal Watermark Button
    const watermarkToggleDiv = document.createElement('div');
    const watermarkToggleBtn = document.createElement('button');
    const watermarkToggleTxt = document.createTextNode("Toggle Watermark");
    watermarkToggleBtn.id = 'watermarkToggle'
    detailsFooter.appendChild(watermarkToggleDiv);
    watermarkToggleBtn.appendChild(watermarkToggleTxt);

    detailModal.showModal();
    //Set watermark height to account for amout of content
    watermarkDiv.style.height = (mainDetailsDiv.clientHeight - 50) + 'px';
    closeButtonDiv.appendChild(closeButton);
    watermarkToggleDiv.appendChild(watermarkToggleBtn);
    modalListeners()
};

function raceDetailsWindow(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    const raceType = data.index;
    console.log(data)
    const raceAdded = localCacheAssets['additional-data'].races.results
    const subraceData = dataCache['characters']['subraces'];
    //TODO P5-T3 ADD ? Starting Proficiencies.
    //TODO P5-T3 ADD ? Starting Proficiency Options.
    //TODO P5-T3 ADD ? Language Options.

    //Create Modal Window
    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //Watermark image
    const watermarkDiv = document.createElement('div');
    watermarkDiv.id = 'watermark';
    watermarkDiv.className = 'watermark';
    detailModal.appendChild(watermarkDiv);
    watermarkDiv.style.backgroundImage = `url(./images/${currentPage}/${data.index}.jpg)`;

    //Header
    const detailsHeader = document.createElement('div');
    const detailName = document.createElement('h3');
    detailsHeader.appendChild(detailName);
    detailModal.appendChild(detailsHeader);
    detailsHeader.id = 'detailsHeader';
    detailName.className = 'detailHeader'
    detailName.textContent = data.name;


    //Details Content
    const mainDetailsDiv = document.createElement('div');
    mainDetailsDiv.classList.add('mainDetailContent');
    detailModal.appendChild(mainDetailsDiv);

    //Details Container
    const statHeaderBar = document.createElement('img');
    const detailTextContent = document.createElement('div');
    statHeaderBar.src = './images/page-elements/stat-bar-book.png';
    statHeaderBar.classList.add('statHeadFootBar');
    detailTextContent.classList.add('detailTextContent');
    mainDetailsDiv.appendChild(statHeaderBar);
    mainDetailsDiv.appendChild(detailTextContent);

    // For objects:
    let subrace = false;
    let abilBonValues = [];
    let raceAgeValue = '';
    let raceAlignDesc = '';
    let raceLangValue = '';
    let raceSizeValue = '';
    let raceSizeDesc = '';
    let raceSpeedValue = '';
    let traitDivs = [];
    let draconicAncestryData = [];
    const draconicAncestryTable = document.createElement('table');
    let subracesInfo = [];
    for (const key in data) {
        //Actions Section
        if (data.hasOwnProperty(key)) {
            const eachItem = data[key];
            //TODO P1-3 - Need to add Half-Elf = Ability Bonus Options AND Half-Elf+Human = Lang Option AND All = Subraces & Starting Profs[options](?)
            //TODO CONTINUE HERE!!!!!!!!!!!!!!!!!!!!!!! GET RID OF THIS WHOLE ENTIRE FOR?????
            if (key === 'subraces' && Array.isArray(eachItem) && eachItem.length > 0) {

            } else if (key === 'ability_bonuses') {
                for (eachKey in eachItem) {
                    const abilBonItem = eachItem[eachKey];
                    const curAbilBonTitle = abilBonItem.ability_score.name;
                    const curAbilBonDesc = abilBonItem.bonus;

                    abilBonValues.push(`${curAbilBonTitle} +${curAbilBonDesc}`) 
                }
            } else if (key === 'age') {
                raceAgeValue = eachItem;
            } else if (key === 'alignment') {
                raceAlignDesc = eachItem;
            } else if (key === 'language_desc') {
                raceLangValue = eachItem;
            } else if (key === 'size') {
                raceSizeValue = eachItem;
            } else if (key === 'size_description') {
                raceSizeDesc = eachItem;
            } else if (key === 'speed') {
                raceSpeedValue = eachItem;
            } else if (key === 'traits') {
                for (eachKey in eachItem) {
                    const traitItem = eachItem[eachKey];
                    const traitDiv = document.createElement('div');
                    const traitContent = document.createElement('p');
                    const curTraitTitle = traitItem.name;
                    const curTraitIndex = traitItem.index;
                    traitDiv.className = 'detailTxtDiv';
                    traitContent.className = 'detailTxtContent';
                    traitContent.innerHTML = `<span>${curTraitTitle}</span>. ${dataCache['characters']['traits'][curTraitIndex].desc}.`;
                    traitDiv.appendChild(traitContent);
                    traitDivs.push(traitDiv);
                    if (curTraitIndex === 'draconic-ancestry') {
                        const traitItem = dataCache.characters.traits;
                        const draconicAncestryDiv = document.createElement('div');
                        draconicAncestryDiv.className = 'class-summary-div';
                        draconicAncestryTable.className = 'class-summary-table';
                        draconicAncestryDiv.appendChild(draconicAncestryTable);
                        for (traitKey in traitItem) {
                            if (traitKey.startsWith('draconic-ancestry-')) {
                                const index = traitItem[traitKey].index;
                                const AOE_SIZE = traitItem[traitKey].trait_specific.breath_weapon.area_of_effect.size;
                                const AOE_TYPE = traitItem[traitKey].trait_specific.breath_weapon.area_of_effect.type;
                                const DC_SAVE = traitItem[traitKey].trait_specific.breath_weapon.dc.dc_type.index;
                                const dragonType = capitalizeWords(extractPortion(index, 2, "-"));
                                const damage_type = traitItem[traitKey].trait_specific.damage_type.name;
                                let breathWeapon = '';
                                if (AOE_SIZE === 30) {
                                    breathWeapon = `5 by ${AOE_SIZE} ft. ${AOE_TYPE} (${capitalizeWords(DC_SAVE)}. save)`;
                                } else {
                                    breathWeapon = `${AOE_SIZE} ft. ${AOE_TYPE} (${capitalizeWords(DC_SAVE)}. save)`
                                }
                                const draconicAncestry = { "name": dragonType, "damage_type": damage_type, "breath_weapon": breathWeapon };
                                draconicAncestryData.push(draconicAncestry);
                            }
                        }
                        draconicAncestryDiv.appendChild(draconicAncestryTable);
                        traitDivs.push(draconicAncestryDiv);
                    }
                
                }
            } else if (key === 'index' || key === 'name' || key === 'languages' || key === 'subraces' || key === 'url') {

            } else {
                console.log(key);
            }
        }
    }

    for (const key in subraceData) {
        //Actions Section
        const subraceItemData = subraceData[key];
        const parentRace = subraceItemData.race.index;
        if (parentRace === raceType) {
            subrace = true;
            const subraceItem = document.createElement('div');
            const subraceItemHeader = document.createElement('div');
            const subraceDiv = document.createElement('div');
            const subraceItemIntro = document.createElement('p');
            const subraceContent = document.createElement('p');
            subraceItem.className = 'detailTxtMain';
            subraceDiv.className = 'detailTxtDiv';
            subraceContent.className = 'detailTxtContent';
            subraceItemHeader.className = 'detailTxtHeader';
            subraceItemIntro.className = 'detailTxtContent';
            subraceItemHeader.textContent = subraceItemData.name;
            subraceItemIntro.textContent = subraceItemData.desc;
            subraceItem.appendChild(subraceItemHeader);
            subraceItem.appendChild(subraceItemIntro);
            for (const detailKey in subraceItemData) {
                const detailItem = subraceItemData[detailKey];
                if (detailKey === 'ability_bonuses' && Array.isArray(detailItem) && detailItem.length > 0) {
                    const abilBonItem = detailItem;
                    const abilBonMain = document.createElement('div');
                    const abilityBonus = document.createElement('p');
                    abilBonMain.className = 'detailTxtDiv';
                    abilityBonus.className = 'detailTxtContent';
                    abilityBonus.innerHTML = `<span>Ability Score Bonus.</span> `;
                    abilBonItem.forEach((value, index) => {
                        const abilBonTitle = value.ability_score.name;
                        const abilBonDesc = value.bonus;
                        abilityBonus.innerHTML += `${abilBonTitle} + ${abilBonDesc}`;
                        if (index < abilityBonus.length - 1) {
                            abilityBonus.innerHTML += ", ";
                        }
                    });
                    abilBonMain.appendChild(abilityBonus);
                    subraceItem.appendChild(abilBonMain);
                }
                if (detailKey === 'racial_traits' && Array.isArray(detailItem) && detailItem.length > 0) {
                    const traitsItem = detailItem;
                    traitsItem.forEach((value, index) => {
                        const traitsMain = document.createElement('div');
                        const traitsContent = document.createElement('p');
                        const traitsTitle = value.name;
                        const traitsIndex = value.index;
                        const traitDesc = dataCache.characters.traits[traitsIndex]['desc']
                        traitsContent.className = 'detailTxtContent';
                        traitsContent.innerHTML = `<span>${traitsTitle}.</span> `;
                        traitCounter = 0;
                        traitsMain.appendChild(traitsContent);
                        traitDesc.forEach( item => {
                            if (traitDesc.length > 1 && traitCounter === 0) {
                                traitsContent.innerHTML += item;
                                traitCounter++
                                traitsMain.className = 'detailTxtDivLarge';
                            } else if (traitDesc.length > 1 && traitCounter === 1) {
                                const traitsContentMore = document.createElement('p');
                                traitsContentMore.innerHTML += item;
                                traitsMain.appendChild(traitsContentMore);
                                traitCounter++
                            } else if (traitDesc.length > 1 && traitCounter > 1) {
                                const traitsContentMore = document.createElement('p');
                                const splitCurTrait = item.split(':');
                                const traitItemTitle = splitCurTrait[0];
                                const traitItemContent = splitCurTrait[1];
                                traitsContentMore.innerHTML = `<span>${traitItemTitle}:</span> ${traitItemContent}`;
                                traitsContentMore.className = 'subraceTraitDetail';
                                traitsMain.appendChild(traitsContentMore);
                                traitCounter++
                            } else {
                                traitsContent.innerHTML += item;
                            }
                        });
                        if (index < traitsContent.length - 1) {
                            traitsContent.innerHTML += ", ";
                        }
                        subraceItem.appendChild(traitsMain);
                    });
                }
            }
            subracesInfo.push(subraceItem);
        }
    }

    //Race Description
    const raceDescDiv = document.createElement('div');
    const raceDescPara = document.createElement('p');
    //detailTextContent.appendChild(raceDescDiv);
    detailTextContent.appendChild(raceDescPara);
    raceAdded.forEach( text => {
        if (text.index === raceType)
        raceDescPara.textContent = text.raceIntro;
    });
    raceDescPara.className = 'detailDesc'

    //SubRace
    if (subrace) {
        const subraceIntroMain = document.createElement('div');
        const subraceIntroHeader = document.createElement('div');
        const subraceIntroTxt = document.createElement('p');
        subraceIntroMain.className = 'detailTxtMain';
        subraceIntroHeader.className = 'detailTxtHeader';
        subraceIntroTxt.className = 'detailTxtContent';
        subraceIntroHeader.textContent = 'Subrace';
        raceAdded.forEach( text => {
            if (text.index === raceType)
            subraceIntroTxt.textContent = text.subraceIntro;
        });
        subraceIntroMain.appendChild(subraceIntroHeader);
        subraceIntroMain.appendChild(subraceIntroTxt);
        detailTextContent.appendChild(subraceIntroMain);
    }

    //Traits
    const statsMain = document.createElement('div');
    const statsHeader = document.createElement('div');
    statsMain.className = 'detailTxtMain';
    statsHeader.className = 'detailTxtHeader';
    statsHeader.textContent = 'Traits';
    statsMain.appendChild(statsHeader);
    detailTextContent.appendChild(statsMain);

    //Ability Bonuses
    const abilBonMain = document.createElement('div');
    const abilityBonus = document.createElement('p');
    abilBonMain.className = 'detailTxtDiv';
    abilityBonus.className = 'detailTxtContent';
    abilityBonus.innerHTML = `<span>Ability Score Bonus.</span> `;
    aBV = abilBonValues;
    aBV.forEach((value, index) => {
        abilityBonus.innerHTML += value;
        if (index < aBV.length - 1) {
            abilityBonus.innerHTML += ", ";
        }
    });
    abilBonMain.appendChild(abilityBonus);
    detailTextContent.appendChild(abilBonMain);

    //Age
    const ageMain = document.createElement('div');
    const raceAge = document.createElement('p');
    ageMain.className = 'detailTxtDiv';
    raceAge.className = 'detailTxtContent';
    raceAge.innerHTML = `<span>Age</span> ${raceAgeValue}`;
    ageMain.appendChild(raceAge);
    detailTextContent.appendChild(ageMain);

    //Alignment
    const alignMain = document.createElement('div');
    const raceAlign = document.createElement('p');
    alignMain.className = 'detailTxtDiv';
    raceAlign.className = 'detailTxtContent';
    raceAlign.innerHTML = `<span>Alignment</span> ${raceAlignDesc}`;
    alignMain.appendChild(raceAlign);
    detailTextContent.appendChild(alignMain);

    //Languages
    const langMain = document.createElement('div');
    const raceLang = document.createElement('p');
    langMain.className = 'detailTxtDiv';
    raceLang.className = 'detailTxtContent';
    raceLang.innerHTML = `<span>Languages</span> ${raceLangValue}`;
    langMain.appendChild(raceLang);
    detailTextContent.appendChild(langMain);

    //Size
    const sizeMain = document.createElement('div');
    const raceSize = document.createElement('p');
    sizeMain.className = 'detailTxtDiv';
    raceSize.className = 'detailTxtContent';
    raceSize.innerHTML = `<span>Size</span> ${raceSizeValue}. ${raceSizeDesc}`;
    sizeMain.appendChild(raceSize);
    detailTextContent.appendChild(sizeMain);

    //Speed
    const speedMain = document.createElement('div');
    const raceSpeed = document.createElement('p');
    speedMain.className = 'detailTxtDiv';
    raceSpeed.className = 'detailTxtContent';
    if (data.index === 'dwarf') {
        raceSpeed.innerHTML = `<span>Speed</span> Your base walking speed is ${raceSpeedValue}ft.Your speed is not reduced by wearing heavy armor.`;
    } else {
        raceSpeed.innerHTML = `<span>Speed</span> Your base walking speed is ${raceSpeedValue}ft.`;
    }
    speedMain.appendChild(raceSpeed);
    detailTextContent.appendChild(speedMain);

    //Special Traits
    const specialMain = document.createElement('div');
    const specialHeader = document.createElement('div');
    const specialIntro = document.createElement('p');
    specialMain.className = 'detailTxtMain';
    specialHeader.className = 'detailTxtHeader';
    specialIntro.className = 'detailTxtContent';
    specialHeader.textContent = 'Special Traits';
    raceAdded.forEach( text => {
        if (text.index === raceType)
        specialIntro.textContent = text.traitsIntro;
    });
    specialMain.appendChild(specialHeader);
    specialMain.appendChild(specialIntro);
    detailTextContent.appendChild(specialMain);
    const traitsMain = document.createElement('div');
    traitsMain.className = 'detailTxtMain';
    traitDivs.forEach((curDiv) => {
        traitsMain.appendChild(curDiv);
    });
    detailTextContent.appendChild(traitsMain);
    if (raceType === 'dragonborn') {
        const draconicAncestryKeys = Object.keys(draconicAncestryData[0]);
        generateTable(draconicAncestryTable, draconicAncestryData);
        generateTableHead(draconicAncestryTable, draconicAncestryKeys);
    }

    //Subrace Traits
    const subraceMain = document.createElement('div');
    subracesInfo.forEach( div => {
        subraceMain.appendChild(div);
    });
    detailTextContent.appendChild(subraceMain);

    //TODO DO I EVEN WANT THESE HERE??
    const statBarDivOne = document.createElement('div');
    const statsBarOne = document.createElement('img');

    //Footer
    const detailsFooter = document.createElement('div');
    const statFooterBar = document.createElement('img');
    detailsFooter.id = 'detailsFooter';
    statFooterBar.src = './images/page-elements/stat-bar-book.png';
    statFooterBar.classList.add('statHeadFootBar');
    mainDetailsDiv.appendChild(statFooterBar);
    detailModal.appendChild(detailsFooter)

    //Modal Close Button
    const closeButtonDiv = document.createElement('div');
    const closeButton = document.createElement('button');
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.id = 'closeButton'
    detailsFooter.appendChild(closeButtonDiv);
    closeButton.appendChild(closeButtonTxt);

    //Modal Watermark Button
    const watermarkToggleDiv = document.createElement('div');
    const watermarkToggleBtn = document.createElement('button');
    const watermarkToggleTxt = document.createTextNode("Toggle Watermark");
    watermarkToggleBtn.id = 'watermarkToggle'
    detailsFooter.appendChild(watermarkToggleDiv);
    watermarkToggleBtn.appendChild(watermarkToggleTxt);

    detailModal.showModal();
    //Set watermark height to account for amount of content
    watermarkDiv.style.height = (mainDetailsDiv.clientHeight - 50) + 'px';
    closeButtonDiv.appendChild(closeButton);
    watermarkToggleDiv.appendChild(watermarkToggleBtn);
    modalListeners()
};

function classDetailsWindow(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    const classType = data.index;
    const classAdded = localCacheAssets['additional-data'].classes.results
    const subclassData = dataCache['characters']['subclasses'];
    console.log(data)
    //TODO P5T3 Uncomment these to check data points - Same @ 2468
    //console.log(`${data.index} has ${NUM_OF_ITEMS} data points.`);

    //Create Modal Window
    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //Watermark image
    const watermarkDiv = document.createElement('div');
    watermarkDiv.id = 'watermark';
    watermarkDiv.className = 'watermark';
    detailModal.appendChild(watermarkDiv);
    watermarkDiv.style.backgroundImage = `url(./images/${currentPage}/${data.index}.jpg)`;

    //Header
    const detailsHeader = document.createElement('div');
    const detailName = document.createElement('h3');
    detailsHeader.appendChild(detailName);
    detailModal.appendChild(detailsHeader);
    detailsHeader.id = 'detailsHeader';
    detailName.className = 'detailHeader'
    detailName.textContent = data.name;


    //Details Content
    const mainDetailsDiv = document.createElement('div');
    mainDetailsDiv.classList.add('mainDetailContent');
    detailModal.appendChild(mainDetailsDiv);

    //Details Container
    const statHeaderBar = document.createElement('img');
    const detailTextContent = document.createElement('div');
    statHeaderBar.src = './images/page-elements/stat-bar-book.png';
    statHeaderBar.classList.add('statHeadFootBar');
    detailTextContent.classList.add('classTextContent');
    mainDetailsDiv.appendChild(statHeaderBar);
    mainDetailsDiv.appendChild(detailTextContent);

    //classes Description
    const classDescDiv = document.createElement('div');
    const classDescPara = document.createElement('p');
    detailTextContent.appendChild(classDescDiv);
    classDescDiv.appendChild(classDescPara);
    classAdded.forEach( text => {
        if (text.index === classType) {
        classDescPara.textContent = text.classIntro;
        }
    });
    classDescPara.className = 'detailDesc'

    //classes Attribute One
    const classAttrOneDiv = document.createElement('div');
    const classAttrOneHeader = document.createElement('div');
    const classAttrOnePara = document.createElement('p');
    classAttrOnePara.className = 'detailDesc'
    classAttrOneHeader.className = 'detailTxtHeader';
    classAttrOneDiv.appendChild(classAttrOneHeader);
    detailTextContent.appendChild(classAttrOneDiv);
    classAttrOneDiv.appendChild(classAttrOnePara);
    classAdded.forEach( text => {
        if (text.index === classType) {
            const classAttrOneData = text.classAttrOne;
            const classAttrIndex = classAttrOneData.index.replace(/-/g, " ");
            const classAttrDesc = classAttrOneData.desc
            classAttrOneHeader.textContent = makeTitle(classAttrIndex);
            classAttrOnePara.textContent = classAttrDesc;
        }
    });

    //classes Attribute Two
    const classAttrTwoDiv = document.createElement('div');
    const classAttrTwoHeader = document.createElement('div');
    const classAttrTwoPara = document.createElement('p');
    classAttrTwoPara.className = 'detailDesc'
    classAttrTwoHeader.className = 'detailTxtHeader';
    classAttrTwoDiv.appendChild(classAttrTwoHeader);
    detailTextContent.appendChild(classAttrTwoDiv);
    classAttrTwoDiv.appendChild(classAttrTwoPara);
    classAdded.forEach( text => {
        if (text.index === classType) {
            const classAttrTwoData = text.classAttrTwo;
            const classAttrIndex = classAttrTwoData.index.replace(/-/g, " ");
            const classAttrDesc = classAttrTwoData.desc
            classAttrTwoHeader.textContent = makeTitle(classAttrIndex);
            classAttrTwoPara.textContent = classAttrDesc;
        }
    });

    // Class leveling table
    const levelsTableDiv = document.createElement('div');
    const tableHeader = document.createElement('div');
    const levelsTable = document.createElement('table');
    const levelsData = dataCache.characters.levels[classType]
    levelsTableDiv.className = 'class-levels-div';
    levelsTable.className = 'class-levels-table ';
    tableHeader.className = 'detailTxtHeader';
    tableHeader.textContent = `The ${makeTitle(classType)} Table`;
    detailTextContent.appendChild(tableHeader);
    let classLevelsData = [];

    const tempDesc = document.createElement('p');
    tempDesc.className = 'detailTxtContent';
    tempDesc.textContent = "Tables coming very soon";
    detailTextContent.appendChild(tempDesc);

    //Set up data for Class Levels Tables
    levelsData.forEach( levelItem => {
        tableSetup(classType, levelItem, classLevelsData);
    });

    //Generate Class Levels Tables
    const classLevelsKeys = classLevelsData[0];
    generateTable(levelsTable, classLevelsData);
    generateTableHead(levelsTable, classLevelsKeys);
    levelsTableDiv.appendChild(levelsTable);
    detailTextContent.appendChild(levelsTableDiv);

    //Set justification for table cells
    const allCells = levelsTable.querySelectorAll('td');
    const levelIndex = columnByHeader(levelsTable, "Level");
    const featuresIndex = columnByHeader(levelsTable, "Features");
    allCells.forEach(cell => {
        cell.style.textAlign = 'center';
    });
    // Left justify the cells in the "Levels" column
    const levelsColumn = levelsTable.querySelectorAll(`td:nth-child(${levelIndex})`);
    levelsColumn.forEach(cell => {
        cell.style.textAlign = 'left';
    });
    // Left justify the cells in the "Features" column
    const featuresColumn = levelsTable.querySelectorAll(`td:nth-child(${featuresIndex})`);
    featuresColumn.forEach(cell => {
        cell.style.textAlign = 'left';
    });

    // FIXME Is this needed???
    //Subclass
/*     if (subclass) {
        const subclassIntroMain = document.createElement('div');
        const subclassIntroHeader = document.createElement('div');
        const subclassIntroTxt = document.createElement('p');
        subclassIntroMain.className = 'detailTxtMain';
        subclassIntroHeader.className = 'detailTxtHeader';
        subclassIntroTxt.className = 'detailTxtContent';
        subclassIntroHeader.textContent = 'Subclass';
        //subclassIntroTxt.textContent = subclassIntroTxt;
        //FIXME P2T1 This is temporary until class intro descriptions are in place
        subclassIntroTxt.textContent = "Subclass descriptions coming very soon";
        subclassIntroMain.appendChild(subclassIntroHeader);
        subclassIntroMain.appendChild(subclassIntroTxt);
        detailTextContent.appendChild(subclassIntroMain);
    } */

    //Class Features
    const featuresMain = document.createElement('div');
    const featuresHeader = document.createElement('div');
    const featuresIntro = document.createElement('p');
    featuresMain.className = 'detailTxtMain';
    featuresHeader.className = 'detailTxtHeader';
    featuresIntro.className = 'detailTxtContent';
    featuresHeader.textContent = 'Class Features';
    featuresIntro.textContent = `As a ${classType}, you gain the following class features.`;
    featuresMain.appendChild(featuresHeader);
    featuresMain.appendChild(featuresIntro);
    detailTextContent.appendChild(featuresMain);
    
        //Hit Points
        const hitPointsDiv = document.createElement('div');
        const hitPointsTitle = document.createElement('p');
        const hitPointsTextOne = document.createElement('p');
        const hitPointsTextTwo = document.createElement('p');
        const hitPointsTextThree = document.createElement('p');
        const hitPointsDie = dataCache.classes[classType].hit_die
        const hitPointsMod = 'Constitution'
        const HPAvg = (hitPointsDie / 2) + 1;
        hitPointsDiv.className = 'detailFeaturesDiv';
        hitPointsTitle.className = 'detailFeaturesTitle';
        hitPointsTextOne.className = 'detailFeaturesContent';
        hitPointsTextTwo.className = 'detailFeaturesContent';
        hitPointsTextThree.className = 'detailFeaturesContent';
        hitPointsTitle.textContent = 'Hit Points'
        hitPointsTextOne.innerHTML = `<span>Hit Dice:</span> 1d${hitPointsDie} per ${classType} level`;
        hitPointsTextTwo.innerHTML = `<span>Hit Points at 1st Level:</span> ${hitPointsDie} + your ${hitPointsMod} modifier`;
        hitPointsTextThree.innerHTML = `<span>Hit Points at Higher Levels:</span> 1d${hitPointsDie} (${HPAvg}) + your ${hitPointsMod} modifier per ${classType} level`;
        hitPointsDiv.appendChild(hitPointsTitle);
        hitPointsDiv.appendChild(hitPointsTextOne);
        hitPointsDiv.appendChild(hitPointsTextTwo);
        hitPointsDiv.appendChild(hitPointsTextThree);
        detailTextContent.appendChild(hitPointsDiv);

        //Proficiencies
        const classProfDiv = document.createElement('div');
        const classProfTitle = document.createElement('p');
        const classProfTextOne = document.createElement('p');
        const classProfTextTwo = document.createElement('p');
        const classProfTextThree = document.createElement('p');
        const classProfTextFour = document.createElement('p');
        const classProfTextFive = document.createElement('p');
        const classProfData = dataCache.classes[classType].proficiencies
        const classProfSaveThrowData = dataCache.classes[classType].saving_throws
        const classProfChoice = dataCache.classes[classType].proficiency_choices
        let classProfArmorRaw = [];
        let classProfWeaponsRaw = [];
        let classProfToolsRaw = [];
        let classProfToolsChoice = [];
        let classProfSaveThrowRaw = [];
        let classProfChoices = [];
        classProfData.forEach( prof => {
            if (prof.index == 'light-armor' || prof.index == 'medium-armor' || prof.index == 'heavy-armor' || prof.index == 'all-armor') {
                classProfArmorRaw.push(prof.index);
            } else if (prof.index == 'shields') {
                classProfArmorRaw.push(prof.index);
                if(classType === 'druid') {
                    classProfArmorRaw.push('(druids will not wear armor or use shields made of metal)');
                }
            } else if (prof.index == 'simple-weapons' || prof.index == 'martial-weapons') {
                classProfWeaponsRaw.push(prof.index);
            } else if (prof.index == 'hand-crossbows' || prof.index == 'crossbows-light' || prof.index == 'clubs' || prof.index == 'daggers' || prof.index == 'javelins') {
                if (prof.index == 'crossbows-light') {
                    classProfWeaponsRaw.push('light crossbows');
                } else {
                    classProfWeaponsRaw.push(prof.index);
                }
            } else if (prof.index == 'longswords' || prof.index == 'rapiers' || prof.index == 'shortswords' || prof.index == 'quarterstaffs' || prof.index == 'sickles') {
                classProfWeaponsRaw.push(prof.index);
            } else if (prof.index == 'spears' || prof.index == 'darts' || prof.index == 'slings' || prof.index == 'scimitars' || prof.index == 'maces') {
                classProfWeaponsRaw.push(prof.index);
            } else if (prof.index == 'thieves-tools' || prof.index == 'herbalism-kit' || prof.index == 'EXAMPLE') {
                classProfToolsRaw.push(prof.index);
            } else if (prof.index == 'saving-throw-cha' || prof.index == 'saving-throw-con' || prof.index == 'saving-throw-dex' || prof.index == 'saving-throw-int' || prof.index == 'saving-throw-str' || prof.index == 'saving-throw-wis') {
            } else { console.log(`Armor/Weapon prof not registerd or misspelled: ${prof.index}`); }

        });
        classProfSaveThrowData.forEach( save => {
            if (save.index == 'cha') {
                classProfSaveThrowRaw.push('Charisma');
            } else if (save.index == 'con') {
                classProfSaveThrowRaw.push('Constitution');
            } else if (save.index == 'dex') {
                classProfSaveThrowRaw.push('Dexterity');
            } else if (save.index == 'int') {
                classProfSaveThrowRaw.push('Intelligence');
            } else if (save.index == 'str') {
                classProfSaveThrowRaw.push('Strength');
            } else if (save.index == 'wis') {
                classProfSaveThrowRaw.push('Wisdom');
            } else { console.log(`Saving throw stat not registerd or misspelled: ${save.index}`); }
        });
        classProfChoice.forEach( choice => {
            if (choice === classProfChoice[0]) {
                classProfChoices.push(classProfChoice[0].desc);
            } else if (choice === classProfChoice[1]) {
                classProfToolsChoice.push(classProfChoice[1].desc)
            } else {
                console.log('More proficiency choices than expected!!');
                console.log(choice);
            }
            if (classProfChoice.length == 1 && classProfToolsRaw.length === 0) {
                classProfToolsChoice.push('None')
            }
        });
        const classProfArmor = arrayToSentence(classProfArmorRaw, 'None');
        const classProfWeapons = arrayToSentence(classProfWeaponsRaw, 'None');
        const classProfSaveThrow = arrayToSentence(classProfSaveThrowRaw, 'None');
        const classProfTools = arrayToSentence(classProfToolsRaw) + classProfToolsChoice;
        classProfDiv.className = 'detailFeaturesDiv';
        classProfTitle.className = 'detailFeaturesTitle';
        classProfTextOne.className = 'detailFeaturesContent';
        classProfTextTwo.className = 'detailFeaturesContent';
        classProfTextThree.className = 'detailFeaturesContent';
        classProfTextFour.className = 'detailFeaturesContent';
        classProfTextFive.className = 'detailFeaturesContent';
        classProfTitle.textContent = 'Proficiencies'
        classProfTextOne.innerHTML = `<span>Armor:</span> ${classProfArmor}`;
        classProfTextTwo.innerHTML = `<span>Weapons:</span> ${classProfWeapons}`;
        classProfTextThree.innerHTML = `<span>Tools:</span> ${classProfTools}`;
        classProfTextFour.innerHTML = `<span>Saving Throws:</span> ${classProfSaveThrow}`;
        classProfTextFive.innerHTML = `<span>Skills:</span> ${classProfChoices}`;
        classProfDiv.appendChild(classProfTitle);
        classProfDiv.appendChild(classProfTextOne);
        classProfDiv.appendChild(classProfTextTwo);
        classProfDiv.appendChild(classProfTextThree);
        classProfDiv.appendChild(classProfTextFour);
        classProfDiv.appendChild(classProfTextFive);
        detailTextContent.appendChild(classProfDiv);

        //Class Equipment
        const equipmentDiv = document.createElement('div');
        const equipmentTitle = document.createElement('p');
        const equipmentDesc = document.createElement('p');
        const equipmentList = document.createElement('ul');
        const equipmentOptions = dataCache.classes[classType].starting_equipment_options
        const equipmentStarting = dataCache.classes[classType].starting_equipment
        let optionCount = 1;
        let startItems = "";
        equipmentOptions.forEach( equipmentOption => {
            const equipmentOptionItem = document.createElement('li');
            if (classType == 'cleric') {
                if (optionCount === 5) {
                    
                } else {
                    equipmentOptionItem.id = `equipListItem${optionCount}`;
                    equipmentOptionItem.className = 'bullet-list-item';
                    equipmentOptionItem.textContent = equipmentOption.desc;
                    equipmentList.appendChild(equipmentOptionItem);
                    optionCount++;
                }
            } else {
                equipmentOptionItem.id = `equipListItem${optionCount}`;
                equipmentOptionItem.className = 'bullet-list-item';
                equipmentOptionItem.textContent = equipmentOption.desc;
                equipmentList.appendChild(equipmentOptionItem);
                optionCount++;
            }
        });
        const equipmentListItem = document.createElement('li');
        if (classType == 'barbarian') {
            startItems = "An explorer's pack and four javelins";
        } else if (classType == 'bard') {
            startItems = "Leather armor and a dagger";
        } else if (classType == 'cleric') {
            startItems = "A shield and a holy symbol";
        } else if (classType == 'druid') {
            startItems = "Leather armor, an explorer’s pack, and a druidic focus";
        } else if (classType === 'fighter') {
            startItems = equipmentStarting.equipment;
        } else if (classType === 'monk') {
            startItems = "10 darts";
        } else if (classType === 'paladin') {
            startItems = "Chain mail and a holy symbol";
        } else if (classType === 'ranger') {
            startItems = "A longbow and a quiver of 20 arrows";
        } else if (classType === 'rogue') {
            startItems = "Leather armor, two daggers, and thieves’ tools";
        } else if (classType === 'sorcerer') {
            startItems = "Two daggers";
        } else if (classType === 'warlock') {
            startItems = "Leather armor, any simple weapon, and two daggers";
        } else if (classType === 'wizard') {
            startItems = "A spellbook";
        } else {
            
        }
        equipmentDiv.className = 'detailFeaturesDiv';
        equipmentTitle.className = 'detailFeaturesTitle';
        equipmentDesc.className = 'detailFeaturesContent';
        equipmentListItem.className = 'bullet-list-item';
        equipmentTitle.textContent = 'Equipment'
        equipmentDesc.textContent = 'You start with the following equipment, in addition to the equipment granted by your background:'
        equipmentListItem.textContent = startItems;
        equipmentDiv.appendChild(equipmentTitle);
        equipmentDiv.appendChild(equipmentDesc);
        equipmentDiv.appendChild(equipmentList);
        equipmentList.appendChild(equipmentListItem);
        detailTextContent.appendChild(equipmentDiv);

    if (classType === 'barbarian') {
        //Primal Paths
        const primalMain = document.createElement('div');
        const primalHeader = document.createElement('div');
        const primalIntro = document.createElement('p');
        primalMain.className = 'detailTxtMain';
        primalHeader.className = 'detailTxtHeader';
        primalIntro.className = 'detailTxtContent';
        primalHeader.textContent = 'Primal Paths';
        primalIntro.textContent = "Rage burns in every barbarian’s heart, a furnace that drives him or her toward greatness. Different barbarians attribute their rage to different sources however. For some, it is an internal reservoir where pain, grief, and anger are forged into a fury hard as steel. Others see it as a spiritual blessing, a gift of a totem animal.";
        primalMain.appendChild(primalHeader);
        primalMain.appendChild(primalIntro);
        detailTextContent.appendChild(primalMain);
    } else if (classType === 'bard') {
        //Bard Colleges
        const collegeMain = document.createElement('div');
        const collegeHeader = document.createElement('div');
        const collegeIntro = document.createElement('p');
        collegeMain.className = 'detailTxtMain';
        collegeHeader.className = 'detailTxtHeader';
        collegeIntro.className = 'detailTxtContent';
        collegeHeader.textContent = 'Bard Colleges';
        collegeIntro.textContent = "The way of a bard is gregarious. Bards seek each other out to swap songs and stories, boast of their accomplishments, and share their knowledge. Bards form loose associations, which they call colleges, to facilitate their gatherings and preserve their traditions.";
        collegeMain.appendChild(collegeHeader);
        collegeMain.appendChild(collegeIntro);
        detailTextContent.appendChild(collegeMain);
    } else if (classType === 'cleric') {
        //Divine Domains
        const domainMain = document.createElement('div');
        const domainHeader = document.createElement('div');
        const domainIntroOne = document.createElement('p');
        const domainIntroTwo = document.createElement('p');
        const domainIntroThree = document.createElement('p');
        domainMain.className = 'detailTxtMain';
        domainHeader.className = 'detailTxtHeader';
        domainIntroOne.className = 'detailTxtContent';
        domainIntroTwo.className = 'detailTxtContent';
        domainIntroThree.className = 'detailTxtContent';
        domainHeader.textContent = 'Divine Domains';
        domainIntroOne.textContent = "In a pantheon, every deity has influence over different aspects of mortal life and civilization, called a deity’s domain. All the domains over which a deity has influence are called the deity’s portfolio. For example, the portfolio of the Greek god Apollo includes the domains of Knowledge, Life, and Light. As a cleric, you choose one aspect of your deity’s portfolio to emphasize, and you are granted powers related to that domain.";
        domainIntroTwo.textContent = "Your choice might correspond to a particular sect dedicated to your deity. Apollo, for example, could be worshiped in one region as Phoebus (“radiant”) Apollo, emphasizing his influence over the Light domain, and in a different place as Apollo Acesius (“healing”), emphasizing his association with the Life domain. Alternatively, your choice of domain could simply be a matter of personal preference, the aspect of the deity that appeals to you most.";
        domainIntroThree.textContent = "Each domain’s description gives examples of deities who have influence over that domain. Gods are included from the worlds of the Forgotten Realms, Greyhawk, Dragonlance, and Eberron campaign settings, as well as from the Celtic, Greek, Norse, and Egyptian pantheons of antiquity.";
        domainMain.appendChild(domainHeader);
        domainMain.appendChild(domainIntroOne);
        domainMain.appendChild(domainIntroTwo);
        domainMain.appendChild(domainIntroThree);
        detailTextContent.appendChild(domainMain);
    } else if (classType === 'druid') {
        //Druid Circles
        const circleMain = document.createElement('div');
        const circleHeader = document.createElement('div');
        const circleIntroOne = document.createElement('p');
        const circleIntroTwo = document.createElement('p');
        circleMain.className = 'detailTxtMain';
        circleHeader.className = 'detailTxtHeader';
        circleIntroOne.className = 'detailTxtContent';
        circleIntroTwo.className = 'detailTxtContent';
        circleHeader.textContent = 'Druid Circles';
        circleIntroOne.textContent = "Though their organization is invisible to most outsiders, druids are part of a society that spans the land, ignoring political borders. All druids are nominally members of this druidic society, though some individuals are so isolated that they have never seen any high-ranking members of the society or participated in druidic gatherings. Druids recognize each other as brothers and sisters. Like creatures of the wilderness, however, druids sometimes compete with or even prey on each other.";
        circleIntroTwo.textContent = "At a local scale, druids are organized into circles that share certain perspectives on nature, balance, and the way of the druid.";
        circleMain.appendChild(circleHeader);
        circleMain.appendChild(circleIntroOne);
        circleMain.appendChild(circleIntroTwo);
        detailTextContent.appendChild(circleMain);
    } else if (classType === 'fighter') {
        //Fighter Archtypes
        const archetypeMain = document.createElement('div');
        const archetypeHeader = document.createElement('div');
        const archetypeIntro = document.createElement('p');
        archetypeMain.className = 'detailTxtMain';
        archetypeHeader.className = 'detailTxtHeader';
        archetypeIntro.className = 'detailTxtContent';
        archetypeHeader.textContent = 'Fighter Archetypes';
        archetypeIntro.textContent = 'Different fighters choose different approaches to perfecting their fighting prowess. The martial archetype you choose to emulate reflects your approach.';
        archetypeMain.appendChild(archetypeHeader);
        archetypeMain.appendChild(archetypeIntro);
        detailTextContent.appendChild(archetypeMain);
    } else if (classType === 'monk') {
        //Monastic Traditions
        const traditionMain = document.createElement('div');
        const traditionHeader = document.createElement('div');
        const traditionIntro = document.createElement('p');
        traditionMain.className = 'detailTxtMain';
        traditionHeader.className = 'detailTxtHeader';
        traditionIntro.className = 'detailTxtContent';
        traditionHeader.textContent = 'Monastic Traditions';
        traditionIntro.textContent = 'Three traditions of monastic pursuit are common in the monasteries scattered across the multiverse. Most monasteries practice one tradition exclusively, but a few honor the three traditions and instruct each monk according to his or her aptitude and interest. All three traditions rely on the same basic techniques, diverging as the student grows more adept. Thus, a monk need choose a tradition only upon reaching 3rd level.';
        traditionMain.appendChild(traditionHeader);
        traditionMain.appendChild(traditionIntro);
        detailTextContent.appendChild(traditionMain);
    } else if (classType === 'paladin') {
        //Sacred Oaths
        const oathMain = document.createElement('div');
        const oathHeader = document.createElement('div');
        const oathIntro = document.createElement('p');
        oathMain.className = 'detailTxtMain';
        oathHeader.className = 'detailTxtHeader';
        oathIntro.className = 'detailTxtContent';
        oathHeader.textContent = 'Sacred Oaths';
        oathIntro.textContent = 'Becoming a paladin involves taking vows that commit the paladin to the cause of righteousness, an active path of fighting wickedness. The final oath, taken when he or she reaches 3rd level, is the culmination of all the paladin’s training. Some characters with this class don’t consider themselves true paladins until they have reached 3rd level and made this oath. For others, the actual swearing of the oath is a formality, an official stamp on what has always been true in the paladin’s heart.';
        oathMain.appendChild(oathHeader);
        oathMain.appendChild(oathIntro);
        detailTextContent.appendChild(oathMain);
    } else if (classType === 'ranger') {
        //Ranger Archtypes
        const archetypeMain = document.createElement('div');
        const archetypeHeader = document.createElement('div');
        const archetypeIntro = document.createElement('p');
        archetypeMain.className = 'detailTxtMain';
        archetypeHeader.className = 'detailTxtHeader';
        archetypeIntro.className = 'detailTxtContent';
        archetypeHeader.textContent = 'Ranger Archetypes';
        archetypeIntro.textContent = 'The ideal of the ranger has classic expressions. These are detailed below.';
        archetypeMain.appendChild(archetypeHeader);
        archetypeMain.appendChild(archetypeIntro);
        detailTextContent.appendChild(archetypeMain);
    } else if (classType === 'rogue') {
        //Rougish Archtypes
        const archetypeMain = document.createElement('div');
        const archetypeHeader = document.createElement('div');
        const archetypeIntro = document.createElement('p');
        archetypeMain.className = 'detailTxtMain';
        archetypeHeader.className = 'detailTxtHeader';
        archetypeIntro.className = 'detailTxtContent';
        archetypeHeader.textContent = 'Rougish Archtypes';
        archetypeIntro.textContent = 'Rogues have many features in common, including their emphasis on perfecting their skills, their precise and deadly approach to combat, and their increasingly quick reflexes. But different rogues steer those talents in varying directions, embodied by the rogue archetypes. Your choice of archetype is a reflection of your focus—not necessarily an indication of your chosen profession, but a description of your preferred techniques.';
        archetypeMain.appendChild(archetypeHeader);
        archetypeMain.appendChild(archetypeIntro);
        detailTextContent.appendChild(archetypeMain);
    } else if (classType === 'sorcerer') {
        //Sorcerous Origins
        const originsMain = document.createElement('div');
        const originsHeader = document.createElement('div');
        const originsIntro = document.createElement('p');
        originsMain.className = 'detailTxtMain';
        originsHeader.className = 'detailTxtHeader';
        originsIntro.className = 'detailTxtContent';
        originsHeader.textContent = 'Sorcerous Origins';
        originsIntro.textContent = 'Different sorcerers claim different origins for their innate magic. Although many variations exist, most of these origins fall into two categories: a draconic bloodline and wild magic. Choose the draconic bloodline below or one from another source.';
        originsMain.appendChild(originsHeader);
        originsMain.appendChild(originsIntro);
        detailTextContent.appendChild(originsMain);
    } else if (classType === 'warlock') {
        //Otherworldly Patrons
        const patronsMain = document.createElement('div');
        const patronsHeader = document.createElement('div');
        const patronsIntroOne = document.createElement('p');
        const patronsIntroTwo = document.createElement('p');
        patronsMain.className = 'detailTxtMain';
        patronsHeader.className = 'detailTxtHeader';
        patronsIntroOne.className = 'detailTxtContent';
        patronsIntroTwo.className = 'detailTxtContent';
        patronsHeader.textContent = 'Otherworldly Patrons';
        patronsIntroOne.textContent = 'The beings that serve as patrons for warlocks are mighty inhabitants of other planes of existence—not gods, but almost godlike in their power. Various patrons give their warlocks access to different powers and invocations, and expect significant favors in return.';
        patronsIntroTwo.textContent = 'Some patrons collect warlocks, doling out mystic knowledge relatively freely or boasting of their ability to bind mortals to their will. Other patrons bestow their power only grudgingly, and might make a pact with only one warlock. Warlocks who serve the same patron might view each other as allies, siblings, or rivals.';
        patronsMain.appendChild(patronsHeader);
        patronsMain.appendChild(patronsIntroOne);
        patronsMain.appendChild(patronsIntroTwo);
        detailTextContent.appendChild(patronsMain);
    } else if (classType === 'wizard') {
        //Arcane Traditions
        const patronsMain = document.createElement('div');
        const patronsHeader = document.createElement('div');
        const patronsIntroOne = document.createElement('p');
        const patronsIntroTwo = document.createElement('p');
        patronsMain.className = 'detailTxtMain';
        patronsHeader.className = 'detailTxtHeader';
        patronsIntroOne.className = 'detailTxtContent';
        patronsIntroTwo.className = 'detailTxtContent';
        patronsHeader.textContent = 'Arcane Traditions';
        patronsIntroOne.textContent = 'The study of wizardry is ancient, stretching back to the earliest mortal discoveries of magic. It is firmly established in the worlds of D&D, with various traditions dedicated to its complex study.';
        patronsIntroTwo.textContent = 'The most common arcane traditions in the multiverse revolve around the schools of magic. Wizards through the ages have cataloged thousands of spells, grouping them into eight categories called schools, as described in chapter 10. In some places, these traditions are literally schools; a wizard might study at the School of Illusion while another studies across town at the School of Enchantment. In other institutions, the schools are more like academic departments, with rival faculties competing for students and funding. Even wizards who train apprentices in the solitude of their own towers use the division of magic into schools as a learning device, since the spells of each school require mastery of different techniques.';
        patronsMain.appendChild(patronsHeader);
        patronsMain.appendChild(patronsIntroOne);
        patronsMain.appendChild(patronsIntroTwo);
        detailTextContent.appendChild(patronsMain);
    }

    //TODO P1-T2 CONTINUE HERE

    //Footer
    const detailsFooter = document.createElement('div');
    const statFooterBar = document.createElement('img');
    detailsFooter.id = 'detailsFooter';
    statFooterBar.src = './images/page-elements/stat-bar-book.png';
    statFooterBar.classList.add('statHeadFootBar');
    mainDetailsDiv.appendChild(statFooterBar);
    detailModal.appendChild(detailsFooter)

    //Modal Close Button
    const closeButtonDiv = document.createElement('div');
    const closeButton = document.createElement('button');
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.id = 'closeButton'
    detailsFooter.appendChild(closeButtonDiv);
    closeButton.appendChild(closeButtonTxt);

    //Modal Watermark Button
    const watermarkToggleDiv = document.createElement('div');
    const watermarkToggleBtn = document.createElement('button');
    const watermarkToggleTxt = document.createTextNode("Toggle Watermark");
    watermarkToggleBtn.id = 'watermarkToggle'
    detailsFooter.appendChild(watermarkToggleDiv);
    watermarkToggleBtn.appendChild(watermarkToggleTxt);

    detailModal.showModal();
    //Set watermark height to account for amout of content
    watermarkDiv.style.height = (mainDetailsDiv.clientHeight - 50) + 'px';
    closeButtonDiv.appendChild(closeButton);
    watermarkToggleDiv.appendChild(watermarkToggleBtn);
    modalListeners()
};

function tableSetup(classType, levelItem, classLevelsData) {
    const curLevel = levelItem.level;
    const profBonus = levelItem.prof_bonus;
    const rageDamage = levelItem.class_specific.rage_damage_bonus;
    const kiPoints = levelItem.class_specific.ki_points;
    const movement = levelItem.class_specific.unarmored_movement;
    const sorceryPoints = levelItem.class_specific.sorcery_points;
    const spellcasting = levelItem.spellcasting;
    const invocations = levelItem.class_specific.invocations_known;
    let features = "";
    let featureCount = 1;
    let rages = levelItem.class_specific.rage_count;
    let cantrips = 0;
    let spellSlots = 0;
    let slotLevel = '';
    let slots = [];
    if (rages === 9999) {
        rages = 'Unlimited';
    }
    levelItem.features.forEach( feat => {
        if (featureCount === 1) {
            features = feat.name;
            featureCount++
        } else {
            features += ", " + feat.name;
            featureCount++
        }
    });
    for (const slot in spellcasting) {
        const slotQuantity = spellcasting[slot];
        const spellSlotLevel = /spell_slots_level/i;
        console.log(slot)
        if (slot === 'cantrips_known') {
            cantrips = slotQuantity;
        } else if (slot === 'spells_known') {
            spells = slotQuantity;
        } else if (classType === 'warlock' && spellSlotLevel.test(slot)) {
            if (slotQuantity > 0) {
                const slotSplit = slot.split("_");
                const spellLevel = slotSplit[3];
                if (spellLevel == 1) {
                    slotLevel = '1st';
                } else if (spellLevel == 2) {
                    slotLevel = '2nd';
                } else if (spellLevel == 3) {
                    slotLevel = '3rd';
                } else if (spellLevel > 3) {
                    slotLevel = spellLevel + 'th';
                }
                spellSlots = slotQuantity;
            }
            slots.push(slotQuantity);
        } else if (spellSlotLevel.test(slot)) {
            slots.push(slotQuantity);
        }
    };
    if (classType === 'cleric' || classType === 'druid' || classType === 'wizard') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
            "Cantrips Known": cantrips,
            "Spell-Slots-per-Spell-Level": [
                {"1st": slots[0]},
                {"2nd": slots[1]},
                {"3rd": slots[2]},
                {"4th": slots[3]},
                {"5th": slots[4]},
                {"6th": slots[5]},
                {"7th": slots[6]},
                {"8th": slots[7]},
                {"9th": slots[8]}
            ]
        });
    } else if (classType === 'barbarian') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
            "Rages": rages,
            "Rage Damage": rageDamage
        });
    } else if (classType === 'bard') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
            "Cantrips Known": cantrips,
            "Spells Known": spells,
            "Spell-Slots-per-Spell-Level": [
                {"1st": slots[0]},
                {"2nd": slots[1]},
                {"3rd": slots[2]},
                {"4th": slots[3]},
                {"5th": slots[4]},
                {"6th": slots[5]},
                {"7th": slots[6]},
                {"8th": slots[7]},
                {"9th": slots[8]}
            ]
        });
    } else if (classType === 'fighter') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
        });
    } else if (classType === 'monk') {
        const martialArtsDie = levelItem.class_specific.martial_arts.dice_count;
        const martialArtsValue = levelItem.class_specific.martial_arts.dice_value;
        const martialArts = `${martialArtsDie}d${martialArtsValue}`;
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Martial Arts": martialArts,
            "Ki Points": kiPoints,
            "Unarmored Movement": movement,
            "Features": features
        });
    } else if (classType === 'paladin') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
            "Spell-Slots-per-Spell-Level": [
                {"1st": slots[0]},
                {"2nd": slots[1]},
                {"3rd": slots[2]},
                {"4th": slots[3]},
                {"5th": slots[4]}
            ]
        });
    } else if (classType === 'ranger') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
            "Spells Known": spells,
            "Spell-Slots-per-Spell-Level": [
                {"1st": slots[0]},
                {"2nd": slots[1]},
                {"3rd": slots[2]},
                {"4th": slots[3]},
                {"5th": slots[4]}
            ]
        });
    } else if (classType === 'rogue') {
        const sneakAttackDie = levelItem.class_specific.sneak_attack.dice_count;
        const sneakAttackValue = levelItem.class_specific.sneak_attack.dice_value;
        const sneakAttack = `${sneakAttackDie}d${sneakAttackValue}`;
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Sneak Attack": sneakAttack,
            "Features": features
        });
    } else if (classType === 'sorcerer') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Sorcery Points": sorceryPoints,
            "Features": features,
            "Cantrips Known": cantrips,
            "Spells Known": spells,
            "Spell-Slots-per-Spell-Level": [
                {"1st": slots[0]},
                {"2nd": slots[1]},
                {"3rd": slots[2]},
                {"4th": slots[3]},
                {"5th": slots[4]},
                {"6th": slots[5]},
                {"7th": slots[6]},
                {"8th": slots[7]},
                {"9th": slots[8]}
            ]
        });
    } else if (classType === 'warlock') {
        classLevelsData.push({
            "Level": curLevel,
            "Proficiency Bonus": `+${profBonus}`,
            "Features": features,
            "Cantrips Known": cantrips,
            "Spells Known": spells,
            "Spell Slots": spellSlots,
            "Slot Level": slotLevel,
            "Invocations Known": invocations,
        });
    }
}

function equipDetailsWindow(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    const equipData = dataCache['equipment'][data.index];
    const equipIndex = data.index
    const equipType = equipData['equipment_category'].name;
    const equipCost = equipData.cost;
    const equipWeight = equipData.weight;
    let equipWeightUnit = '';
    if (equipWeight < 2) {
        equipWeightUnit = 'lb';
    } else {
        equipWeightUnit = 'lbs';
    }
    let equipDesc = equipData.desc;

    if (equipIndex === 'abacus') {
        equipDesc = "A standard tool used to make calculations."
    } else if (equipIndex === 'backpack') {
        equipDesc = "A backpack is a leather pack carried on the back, typically with straps to secure it. A backpack can hold 1 cubic foot/ 30 pounds of gear. You can also strap items, such as a bedroll or a coil of rope, to the outside of a backpack."
    }

    //Create Modal Window
    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //FIXME P3T2 Remove watermark coding from this function (equipment) as it is not being used here.
    //Watermark image
    const watermarkDiv = document.createElement('div');
    watermarkDiv.id = 'watermark';
    watermarkDiv.className = 'watermark';
    detailModal.appendChild(watermarkDiv);
    watermarkDiv.style.backgroundImage = `url(./images/${currentPage}/${data.index}.jpg)`;

    //Header
    const detailsHeader = document.createElement('div');
    const detailName = document.createElement('h3');
    detailsHeader.appendChild(detailName);
    detailModal.appendChild(detailsHeader);
    detailsHeader.id = 'detailsHeader';
    detailName.className = 'detailHeader'
    detailName.textContent = data.name;

    //Details Content
    const mainDetailsDiv = document.createElement('div');
    mainDetailsDiv.classList.add('equipDetailContent');
    detailModal.appendChild(mainDetailsDiv);

    //Details Container
    const statHeaderBar = document.createElement('img');
    const detailTextContent = document.createElement('div');
    const detailItemsDiv = document.createElement('div');
    statHeaderBar.src = './images/page-elements/stat-bar-book.png';
    statHeaderBar.classList.add('equipHeadFootBar');
    detailTextContent.classList.add('equipTextContent');
    detailItemsDiv.classList.add('equipItemsDiv');
    mainDetailsDiv.appendChild(statHeaderBar);
    mainDetailsDiv.appendChild(detailTextContent);
    detailTextContent.appendChild(detailItemsDiv);

    //Equipment Type
    const equipTypeDiv = document.createElement('div');
    const equipTypePara = document.createElement('p');
    detailItemsDiv.appendChild(equipTypeDiv);
    equipTypeDiv.appendChild(equipTypePara);
    equipTypePara.innerHTML = `<span>Equipment Type:</span> ${equipType}`;
    equipTypeDiv.className = 'equipTxtDiv';
    equipTypePara.className = 'equipTxtContent';

    //Equipment Cost
    const equipCostDiv = document.createElement('div');
    const equipCostPara = document.createElement('p');
    detailItemsDiv.appendChild(equipCostDiv);
    equipCostDiv.appendChild(equipCostPara);
    equipCostPara.innerHTML = `<span>Equipment Cost:</span> ${equipCost.quantity}${equipCost.unit}`;
    equipCostDiv.className = 'equipTxtDiv';
    equipCostPara.className = 'equipTxtContent';

    //Equipment Weight
    const equipWeightDiv = document.createElement('div');
    const equipWeightPara = document.createElement('p');
    detailItemsDiv.appendChild(equipWeightDiv);
    equipWeightDiv.appendChild(equipWeightPara);
    equipWeightPara.innerHTML = `<span>Equipment Weight:</span> ${equipWeight}${equipWeightUnit}`;
    equipWeightDiv.className = 'equipTxtDiv';
    equipWeightPara.className = 'equipTxtContent';

    //Equipment Description
    const equipDescDiv = document.createElement('div');
    const equipDescPara = document.createElement('p');
    detailItemsDiv.appendChild(equipDescDiv);
    equipDescDiv.appendChild(equipDescPara);
    equipDescPara.innerHTML = equipDesc;
    equipDescDiv.className = 'equipTxtDiv';
    equipDescPara.className = 'equipTxtContent';

    //Footer
    const detailsFooter = document.createElement('div');
    const statFooterBar = document.createElement('img');
    detailsFooter.id = 'detailsFooter';
    statFooterBar.src = './images/page-elements/stat-bar-book.png';
    statFooterBar.classList.add('equipHeadFootBar');
    mainDetailsDiv.appendChild(statFooterBar);
    detailModal.appendChild(detailsFooter)

    //Modal Close Button
    const closeButtonDiv = document.createElement('div');
    const closeButton = document.createElement('button');
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.id = 'closeButton'
    detailsFooter.appendChild(closeButtonDiv);
    closeButton.appendChild(closeButtonTxt);

    //Modal Watermark Button
    const watermarkToggleDiv = document.createElement('div');
    const watermarkToggleBtn = document.createElement('button');
    const watermarkToggleTxt = document.createTextNode("Toggle Watermark");
    watermarkToggleBtn.id = 'watermarkToggle'
    detailsFooter.appendChild(watermarkToggleDiv);
    watermarkToggleBtn.appendChild(watermarkToggleTxt);

    detailModal.showModal();
    //Set watermark height to account for amout of content
    watermarkDiv.style.height = (mainDetailsDiv.clientHeight - 50) + 'px';
    closeButtonDiv.appendChild(closeButton);
    watermarkToggleDiv.appendChild(watermarkToggleBtn);
    modalListeners()
};

function magicItemDetailsWindow(data) {
    const NUM_OF_ITEMS = Object.keys(data).length;
    const magicItemIndex = data.index

    const magicItemData = dataCache['magic-items'][magicItemIndex];
    const magicItemType = magicItemData.equipment_category.name;
    const magicItemName = magicItemData.name;
    const magicItemRarity = magicItemData.rarity.name;
    const magicItemIsVariant = magicItemData.variant;
    const magicItemVariants = magicItemData.variants;
    const magicItemDescRaw = magicItemData.desc;
    const magicItemMainData = getItemAtts(magicItemDescRaw[0]);
    const filterDesc = magicItemMainData.filter(att => !att.includes('+') && !att.includes('requires') && !att.includes('any'));
    const filterMats = magicItemMainData.filter(att => !att.includes('+') && !att.includes('requires'));
    const filterWeapon = filterMats.filter(att => !att.includes('arrow') && !att.includes('dagger'));
    console.log(magicItemData)
/*     console.log(data);
    console.log(magicItemIndex);
    console.log(magicItemData);
    console.log(magicItemType);
    console.log(magicItemName);
    console.log(magicItemDescRaw);
    console.log(magicItemRarity);
    console.log(magicItemIsVariant);
    console.log(magicItemVariants); */

    //TODO CONTINUE HERE
    //TODO Do a console.log on all desc[0] strings and find out what the options are. Decide how to filter them.
    //TODO If keeping nothing with Type or changing things - clean up these vars.

    function getItemAtts(string) {
        const regex = /\(([^)]+)\)/g;
        const matches = string.match(regex);

        if (matches) {
            return matches.map((match) => match.slice(1, -1));
        } else {
            return [];
        }
    };
    const itemAtts = getItemAtts(magicItemDescRaw[0]);
/* 
    let armorDescCount = 0;
    let potionDescCount = 0;
    let ringDescCount = 0;
    let rodDescCount = 0;
    let scrollDescCount = 0;
    let staffDescCount = 0;
    let wandDescCount = 0;
    let weaponDescCount = 0;
    let wonderDescCount = 0;
    let uncountedDescItems = 0;
    //TODO Reset filtering to find the (+1,2,3) so I can update rarity "varies" values.
    testData = dataCache['magic-items'];
    for (key in testData) {
        const itemData = testData[key]
        const desc = itemData.desc
        const name = itemData.name
        if (desc[0].includes('Wondrous') || desc[0].includes('Wondous')) {
            const wondrousDataTypes = getItemAtts(desc[0]);
            const wondrousFilter = wondrousDataTypes.filter(att => !att.includes('requires'));

            wonderDescCount++
        } else if (desc[0].includes('Armor')) {
            const armorDataTypes = getItemAtts(desc[0]);
            const armorFilter = armorDataTypes.filter(att => !att.includes('+') && !att.includes('requires'));
            armorDescCount++
        } else if (desc[0].includes('Potion')) {
            potionDescCount++
        } else if (desc[0].includes('Ring')) {
            const ringDataTypes = getItemAtts(desc[0]);
            const ringFilter = ringDataTypes.filter(att => !att.includes('requires'));
            ringDescCount++
        } else if (desc[0].includes('Rod')) {
            const rodDataTypes = getItemAtts(desc[0]);
            const rodFilter = rodDataTypes.filter(att => !att.includes('requires'));
            rodDescCount++
        } else if (desc[0].includes('Scroll')) {
            scrollDescCount++
        } else if (desc[0].includes('Staff')) {
            const staffDataTypes = getItemAtts(desc[0]);
            const staffFilter = staffDataTypes.filter(att => !att.includes('requires'));
            staffDescCount++
        } else if (desc[0].includes('Wand')) {
            const wandDataTypes = getItemAtts(desc[0]);
            const wandFilter = wandDataTypes.filter(att => !att.includes('+') && !att.includes('requires'));
            wandDescCount++
        } else if (desc[0].includes('Weapon')) {
            const weaponDataTypes = getItemAtts(desc[0]);
            const weaponFilter = weaponDataTypes.filter(att => !att.includes('+') && !att.includes('requires') && !att.includes('any') && !att.includes('arrow') && !att.includes('dagger'));
            console.log(weaponFilter);
            console.log(name);
            weaponDescCount++
        } else if (desc.length > 1) {
            console.log(desc[0]);
            console.log(itemData.name);
            uncountedDescItems++
        } else {
            console.log('1 =')
            console.log(desc);
            console.log(itemData.name);
            uncountedDescItems++
        }
    } 
    
    console.log(`Armor Items: ${armorDescCount}`);
    console.log(`Potion Items: ${potionDescCount}`);
    console.log(`Ring Items: ${ringDescCount}`);
    console.log(`Rod Items: ${rodDescCount}`);
    console.log(`Scroll Items: ${scrollDescCount}`);
    console.log(`Staff Items: ${staffDescCount}`);
    console.log(`Wand Items: ${wandDescCount}`);
    console.log(`Weapon Items: ${weaponDescCount}`);
    console.log(`Wondrous Items: ${wonderDescCount}`);
    const totalCountedDescItems = armorDescCount + potionDescCount + ringDescCount + rodDescCount + scrollDescCount + staffDescCount + wandDescCount + weaponDescCount + wonderDescCount;
    const netTotalDescItems = totalCountedDescItems + uncountedDescItems;
    console.log(`Total counted items: ${totalCountedDescItems}, Total uncounted items: ${uncountedDescItems} - Net total items: ${netTotalDescItems}`);
 */
    //Create Modal Window
    const detailModal = document.createElement('dialog');
    mainElement.appendChild(detailModal);
    detailModal.id = 'detailModal';
    detailModal.classList.add('modalWindow');

    //Header
    const detailsHeader = document.createElement('div');
    const detailName = document.createElement('h3');
    detailsHeader.appendChild(detailName);
    detailModal.appendChild(detailsHeader);
    detailsHeader.id = 'detailsHeader';
    detailName.className = 'detailHeader'
    detailName.textContent = data.name;

    //Details Content
    const mainDetailsDiv = document.createElement('div');
    mainDetailsDiv.classList.add('equipDetailContent');
    detailModal.appendChild(mainDetailsDiv);

    //Details Container
    const statHeaderBar = document.createElement('img');
    const detailTextContent = document.createElement('div');
    const detailItemsDiv = document.createElement('div');
    statHeaderBar.src = './images/page-elements/stat-bar-book.png';
    statHeaderBar.classList.add('equipHeadFootBar');
    detailTextContent.classList.add('equipTextContent');
    detailItemsDiv.classList.add('equipItemsDiv');
    mainDetailsDiv.appendChild(statHeaderBar);
    mainDetailsDiv.appendChild(detailTextContent);
    detailTextContent.appendChild(detailItemsDiv);

    //Magic Item Type
    const magicItemTypeDiv = document.createElement('div');
    const magicItemTypePara = document.createElement('p');
    magicItemTypePara.innerHTML = `<span>Magic Item Type:</span> ${magicItemType}`;
    detailItemsDiv.appendChild(magicItemTypeDiv);
    magicItemTypeDiv.appendChild(magicItemTypePara);
    magicItemTypeDiv.className = 'equipTxtDiv';
    magicItemTypePara.className = 'equipTxtContent';

    //Magic Item Rarity
    const magicItemRarityDiv = document.createElement('div');
    const magicItemRarityKey = document.createElement('p');
    const magicItemRarityPara = document.createElement('p');
    const filterRarity = getItemAtts(dataCache['magic-items'][data.index].desc[0])
    detailItemsDiv.appendChild(magicItemRarityDiv);
    magicItemRarityDiv.appendChild(magicItemRarityKey);
    magicItemRarityDiv.appendChild(magicItemRarityPara);
    magicItemRarityKey.innerHTML = '<span>Magic Item Rarity:</span> ';
    function filterForRarity(inputString) {
        // Define a regular expression to match content within parentheses with at least one comma
        const regex = /\([^)]*,[^)]*\)/g;
        const regexPlusOne = /\+1/;
        const regexPlusTwo = /\+2/;
        const regexPlusThree = /\+3/;
        // Replace the matched content with an empty string
        const resultOne = inputString.replace(regex, '');
        // Split string at commas
        const resultOneSplit = resultOne.split(',');
        resultOneSplit.shift();
        // Find rarities
        plusOneRarity = '';
        plusTwoRarity = '';
        plusThreeRarity = '';
        let rarityCounter = 0;
        resultOneSplit.forEach( curString => {
            const stringSplit = curString.split(' ');
            rarityCounter++
            if (rarityCounter === 1) {
                if (stringSplit[2] === 'very') {
                    plusOneRarity = `${extractParenth(stringSplit[4])} = <span class='${stringSplit[2]}${capitalizeWords(stringSplit[3])}'>${capitalizeWords(stringSplit[2])} ${capitalizeWords(stringSplit[3])}</span>`;
                } else {
                    plusOneRarity = `${extractParenth(stringSplit[2])} = <span class='${stringSplit[1]}'>${capitalizeWords(stringSplit[1])}</span>`;
                }
            } else if (rarityCounter === 2) {
                if (stringSplit[2] === 'very') {
                    plusTwoRarity = `${extractParenth(stringSplit[4])} = <span class='${stringSplit[2]}${capitalizeWords(stringSplit[3])}'>${capitalizeWords(stringSplit[2])} ${capitalizeWords(stringSplit[3])}</span>`;
                } else {
                    plusTwoRarity = `${extractParenth(stringSplit[2])} = <span class='${stringSplit[1]}'>${capitalizeWords(stringSplit[1])}</span>`;
                }
            } else if (rarityCounter === 3) {
                if (stringSplit[2] === 'very') {
                    plusThreeRarity = `${extractParenth(stringSplit[4])} = <span class='${stringSplit[2]}${capitalizeWords(stringSplit[3])}'>${capitalizeWords(stringSplit[2])} ${capitalizeWords(stringSplit[3])}</span>`;
                } else {
                    plusThreeRarity = `${extractParenth(stringSplit[2])} = <span class='${stringSplit[1]}'>${capitalizeWords(stringSplit[1])}</span>`;
                }

            }

        });
        return `${plusOneRarity}, ${plusTwoRarity}, ${plusThreeRarity}`;
    }
    if (filterRarity.includes('silver or brass')){
        magicItemRarityPara.innerHTML = "Silver or Brass = <span class='rare'>Rare</span>, Bronze = <span class='veryRare'>Very Rare</span>, Iron = <span class='legendary'>Legendary</span>.";
    } else if (filterRarity.includes('+1') && filterRarity.includes('+2') && filterRarity.includes('+3')){
        magicItemRarityPara.innerHTML = filterForRarity(magicItemDescRaw[0]);
    } else {
        console.log('Youve been elsed!!!')
        magicItemRarityPara.textContent = `${magicItemRarity}`;
    }
    if (magicItemRarity === 'Common') {
        magicItemRarityPara.classList.add('common');
    } else if (magicItemRarity === 'Uncommon') {
        magicItemRarityPara.classList.add('uncommon');
    } else if (magicItemRarity === 'Rare') {
        magicItemRarityPara.classList.add('rare');
    } else if (magicItemRarity === 'Very Rare') {
        magicItemRarityPara.classList.add('varyRare');
    } else if (magicItemRarity === 'Legendary') {
        magicItemRarityPara.classList.add('legendary');
    } else if (magicItemRarity === 'Varies') {
        console.log(`We got us a ${magicItemRarity} rarity value!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
        console.log(magicItemName);
        console.log(magicItemRarity);
        console.log(magicItemDescRaw);
    
    } else {
        console.log(`We got us a ${magicItemRarity} rarity value!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
        console.log(magicItemName);
    }
    magicItemRarityDiv.className = 'rarityTxtDiv';
    magicItemRarityKey.className = 'equipTxtContent';
    magicItemRarityPara.classList.add('equipTxtContent');

    //Magic Item Attune
    const magicItemAttuneDiv = document.createElement('div');
    const magicItemAttunePara = document.createElement('p');
    const attuneFilter = itemAtts.filter(att => !att.includes('+'));
    detailItemsDiv.appendChild(magicItemAttuneDiv);
    magicItemAttuneDiv.appendChild(magicItemAttunePara);
    function attune() {
        const needsAttune = /requires attunement/i;
        const specialAttune = /requires attunement /i;
        if (needsAttune.test(itemAtts)) {
            if (specialAttune.test(itemAtts)) {
                return `True - ${attuneFilter}.`;
            } else {
                return 'True';
            }
        } else {
            return "False";
        }};
    magicItemAttunePara.innerHTML = `<span>Requires Attunement:</span> ${attune()}`;
    magicItemAttuneDiv.className = 'equipTxtDiv';
    magicItemAttunePara.className = 'equipTxtContent';

    //TODO Magic Item MATS need work
    //Magic Item Material
    const magicItemMatsDiv = document.createElement('div');
    const magicItemMatsPara = document.createElement('p');
    detailItemsDiv.appendChild(magicItemMatsDiv);
    magicItemMatsDiv.appendChild(magicItemMatsPara);
    const anyWeaponRegex = /any /i;
    if (filterMats.includes('any')) {
        magicItemMatsPara.innerHTML = `<span>Magic Item Material:</span> Any weapon`;
        console.log(`CHECK: Is ${magicItemName} a weapon?`);
    } else if (anyWeaponRegex.test(filterMats)) {
        magicItemMatsPara.innerHTML = `<span>Magic Item Material:</span> ${filterMats}`;
    } else if (0 === 0) {
        magicItemMatsPara.innerHTML = `<span>Magic Item Material:</span> None`;
        console.log(magicItemDescRaw[0])
    } else {
        console.log(filterAtts)
    }
    magicItemMatsDiv.className = 'equipTxtDiv';
    magicItemMatsPara.className = 'equipTxtContent';

    //TODO Create a function to make lists, tables, etc. where applicable.
    //Magic Item Description
    const equipDescDiv = document.createElement('div');
    const equipDescPara = document.createElement('p');
    detailItemsDiv.appendChild(equipDescDiv);
    equipDescDiv.appendChild(equipDescPara);
    let descCounter = 0;
    let magicItemDesc = [];
    if (magicItemDescRaw.length < 1) {
        magicItemDesc = 'No description available.'
    } else {
        magicItemDescRaw.forEach( para => {
            if (descCounter === 0) {
                console.log('0')
                descCounter++
            } else {
                magicItemDesc.push(para)
                descCounter++
            }
        });
    }
    equipDescPara.innerHTML = magicItemDesc;
    equipDescDiv.className = 'equipTxtDiv';
    equipDescPara.className = 'equipTxtContent';

    //Footer
    const detailsFooter = document.createElement('div');
    const statFooterBar = document.createElement('img');
    detailsFooter.id = 'detailsFooter';
    statFooterBar.src = './images/page-elements/stat-bar-book.png';
    statFooterBar.classList.add('equipHeadFootBar');
    mainDetailsDiv.appendChild(statFooterBar);
    detailModal.appendChild(detailsFooter)

    //Modal Close Button
    const closeButtonDiv = document.createElement('div');
    const closeButton = document.createElement('button');
    const closeButtonTxt = document.createTextNode("Click to close");
    closeButton.id = 'closeButton'
    detailsFooter.appendChild(closeButtonDiv);
    closeButton.appendChild(closeButtonTxt);

    //TODO P5-T1 Finish removing the watermark toggle button including listeners and figure out how to deal with pages that don't have the watermark.
    //Modal Watermark Button
    const watermarkToggleDiv = document.createElement('div');
    const watermarkToggleBtn = document.createElement('button');
    const watermarkToggleTxt = document.createTextNode("Toggle Watermark");
    watermarkToggleBtn.id = 'watermarkToggle';
    detailsFooter.appendChild(watermarkToggleDiv);
    watermarkToggleBtn.appendChild(watermarkToggleTxt);
    watermarkToggleDiv.appendChild(watermarkToggleBtn);


    detailModal.showModal();
    closeButtonDiv.appendChild(closeButton);
    modalListeners()
};

function setUpSheets() {

    currentPage = 'sheets';
    setMainClass();

    mainElement.classList.remove('homePageContent');
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
characterNav = document.getElementById('#characters');
monsterNav = document.getElementById('#monsters');
itemNav = document.getElementById('#items');
miscNav = document.getElementById('#misc');
allNav = document.querySelectorAll('nav ul li a');

// NavBar:
function setNavListen() {
    allNav.forEach( eachItem => {
        eachItem.addEventListener('click', async function(e){
            e.preventDefault();
            //console.log(eachItem.id)
            if (eachItem.id === 'home' || eachItem.id === 'items' || eachItem.id === 'misc') {
                hideFilters();
                goHome(eachItem.id);
            } else if (eachItem.id === 'characters') {
                hideFilters();
                charHome(eachItem.id);
            } else if (eachItem.id === 'races' || eachItem.id === 'classes' || eachItem.id === 'conditions') {
                hideFilters();
                currentPage = eachItem.id;
                await prepLoad(eachItem.id);
                if (localCacheAssets['additional-data'].assets.includes(currentPage)) {
                    prepLoadAddition(currentPage);
                }
                addContent(dataCache[eachItem.id], 'main');
            } else if (eachItem.id === 'equipment' || eachItem.id === 'magic-items') {
                //FIXME This is temp until new localCache loading system in place
                hideFilters();
                currentPage = eachItem.id;
                await prepLoad(eachItem.id);
                if (localCacheAssets['additional-data'].assets.includes(currentPage)) {
                    prepLoadAddition(currentPage);
                }
                addContent(dataCache[eachItem.id], 'list');
            } else if (eachItem.id === 'sheets') {
                hideFilters();
                setUpSheets();
            } else {
                //console.log('ELSE')
                hideFilters();
                currentPage = eachItem.id;
                await prepLoad(eachItem.id);
                addContent(dataCache[eachItem.id], 'list');
            }
        }); 
    });
};
setNavListen();

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
    const filterDcSelect = document.getElementById('dcFilter');



    const filterToggleBtns = document.querySelectorAll(`.spellFilter button`)
    const resetButton = document.getElementById('resetFilter');

    let resultCount = items.length;

    //console.log(currentPage)

    if (currentPage === 'spells') { 
        filterContainer.classList.remove('filterInputOnly');
        filterContainer.classList.add('spellFilterContainer');

        for (const eachItem of spellFilter) {
            eachItem.style.display = 'block';
        }
        filterLast.style.display = 'inline-flex';
    } else if (currentPage === 'monsters' || currentPage === 'equipment' || currentPage === 'magic-items') { 
        filterContainer.classList.remove('filterInputOnly');
        filterContainer.classList.add('spellFilterContainer');
    } else {
        filterContainer.classList.remove('spellFilterContainer');
        filterContainer.classList.add('filterInputOnly');
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
        const selectedDc = filterDcSelect.value;



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
            const itemDc = item.dataset.dc;
            const itemHeal = item.dataset.heal;
            const itemConc = item.dataset.conc;
            const itemRitual = item.dataset.ritual;

            const classFilterBtn = document.getElementById('classFilterBtn');
            const schoolFilterBtn = document.getElementById('schoolFilterBtn');
            const levelFilterBtn = document.getElementById('levelFilterBtn');
            const damTypeFilterBtn = document.getElementById('damTypeFilterBtn');
            const rangeFilterBtn = document.getElementById('rangeFilterBtn');
            const areaFilterBtn = document.getElementById('areaFilterBtn');
            const dcFilterBtn = document.getElementById('dcFilterBtn');
            const healFilterBtn = document.getElementById('healFilterBtn');
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

            if (rangeFilterBtn.className === 'filterToggleOn' && selectedRange !== 'all') {
                let matchFound = false;
                //console.log(selectedRange)
                if (itemRange === selectedRange){
                    matchFound = true;
                } else { 
                    const splitRangeValue = itemRange.split(" ");
                    const distanceQuantity = splitRangeValue[0];
                    const distanceScale = splitRangeValue[1];
                    
                    if (splitRangeValue.length > 1) {

                        if (distanceScale === 'mile') {
                            if (selectedRange === '1 mile'){
                                matchFound = true;
                            }
                        } else if (distanceQuantity <= 25) {
                            if (selectedRange === 'lessThanTwentyFive'){
                                matchFound = true;
                            }
                        } else if (distanceQuantity > 25 && distanceQuantity <= 50) {
                            if (selectedRange === 'twentyFiveToFifty'){
                                matchFound = true;
                            }
                        } else if (distanceQuantity > 50 && distanceQuantity <= 100) {
                            if (selectedRange === 'fiftyToOneHundred'){
                                matchFound = true;
                            }
                        } else if (distanceQuantity > 100 && distanceQuantity <= 250 ) {
                            if (selectedRange === 'oneHundredToTwoFifty'){
                                matchFound = true;
                            }
                        } else if (distanceQuantity > 250 && distanceQuantity <= 500) {
                            if (selectedRange === 'twoFiftyToFiveHundred'){
                                matchFound = true;
                            }
                        }
                    }
                }
                if (!matchFound) {
                    item.style.display = 'none';
                }
            }

            if (areaFilterBtn.className === 'filterToggleOn' && selectedArea !== 'all' && selectedArea !== itemArea) {
                item.style.display = 'none';
            }

            if (dcFilterBtn.className === 'filterToggleOn' && selectedDc !== 'all' && selectedDc !== itemDc) {
                item.style.display = 'none';
            }

            if (healFilterBtn.className === 'filterToggleOn' && itemHeal === 'false') {
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

//TODO Update resetFilter to accomodate new filter options - make sure EVERYTHING resets!
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

async function fetchData(curLocation) {
    const apiPromise = await fetch(curLocation);
    apiIndex = await apiPromise.json();
    //console.log(apiIndex)
    itemType = extractPortion(curLocation, 2)
    apiData = apiIndex
};

//TODO P3-1 I think I can reduce conditionals by reusing for some
async function fetchSecondaryData(curFile, dataType) {
    //console.log(curFile)
    if (dataType === 'images' || dataType === 'pageData') {
        const jsonPromise = await fetch(curFile);
        jsonIndex = await jsonPromise.json();

        jsonData = jsonIndex;
        jsonCount = jsonIndex.count;
    } else if (dataType === 'traits' || dataType === 'subraces' || dataType === 'subclasses') {
        //console.log('loading traits')
        const jsonPromise = await fetch(curFile);
        jsonIndex = await jsonPromise.json();

        //FIXME P5 - Why even have jsonData = jsonIndex?
        jsonData = jsonIndex;
    } else if (dataType === 'levels') {
        //console.log('loading traits')
        const jsonPromise = await fetch(curFile);
        jsonIndex = await jsonPromise.json();

    } else {
        console.log('fetchSecondaryData failed due to bad dataType.')
    }
        

};

async function fetchAddedData(curLocation) {
    const apiPromise = await fetch(curLocation);
    apiAdditionIndex = await apiPromise.json();
};

function setContentType(count) {
    if (count > 40) {
        return 'details';
    } else {
        return 'main';
    }
};

function setMainClass() {

    if (currentPage === 'home' || currentPage === 'items' || currentPage === 'misc') {
        mainElement.classList.remove('homeContent');
        mainElement.classList.remove('cardContent');
        mainElement.classList.remove('listContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('pageContent');
        return;
    } else if (currentPage === 'characters') {
        mainElement.classList.remove('homePageContent');
        mainElement.classList.remove('pageContent');
        mainElement.classList.remove('cardContent');
        mainElement.classList.remove('listContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('homeContent');
        return;
    } else if (currentPage === 'monsters' || currentPage === 'spells' || currentPage === 'equipment' || currentPage === 'magic-items') {
        mainElement.classList.remove('homePageContent');
        mainElement.classList.remove('homeContent');
        mainElement.classList.remove('pageContent');
        mainElement.classList.remove('cardContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('listContent');
        return;
    } else {
        mainElement.classList.remove('homePageContent');
        mainElement.classList.remove('homeContent');
        mainElement.classList.remove('pageContent');
        mainElement.classList.remove('listContent');
        mainElement.classList.remove('sheets');
        mainElement.classList.add('cardContent');
        return;
    }

};

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

function modalListeners() {
    const closeButton = document.getElementById('closeButton');
    const watermarkToggleBtn = document.getElementById('watermarkToggle');

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

    function watermarkTogListener() {
        const watermark = document.getElementById('watermark');
        if (watermark.style.display === 'none') {
            watermark.style.display = 'block';
        } else {
            watermark.style.display = 'none';
        }
    }

    // Add event listeners
    document.addEventListener('keydown', keydownListener);
    document.addEventListener('click', clickListener);
    closeButton.addEventListener('click', closeButtonListener);
    watermarkToggleBtn.addEventListener('click', watermarkTogListener);

    function cleanUpModal() {
        const modal = document.getElementById('detailModal');
        modal.remove();
        
        // Remove event listeners
        document.removeEventListener('click', clickListener);
        document.removeEventListener('keydown', keydownListener);
        closeButton.removeEventListener('click', clickListener);
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

    } else if (type === 'magic-items') {
        for (article of articles) {
            const CUR_NAME = article.id
            const CUR_TYPE = dataCache['magic-items'][CUR_NAME].type;
            const CUR_IMG = document.getElementById(`${CUR_NAME}Img`);
            if (CUR_TYPE === 'armor' || CUR_TYPE === 'potion' || CUR_TYPE === 'ring' || CUR_TYPE === 'rod' || CUR_TYPE === 'scroll' || CUR_TYPE === 'staff' || CUR_TYPE === 'wand' || CUR_TYPE === 'weapon' || CUR_TYPE === 'wondrous-items') {
                CUR_IMG.src = `./images/page-elements/${CUR_TYPE}-placeholder.jpg`;                 
            } else if (CUR_TYPE === 'arrow-of-slaying' || CUR_TYPE === 'ammunition' || CUR_TYPE === 'ammunition-1' || CUR_TYPE === 'ammunition-2' || CUR_TYPE === 'ammunition-3') {
                CUR_IMG.src = `./images/page-elements/weapon-placeholder.jpg`;                 
            } else {
                // Set placeholder when no match is found
                console.log(`@PlaceImages - ${CUR_NAME} has the type of ${CUR_NAME} and is therefore not getting a match!!!!!!!!!!!!1`)
                CUR_IMG.src = './images/page-elements/image_placeholder.gif';
            }
        }
    } else {
        const CUR_FILES = dataCache['images'][currentPage]
        let fileType = '';
        for (article of articles) {
            const CUR_NAME = article.id
            if (currentPage === 'spells') {
                fileType = '.gif'
            } else {
                fileType = '.jpg'
            }
            const CUR_FILE = article.id + fileType;
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

function generateTableHead(table, data) {
    const headers = Object.keys(data);
    const thead = table.createTHead();
    const row = thead.insertRow();
    row.className = 'mainHeaders'
    let subHeadings = false;
    for (const key of headers) {
        const eachItem = data[key]
        if (Array.isArray(eachItem) && eachItem.length > 0) {
            subHeadings = true;
        }
    }
    if (subHeadings === true) {
        const subRow = thead.insertRow();
        for (const key of headers) {
            const eachItem = data[key]
            // Check if the key is an array of objects (indicating sub-headings)
            if (Array.isArray(eachItem) && eachItem.length > 0) {
                const subHeadCount = eachItem.length;
                const mainHead = document.createElement("th");
                const fixedKey = makeTitle(key.replace(/-/g, ' '));
                const text = document.createTextNode(fixedKey);
                mainHead.className = 'table-cell';
                mainHead.colSpan = subHeadCount;
                mainHead.appendChild(text);
                row.appendChild(mainHead);
    
                eachItem.forEach( subHead => {
                    const subHeadKey = Object.keys(subHead);
                    const subHeadth = document.createElement("th");
                    const text = document.createTextNode(subHeadKey);
                    subHeadth.className = 'spell-slot-cell';
                    subHeadth.id = subHeadKey;
                    subHeadth.appendChild(text);
                    subRow.appendChild(subHeadth);
                });
            } else {
                // Create a regular cell for the main heading
                const th = document.createElement("th");
                const fixedKey = makeTitle(key.replace(/-/g, ' '));
                const text = document.createTextNode(fixedKey);
                th.className = 'table-cell';
                th.rowSpan = 2;
                th.id = key.toLowerCase().replace(' ', '_');
                th.appendChild(text);
                row.appendChild(th);
            }
        }
    } else {
        for (const key of headers) {
            // Create a regular cell for the main heading
            const th = document.createElement("th");
            const fixedKey = makeTitle(key.replace(/_/g, ' '));
            const text = document.createTextNode(fixedKey);
            th.className = 'table-cell';
            th.id = key.toLowerCase().replace(' ', '_');
            th.appendChild(text);
            row.appendChild(th);
        }
    }
}

function generateTable(table, data) {
    console.log(data)
    for (const element of data) {
        const row = table.insertRow();
        for (key in element) {
            const eachItem = element[key];
            if (Array.isArray(eachItem) && eachItem.length > 0) {
                eachItem.forEach( curItem => {
                    const cellValue = Object.values(curItem);
                    const cell = row.insertCell();
                    const text = document.createTextNode(cellValue);
                    cell.appendChild(text);
                });

            } else {
                const cell = row.insertCell();
                const text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    }
};

function columnByHeader(table, header) {
    const allHeaders = table.querySelectorAll('th');
    const headerId = header.toLowerCase().replace(' ', '_');
    let childNumber = 0;

    allHeaders.forEach( head => {
        if ( head.id === headerId ) {
            const parentElement = head.parentNode;
            const children = parentElement.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i] === head) {
                    childNumber = i + 1;
                    break;
                }
            }
            console.log(childNumber)
        }
    });
    return childNumber;
};

function extractPortion(string, portionIndex, separator="/") {
    // Ex. console.log(extractPortion(url, 0));  // Returns "www.example.co"
    // Ex. console.log(extractPortion("three-word-string", 2, "-"));  // Returns "word"
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
};

function extractParenth(inputString) {
  // Define a regular expression to match content within parentheses
  const regex = /\(([^)]*)\)/;

  // Use the match method to find the content within parentheses
  const match = inputString.match(regex);

  // Check if a match is found and return the content
  if (match && match[1]) {
    return match[1];
  } else {
    // Return an empty string if no match is found
    return '';
  }
};

function capitalizeWords(inputString) {
    return inputString
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words back together
};

function capitalizeFirstWord(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

// TODO P3T2 Replace capitalizeWords function with this function where applicable - maybe every time..?
function makeTitle(inputString) {
    const splitString = inputString.split(' ');
    const newString = [];
    let curWord = 0;
    splitString.forEach( word => {
        if (curWord > 0) {
            if (word == 'a' || word == 'an' || word == 'at' || word == 'to' || word == 'the' || word == 'and' || word == 'but' || word == 'by' || word == 'of' || word == 'in' || word == 'for' || word == 'nor' || word == 'or' || word == 'so' || word == 'yet') {
                newString.push(word); // Leave this word alone
            } else {
                const firstCap = word.charAt(0).toUpperCase(); // Capitalize first letter
                const wordLast = word.slice(1); // Remove first lower-case letter
                const newWord = firstCap + wordLast; // Join first uppercase letter with rest of word
                newString.push(newWord); // Add capitalized word back to the array
            }
        } else {
            const firstCap = word.charAt(0).toUpperCase(); // Capitalize each word
            const wordLast = word.slice(1); // Remove first lower-case letter
            const newWord = firstCap + wordLast; // Join first uppercase letter with rest of word
            newString.push(newWord); // Add capitalized word back to the array
        }
        curWord++
    });
    return newString.join(' '); // Join the words back together and return it
};

function arrayToSentence(array, noneValue) {
    let itemCount = 0;
    let newString = "";
    if (array.length > 0) {
        array.forEach( item => {
            if (itemCount === 0) {
                const capItem = capitalizeWords(item);
                const cleanItem = capItem.replace('-', ' ');
                newString = cleanItem;
            } else {
                const cleanItem = item.replace('-', ' ');
                newString += ", ";
                newString += cleanItem;
            }
            itemCount++
        });
        return newString;
    } else {
        if (noneValue) {
            return noneValue;
        } else {
            return "";
        }
    }
};

function ArrayToListItem(array, noneValue) {
    let itemCount = 0;
    let newString = "";
    if (array.length > 0) {
        array.forEach( item => {
            const firstChar = item.charAt(0);
            if (itemCount === 0) {
                if (firstChar.typeof == number) {
                    const splitItem = item.split
                    const cleanItem = item.replace('-', ' ');
                    const finishedItem = `An ${cleanItem}`;
                    newString = finishedItem;
                } else if (firstChar == 'a' || firstChar == 'e' || firstChar == 'i' || firstChar == 'o' || firstChar == 'u') {
                    const cleanItem = item.replace('-', ' ');
                    const finishedItem = `An ${cleanItem}`;
                    newString = finishedItem;
                } else if (firstChar == '(') {
                    return array;
                } else {
                    const cleanItem = item.replace('-', ' ');
                    const finishedItem = `A ${cleanItem}`;
                    newString = finishedItem;
                }
            } else {
                const cleanItem = item.replace('-', ' ');
                newString += ", ";
                newString += cleanItem;
            }
            itemCount++
        });
        return newString;
    } else {
        if (noneValue) {
            return noneValue;
        } else {
            return "";
        }
    }
    function cleanListItem() {
        const splitItem = item.split
        const cleanItem = item.replace('-', ' ');
        const finishedItem = `An ${cleanItem}`;
        newString = finishedItem;
    }
};

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

//For DEV ONLY:
function checkRangeValues() {
    let valueAccountedFor = valueSelf + valueTouch + valueSight + lessThanTwentyFive + twentyFiveToFifty + fiftyToOneHundred + oneHundredToTwoFifty + twoFiftyToFiveHundred + valueOneMile + valueSpecial + valueUnlimited;
    let valueUnaccountedFor = listItemCount - valueAccountedFor;

    console.log(`There are ${valueTouch} attribute values containing "Touch".`);
    console.log(`There are ${valueSelf} attribute values containing "Self".`);
    console.log(`There are ${valueSight} attribute values containing "Sight".`);
    console.log(`There are ${lessThanTwentyFive} attribute values containing "Less than 25 feet".`);
    console.log(`There are ${twentyFiveToFifty} attribute values containing "25 to 50 feet".`);
    console.log(`There are ${fiftyToOneHundred} attribute values containing "50 to 100 feet".`);
    console.log(`There are ${oneHundredToTwoFifty} attribute values containing "100 to 250 feet".`);
    console.log(`There are ${twoFiftyToFiveHundred} attribute values containing "250 - 500 feet".`);
    console.log(`There are ${valueFeet} attribute values containing "Feet".`);
    console.log(`There are ${valueOneMile} attribute values containing "1 mile".`);
    console.log(`There are ${valueSpecial} attribute values containing "Special".`);
    console.log(`There are ${valueUnlimited} attribute values containing "Unlimited".`);

    console.log(`Values accounted for: ${valueAccountedFor}`);
    console.log(`Values NOT accounted for: ${valueUnaccountedFor}`);
    console.log(`Total values: ${listItemCount}`);
}

function checkAoeValues() {
    let aoeValueAccountedFor = aoeCone + aoeCube + aoeCylinder + aoeLine + aoeSphere;
    let aoeValueUnaccountedFor = aoeItemCount - aoeValueAccountedFor;

    console.log(`There are ${aoeCone} attribute values containing "Cone".`);
    console.log(`There are ${aoeCube} attribute values containing "Cube".`);
    console.log(`There are ${aoeCylinder} attribute values containing "Cylinder".`);
    console.log(`There are ${aoeLine} attribute values containing "Line".`);
    console.log(`There are ${aoeSphere} attribute values containing "Sphere".`);

    console.log(`Values accounted for: ${aoeValueAccountedFor}`);
    console.log(`Values NOT accounted for: ${aoeValueUnaccountedFor}`);
    console.log(`Total values: ${aoeItemCount}`);
}

function checkSchools() {
    const allSpellObjects = dataCache.spells;

    for (const spell in allSpellObjects) {
        console.log(dataCache.spells[spell].school);
    }
};

async function loadLCAssets() {
    const asset = './localCache/localCacheAssets.json';
    localCacheAssets['additional-data'] = localCacheAssets['additional-data'] || {}
    localCacheAssets['additional-data']['assets'] =     localCacheAssets['additional-data']['assets'] || {}

    const apiPromise = await fetch(asset);
    assetData = await apiPromise.json();

    localCacheAssets['additional-data']['assets'] = assetData['additional-data'];
}
