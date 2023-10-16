/* Created on 10/11/23 by ArchILLtect */

const pageHeaderDiv = document.getElementById('currentPageHeader');
const mainElement = document.querySelector('main');
const homePage = document.createElement('h3');

let currentPage = '';
let raceData = '';

function goHome() {
    // Clear previous page
    clearPrevPage();

    // Set page header to HOME
    currentPage = 'Home';
    SetHeader(currentPage);

    // Add HOME info to <main>
    const homePageTxt = document.createTextNode('Welcome to homepage');
    homePage.appendChild(homePageTxt);
    mainElement.appendChild(homePage);
}

goHome()

async function getRaces() {

 /*    let raceIndex = ""

    if (verifyLoadNeed(raceData) == true) {
        console.log('true');
    } else {
        console.log('false');
        const raceIndexPromise = await fetch('https://www.dnd5eapi.co/api/races');
        raceIndex = await raceIndexPromise.json();
        raceData = raceIndex.results;
    }
 */
    const raceIndexPromise = await fetch('https://www.dnd5eapi.co/api/races');
    raceIndex = await raceIndexPromise.json();
    raceData = raceIndex.results;

    // Set data to variable to prevent loading from API on next run:
    currentPage = 'Races';

    // Clear previous page and set new one:
    clearPrevPage();
    SetHeader(currentPage);

    // Add cards
    addCards(raceIndex.results);




/*     raceIndex.results.forEach(eachRace => {
    createCard(eachRace);
    }); */
}


function createCard(data) {
    // Clear previous page


    const card = document.createElement('article');

    const raceName = document.createElement('h3');
    const raceNameTxt = document.createTextNode(data.name);
    raceName.appendChild(raceNameTxt);

    const racePic = document.createElement('img');
    racePic.id = data.index

    const buttonContainer = document.createElement('div');
    const selectButton = document.createElement('button');
    const selectButtonTxt = document.createTextNode("Click for more info");
    selectButton.appendChild(selectButtonTxt);

    card.appendChild(raceName);
    card.appendChild(racePic);
    card.appendChild(buttonContainer);   
    buttonContainer.appendChild(selectButton);
    mainElement.appendChild(card);

    const raceImg = document.querySelector(`#${data.index}`)

    raceImg.src = `./images/races/${data.index}.jpg`;
/*     const racePicIndex = data.index.toString()
    const racePicSrc = `./images/races/${racePicIndex}`
 */
}

function SetHeader (title) {
    const curPageHeader = document.createElement('h2');
    const pageHeader = document.getElementById('currentPageHeader');
    const pageHeaderTxt = document.createTextNode(title);

    curPageHeader.appendChild(pageHeaderTxt);
    pageHeader.appendChild(curPageHeader);
}


homeNav = document.getElementById('#home');
characterNav = document.getElementById('#character');
monsterNav = document.getElementById('#moster');
itemNav = document.getElementById('#item');
miscNav = document.getElementById('#misc');

allNav = document.querySelectorAll('nav ul li a');

// console.log(allNav);


function setNavListen() {
    allNav.forEach( eachItem => {
        eachItem.addEventListener('click', function(){
            if (eachItem.id == 'Races') {
                getRaces();
            } else {
                goHome();
            }
        })
        console.log(eachItem.id);
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

function addCards(array) {
    array.forEach(eachItem => {
    createCard(eachItem);
    });
}
