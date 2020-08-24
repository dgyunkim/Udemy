const form = document.querySelector("#form");
const searchInput = document.querySelector("#search");
const resultDiv = document.querySelector("#result");
const moreDiv = document.querySelector("#more");

const apiURL = "https://api.lyrics.ovh";

async function getMoreSongs(url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();
  showData(data);
}

function showData(data) {
  resultDiv.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Get Lyrics</button>
      </li>`
        )
        .join("")}
    </ul>
  `;
  if (data.prev || data.next) {
    moreDiv.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    moreDiv.innerHTML = "";
  }
}

async function searchSongs(value) {
  const response = await fetch(`${apiURL}/suggest/${value}`);
  const data = await response.json();
  showData(data);
}

async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br/>");
  resultDiv.innerHTML = `
    <h2>
      <strong>${artist}</strong> - ${songTitle}
    </h2>
    <span>${lyrics}</span>
  `;
  moreDiv.innerHTML = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchValue = searchInput.value.trim();
  if (!searchValue) {
    alert("Please type artist or song name");
  } else {
    searchSongs(searchValue);
  }
});

resultDiv.addEventListener("click", (event) => {
  const element = event.target;
  if (element.tagName === "BUTTON") {
    const artist = element.getAttribute("data-artist");
    const songTitle = element.getAttribute("data-song-title");
    getLyrics(artist, songTitle);
  }
});
