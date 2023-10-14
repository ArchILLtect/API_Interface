/* Created on 10/11/23 by ArchILLtect for the Coursera program "Javascript for Beginners Specialization" - Course 2 - "Animation with JavaScript and JQuery" */

const mainElement = document.querySelector('main');

let movieData;

async function getMovies() {
    const moviesPromise = await fetch('https://www.dnd5eapi.co/api/races/');
    const allMovies = await moviesPromise.json();

    setSort(allMovies.movies);
    addCards(allMovies.movies);
    movieData = allMovies;

/*     allMovies.movies.forEach(eachMovie => {
        createCard(eachMovie);
    });
 */
}

getMovies();

function createCard(data) {
    const card = document.createElement('article');

    const movieTitle = document.createElement('h2');
    const movieTitleTxt = document.createTextNode(data.title);
    movieTitle.appendChild(movieTitleTxt);

    const director = document.createElement('p');
    const directorTxt = document.createTextNode(`Director: ${data.mainDirector.name}`);
    director.appendChild(directorTxt);

    //write similar code for year, description and score
    const year = document.createElement('p');
    const yearTxt = document.createTextNode(`Released: ${data.usReleaseDate}`);
    year.appendChild(yearTxt);

    const stardateStart = document.createElement('p');
    const stardateStartTxt = document.createTextNode(`Star Date From: ${data.stardateFrom}`);
    stardateStart.appendChild(stardateStartTxt);

    const stardateEnd = document.createElement('p');
    const stardateEndTxt = document.createTextNode(`Star Date To: ${data.stardateTo}`);
    stardateEnd.appendChild(stardateEndTxt);

    card.appendChild(movieTitle);
    card.appendChild(director);
    // append the year, description and score
    card.appendChild(year);
    card.appendChild(stardateStart);
    card.appendChild(stardateEnd);

    mainElement.appendChild(card);

    document.getElementById('sortorder').removeAttribute('disabled');
}

document.getElementById('sortorder').addEventListener('change', function () {
    mainElement.innerHTML = '';
    setSort(movieData.movies);
    addCards(movieData.movies);
   });

function setSort(array) {
    const sortOrder = document.getElementById('sortorder').value;
    switch (sortOrder) {
        case 'title': array.sort((a, b) => (a.title > b.title) ? 1 : -1); break;
        case 'mainDirector': array.sort((a, b) => (a.mainDirector.name > b.mainDirector.name) ? 1 : -1); break;
        case 'usReleaseDate': array.sort((a, b) => (a.usReleaseDate > b.usReleaseDate) ? 1 : -1); break;
        case 'stardateFrom': array.sort((a, b) => (a.stardateFrom >b.stardateFrom) ? 1 : -1); break;
    }
}

function addCards(array) {
    array.forEach(eachItem => {
        createCard(eachItem);
    });
   }