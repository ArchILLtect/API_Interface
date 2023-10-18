/* Created on 10/11/23 by ArchILLtect */

const pageHeaderDiv = document.getElementById('currentPageHeader');
const mainElement = document.querySelector('main');
const homePage = document.createElement('h3');

let currentPage = '';
let dataType = '';
let raceData = '';
let classData = '';
let spellData = '';

let raceCount = '';
let classCount = '';
let spellCount = '';

/*
let globalData = {
    currentPage: '',
    dataType: '',
    raceData: '',
    classData: ''
}
*/

function goHome() {
    // Clear previous page
    clearPrevPage();

    // Set page header to HOME
    currentPage = 'Homepage';
    SetHeader(currentPage);

    /* Use only if I decide to keep the global vars in an object
    globalData.currentPage = 'Homepage';
    SetHeader(globalData.currentPage);
    */

    // Add HOME info to <main>
    const homeArticle1 = document.createElement('article');
    const homePageTxt = document.createTextNode('Welcome to the homepage');
    const article1Txt1 = document.createTextNode('This page is under heavy construction! Please forgive the chaos!');
    const article1Txt2 = document.createTextNode('This site is dedicated to bringing the data from the D&D 5e API to life! Please check in regurlarly for new updates. THX!!');
    homePage.appendChild(homePageTxt);
    homeArticle1.appendChild(article1Txt1);
    homeArticle1.appendChild(article1Txt2);
    mainElement.appendChild(homePage);
    mainElement.appendChild(homeArticle1);
}

goHome();

async function getRaces() {

    currentPage = 'races';
    // globalData.currentPage = 'races';
    
    if (verifyLoadNeed(raceData) == false) {

        console.log('Races: Load NOT needed!');

        addCards(raceData);

    } else {
        console.log('Races: LOAD NEEDED! LOAD NEEDED!');
        const raceIndexPromise = await fetch('https://www.dnd5eapi.co/api/races');
        raceIndex = await raceIndexPromise.json();

        // Set data to variable to prevent loading from API on next run:
        raceData = raceIndex.results;
        raceCount = raceIndex.count;

        addCards(raceData);
    }
};

async function getClasses() {

    currentPage = 'classes';
    //globalData.currentPage = 'classes';
    
    if (verifyLoadNeed(classData) == false) {

        console.log('Classes: Load NOT needed!');

        addCards(classData);

    } else {
        console.log('Classes: LOAD NEEDED! LOAD NEEDED!');
        const classIndexPromise = await fetch('https://www.dnd5eapi.co/api/classes');
        classIndex = await classIndexPromise.json();

        // Set data to variable to prevent loading from API on next run:
        classData = classIndex.results;
        classCount = classIndex.count;

        addCards(classData);
    }
};

async function getSpells() {

    currentPage = 'spells';
    //globalData.currentPage = 'spells';
    
    if (verifyLoadNeed(spellData) == false) {

        console.log('Spells: Load NOT needed!');

        addList(spellData);

    } else {
        console.log('Spells: LOAD NEEDED! LOAD NEEDED!');
        const spellIndexPromise = await fetch('https://www.dnd5eapi.co/api/spells');
        spellIndex = await spellIndexPromise.json();

        // Set data to variable to prevent loading from API on next run:
        spellData = spellIndex.results;
        spellCount = spellIndex.count;

        addList(spellData);
    }
};
/*
async function getMonsters() {

    currentPage = 'spells';
    //globalData.currentPage = 'spells';
    
    if (verifyLoadNeed(spellData) == false) {

        console.log('Spells: Load NOT needed!');

        addList(spellData);

    } else {
        console.log('Spells: LOAD NEEDED! LOAD NEEDED!');
        const spellIndexPromise = await fetch('https://www.dnd5eapi.co/api/spells');
        spellIndex = await spellIndexPromise.json();

        // Set data to variable to prevent loading from API on next run:
        spellData = spellIndex.results;
        spellCount = spellIndex.count;

        addList(spellData);
    }
};
*/
function addCards(data) {

    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage);
    //SetHeader(globalData.currentPage);

    // Add cards to the page:
    data.forEach(eachItem => {
    createCard(eachItem);
    });
};

function addList(data) {

    // Clear previous page and set new title:
    clearPrevPage();
    SetHeader(currentPage);
    //SetHeader(globalData.currentPage);

    // Add list to the page:
    data.forEach(eachItem => {
    createList(eachItem);
    });
};

function createCard(data) {
    const card = document.createElement('article');

    const cardName = document.createElement('h3');
    const cardNameTxt = document.createTextNode(data.name);
    cardName.appendChild(cardNameTxt);

    const cardPic = document.createElement('img');
    cardPic.id = data.index

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
}

function createList(data) {
    const listItem = document.createElement('article');

    const listItemName = document.createElement('h3');
    const listItemTxt = document.createTextNode(data.name);
    listItemName.appendChild(listItemTxt);

    // const listItemPic = document.createElement('img');
    // listItemPic.id = data.results.index

    const buttonContainer = document.createElement('div');
    const selectButton = document.createElement('button');
    const selectButtonTxt = document.createTextNode("Click for more info");
    selectButton.appendChild(selectButtonTxt);

    listItem.appendChild(listItemName);
    // card.appendChild(cardPic);
    listItem.appendChild(buttonContainer);   
    buttonContainer.appendChild(selectButton);
    mainElement.appendChild(listItem);

    // const cardImg = document.querySelector(`#${data.index}`)

    // cardImg.src = `./images/${globalData.currentPage}/${data.index}.jpg`;
}

function SetHeader (title) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('currentPageHeader');
    let pageHeaderTxt = '';

    if (title == 'Homepage') {
        pageHeaderTxt = document.createTextNode(title.toUpperCase());
    } else if (title == 'races') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${raceCount})`);
    } else if (title == 'classes') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${classCount})`);
    } else if (title == 'spells') {
        pageHeaderTxt = document.createTextNode(`${title.toUpperCase()} (${spellCount})`);
    } else {
        pageHeaderTxt = document.createTextNode('ERROR');
    }

    curPageHeader.appendChild(pageHeaderTxt);
    pageHeader.appendChild(curPageHeader);
}


homeNav = document.getElementById('#home');
characterNav = document.getElementById('#character');
monsterNav = document.getElementById('#moster');
itemNav = document.getElementById('#item');
miscNav = document.getElementById('#misc');

allNav = document.querySelectorAll('nav ul li a');

function setNavListen() {
    allNav.forEach( eachItem => {
        eachItem.addEventListener('click', function(e){
            e.preventDefault();
            if (eachItem.id == 'races') {
                getRaces();
            } else if (eachItem.id == 'classes') {
                getClasses();
            } else if (eachItem.id == 'spells') {
                getSpells();
            } else {
                goHome();
            }
        });
    });
}
setNavListen();

/*//////////////////////////
// Helper Functions:      //
//////////////////////////*/

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Use removeAllChildNodes() function to clear the page.
function clearPrevPage() {
    removeAllChildNodes(homePage);
    removeAllChildNodes(pageHeaderDiv);
    removeAllChildNodes(mainElement);
}

function verifyLoadNeed(asset) {
    if (asset !== "") {
        return false;
    } else {
        return true;
    }
}
