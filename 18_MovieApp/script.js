const API_KEY = "b5c544dcc6b7a3ce75cf12fcb02c4268";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const logo = document.getElementById("logo");

// Get initial movie
getMovie(API_URL);
async function getMovie(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovie(data.results);
}

function showMovie(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    // movieEl.setAttribute('id','div-move')
    movieEl.innerHTML = `      
          <img
            src=${IMG_PATH + poster_path}
            alt="${title}"
          />
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${ getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>overview</h3>
            ${overview}
          </div>`;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

// Search
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovie(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
// logo
logo.addEventListener("click", () => {
    window.location.reload();
});

// when click on Card movie
window.onload = () => {
  const get_movies = document.querySelectorAll(".movie");
  get_movies.forEach((movie) => {
    movie.addEventListener("click", () => {
      console.log("jk");
      const movieName = movie.children[1].children[0].textContent;
      getMoviePage(SEARCH_API + movieName);
    });
  });
};

async function getMoviePage(url) {
    console.log('getMoviePage');
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  console.log(data.results[0]);

  const { title, poster_path, vote_average, overview } = data.results[0];
  console.log(title, poster_path, vote_average, overview);

  main.innerHTML = "";
  const movieEl = document.createElement("div");
  movieEl.classList.add("movieCard");
  // movieEl.setAttribute('id','div-move')
  movieEl.innerHTML = `      
        <img
        src=${IMG_PATH + poster_path}
        alt="${title}"
        />
        <div class="infoCard">
        <h3>${title}</h3>
        <span class="${getClassByRate(
          vote_average
        )}" id="Score">${vote_average}</span>
        <span id="Score">en</span>
        <div class=overviewCard">
            <h3>overview</h3>
            ${overview}
        </div>
        </div>`;

  main.appendChild(movieEl);
}
