/* Created on 10/11/23 by ArchILLtect for the Coursera program "Javascript for Beginners Specialization" - Course 2 - "Animation with JavaScript and JQuery" */

const pageHeaderDiv = document.getElementById('currentPageHeader');
const mainElement = document.querySelector('main');
const homePage = document.createElement('h3');

//let currentPage = '';
let dataType = '';
let raceData = '';
let classData = '';

let globalData = {
    currentPage: '',
    dataType: '',
    raceData: '',
    classData: ''
}

function goHome() {
    // Clear previous page
    clearPrevPage();

    // Set page header to HOME
    currentPage = 'Homepage';
    globalData.currentPage = 'Homepage';
    SetHeader(globalData.currentPage);

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
    globalData.currentPage = 'races';
    
    if (verifyLoadNeed(raceData) == false) {

        console.log('Load NOT needed!');

        addCards(raceData);

    } else {
        console.log('LOAD NEEDED! LOAD NEEDED!');
        const raceIndexPromise = await fetch('https://www.dnd5eapi.co/api/races');
        raceIndex = await raceIndexPromise.json();

        // Set data to variable to prevent loading from API on next run:
        raceData = raceIndex.results;

        addCards(raceData);
    }
};

async function getClasses() {

    currentPage = 'classes';
    globalData.currentPage = 'classes';
    
    if (verifyLoadNeed(classData) == false) {

        console.log('Load NOT needed!');

        addCards(classData);

    } else {
        console.log('LOAD NEEDED! LOAD NEEDED!');
        const classIndexPromise = await fetch('https://www.dnd5eapi.co/api/classes');
        classIndex = await classIndexPromise.json();

        // Set data to variable to prevent loading from API on next run:
        classData = classIndex.results;

        addCards(classData);
    }
};

function addCards(data) {

    // Clear previous page and set new one:
    clearPrevPage();
    SetHeader(globalData.currentPage);

    // Add cards to the page:
    data.forEach(eachItem => {
    createCard(eachItem);
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

    cardImg.src = `./images/${globalData.currentPage}/${data.index}.jpg`;
}

function SetHeader (title) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('currentPageHeader');
    const pageHeaderTxt = document.createTextNode(title.toUpperCase());

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

// Use reremoveAllChildNodes() function to clear the page.
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
