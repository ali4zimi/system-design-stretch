'use strict';

// The roster, exactly where the JavaScript course's finale left it: an array
// of artist objects at the top of the file, and one repeatable rule that
// renders it. In this course the data moves out of this file, step by step.

const msg_elm = document.querySelector('.status');

// Fetches and validates the roster. It does not touch the page: rendering
// waits until the label request has come back too.
async function loadArtists() {
  const response = await fetch('http://localhost:3000/artists');
  if (!response.ok) {
    throw new Error(`Artists request failed with status ${response.status}`);
  }
  const data = await response.json();
  for (const [index, artist] of data.entries()) {
    try {
      checkArtistData(artist);
    } catch (error) {
      throw new Error(
        `Stretch Records artist page, validating roster record ` +
        `${index + 1} of artists: ${error.message}`,
        { cause: error }
      );
    }
  }
  return data;
}

class MissingArtistDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingArtistDataError';
  }
}

function checkArtistData(artist) {
  if (!artist.name) {
    throw new MissingArtistDataError('Artist is missing a name');
  }
}

// The label's own details, from a second server. Same rule: fetch, check,
// return. Nothing is rendered here either.
async function loadLabel() {
  const response = await fetch('http://localhost:3001/label');
  if (!response.ok) {
    throw new Error(`Label request failed with status ${response.status}`);
  }
  return response.json();
}

const cardArea = document.querySelector('.cards');

// Every artist currently on the page, whatever the data's source. renderCards
// maintains this list, so the shuffle button and the form keep working no
// matter where the artists came from.
const roster = [];

// One card from one artist: the shared builder, used by the first render
// and by the form below.
function buildCard(artist) {
  const card = document.createElement('article');
  if (artist.photo) {
    const photo = document.createElement('img');
    photo.src = artist.photo;
    photo.alt = `${artist.name}, artist photo`;
    card.append(photo);
  }
  const title = document.createElement('h3');
  title.textContent = artist.name;
  const line = document.createElement('p');
  line.textContent = `${artist.genre}, ${artist.total} of music`;
  card.append(title, line);
  return card;
}

function renderCards(list) {
  for (const artist of list) {
    roster.push(artist);
    cardArea.append(buildCard(artist));
  }
}

// renderCards(artists);

// Shuffle: pick a random artist and feature them.
const shuffleButton = document.querySelector('.shuffle');

shuffleButton.addEventListener('click', () => {
  if (roster.length === 0) return;
  const pick = roster[Math.floor(Math.random() * roster.length)];
  document.querySelector('.featured').textContent =
    `Featured today: ${pick.name}`;
});

// The suggestion form: an empty submission does nothing, because an empty
// string is falsy.
const form = document.querySelector('.signup');
const nameInput = document.querySelector('#artist-name');
const genreInput = document.querySelector('#artist-genre');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newArtist = { name: nameInput.value, genre: genreInput.value };

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(newArtist),
  };
  
  // ensure response status 201
  const response = fetch('http://localhost:3000/artists', options)
  
  console.log(response.status);

});

function renderLabel(label) {
  console.log(`Stretch Records label: ${label.name}, ${label.city}`);
}


msg_elm.textContent = 'Loading artists...';

Promise.all([loadArtists(), loadLabel()])
  .then(([artists, label]) => {
    renderCards(artists);
    renderLabel(label);
    msg_elm.textContent = '';
  })
  .catch((error) => {
    msg_elm.textContent = `Error loading the page: ${error.message}`;
  });
