const API_KEY = "b5c544dcc6b7a3ce75cf12fcb02c4268";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

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
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>overview</h3>
            ${overview}
          </div>`;

    movieEl.onclick = showSingalMovie(movieEl);

    main.appendChild(movieEl);
  });

  //   movies.forEach((movie) => {
  //     console.log(movie);
  //     main.innerHTML += `
  //         <div class="movie">
  //           <img
  //             src=${IMG_PATH + movie.backdrop_path}
  //             alt=""
  //           />
  //           <div class="movie-info">
  //             <h3>${movie.original_title}</h3>
  //             <span class="green">${movie.vote_average}</span>
  //           </div>
  //           <div class="overview">
  //             <h3>overview</h3>
  //             ${movie.overview}
  //           </div>
  //         </div>`;
  //   });
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

function showSingalMovie(movieEl) {
  movieEl.style.display = "show";
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
