/* Created on 10/11/23 by ArchILLtect */

const API_MAIN_URL = 'https://www.dnd5eapi.co/api/';
const ALL_IMG = "./images/monsters.json";

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

fetchData(ALL_IMG, 'images');

// Main Functions:
function goHome(page) {
    console.log("At goHome")
    console.log(dataCache)
    imageRandomizer()
    //RAND_IMG = imageRandomizer();
    // Clear previous page
    clearPrevPage();

    // Set page header to HOME
    currentPage = page;
    SetHeader(page);

    /* Use only if I decide to keep the global vars in an object
    globalData.currentPage = 'Homepage';
    SetHeader(globalData.currentPage);
    */

    // Add HOME info to <main>
    const leftHomeArticle = document.createElement('article');
    const homeArticle = document.createElement('article');
    const rightHomeArticle = document.createElement('article');
    const homeImageSlot1 = document.createElement('img');
    //homeImageSlot1.src = RAND_IMG;
    const homeImageSlot2 = document.createElement('img');
    //homeImageSlot2.src = RAND_IMG;
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
    leftHomeArticle.appendChild(homePageTxt);
    leftHomeArticle.appendChild(homeImageSlot1);
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
    //mainElement.appendChild(homePage);
    mainElement.appendChild(leftHomeArticle);
    mainElement.appendChild(homeArticle);
    mainElement.appendChild(rightHomeArticle);
    homeArticle.id = "homeArticle"
};
goHome('homepage');

function SetHeader (title, count) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('currentPageHeader');
    let pageHeaderTxt = '';

    if (title === 'homepage') {
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
    } else {
        pageHeaderTxt = document.createTextNode('ERROR');
    }

    curPageHeader.appendChild(pageHeaderTxt);
    pageHeader.appendChild(curPageHeader);
};

function cacheData(data, itemType) {
    const numberOfItems = Object.keys(data).length;
    //console.log(numberOfItems)

    if (numberOfItems > 1 && itemType) {
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
        if (dataCache[itemType]) {
            //console.log('Data already exists');
            return;
        } else {

        dataCache[itemType] = data;

        console.log(`Caching data: ${itemType} object now has ${numberOfItems} items`);
        return;
        }
    } else {
        throw new Error('ERROR: Data did not cache. Data contains nothing or is corrupted.');
    }
};

async function fetchData(data, itemType) {

    const apiPromise = await fetch(data);
    apiIndex = await apiPromise.json();
    console.log(apiIndex)
    cacheData(apiIndex, itemType);
};

function imageRandomizer() {
    console.log('at RNDMIZER');
    console.log(dataCache);
    const FILE_NAMES = dataCache.images.filenames;
    //console.log(FILE_NAMES);
    const FILE_NUM = FILE_NAMES.length;
    const RAND_NUM = Math.floor(Math. random() * FILE_NUM);
    const RAND_IMG = FILE_NAMES[RAND_NUM];
    console.log(RAND_IMG);
    return RAND_IMG;
};

function clearPrevPage() {
    removeAllChildNodes(homePage);
    removeAllChildNodes(pageHeaderDiv);
    removeAllChildNodes(mainElement);
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};