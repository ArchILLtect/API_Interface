/* Created on 10/11/23 by ArchILLtect for the Coursera program "Javascript for Beginners Specialization" - Course 2 - "Animation with JavaScript and JQuery" */

const mainElement = document.querySelector('main');

async function getRaces() {
 const raceIndexPromise = await fetch('https://www.dnd5eapi.co/api/races');
 const raceIndex = await raceIndexPromise.json();

 raceIndex.results.forEach(eachRace => {
    createCard(eachRace);
    });
}
getRaces();

function createCard(data) {
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