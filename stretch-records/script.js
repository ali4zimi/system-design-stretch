'use strict';

// The roster, exactly where the JavaScript course's finale left it: an array
// of artist objects at the top of the file, and one repeatable rule that
// renders it. In this course the data moves out of this file, step by step.

const msg_elm = document.querySelector('.status');

async function loadArtists() {
  msg_elm.textContent = 'Loading artists...';
  try {
    const response = await fetch('artists.json');
    const data = await response.json();
    for (const [index, artist] of data.entries()) {
      try {
        checkArtistData(artist);
      } catch (error) {
        throw new Error(
          `Stretch Records artist page, validating roster record ` +
          `${index + 1} of artists.json: ${error.message}`,
          { cause: error }
        );
      }
    }
    renderCards(data);
    msg_elm.textContent = '';
  } catch (error) {
    msg_elm.textContent = `Error loading artists: ${error.message}`;
  }
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
  const name = nameInput.value;
  if (name) {
    const genre = genreInput.value || 'Unsigned';
    renderCards([{ name: name, genre: genre, total: '0:00' }]);
    nameInput.value = '';
    genreInput.value = '';
  }
});

// Kick off the load. Called from the bottom so everything it reaches
// (the error class, checkArtistData, renderCards, cardArea, roster) is
// already defined.
loadArtists();
