// Go to Developer tools => Application => Local Storage
// Data Stored in Local Storage: favouriteMovies, results, theme;
// favouriteMovies contains all movies that user has liked;
// results contains movies that user recently has searched for;
// theme contains the current theme;


let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
const defaultTheme = "dark";

// Function to fetch movie data from Omdb API
async function fetchMovieData(query) {
    let response = []
    try {
        response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=39dc70e`);
    } catch {
        console.log("Error");
    }

    let data = await response.json();
    data = data.Search;
    data.forEach(movie => { movie.active = false; });
    return data
}

window.onload = () => {
    var parsedMovies = JSON.parse(localStorage.getItem('results')) || [];
    var theme = localStorage.getItem('theme') || defaultTheme;
    if (theme === 'dark') {
        document.body.setAttribute('data-bs-theme', 'dark');
        document.getElementById('darkModeSwitch').checked = true;
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.body.setAttribute('data-bs-theme', 'light');
        document.getElementById('darkModeSwitch').checked = false;
        localStorage.setItem('theme', 'light');
    }
    if (parsedMovies.length > 0) {
        displaySearchResults(parsedMovies);
    }
}

// Function to display search results
function displaySearchResults(movieData) {
    let listMovies = document.getElementById("listMovies");

    listMovies.innerHTML = "";
    movieData.forEach(data => {
        if (data.Poster === "N/A") {
            data.Poster = "./img/placeholder.png";
        }
        const movie = document.createElement("div");
        movie.classList.add("col-xs-6", "col-sm-4", "col-md-3", "col-lg-2");
        movie.innerHTML = `
    <div class="card" id=${data.imdbID} >
        <img src=${data.Poster}  class="card-img-top" alt="Movie 1" onerror="handleImageError(this)" >
        <div class="card-img-overlay on">
            <h6 class="card-title movie-name">${data.Title}</h6>
        </div>
        <button id="favorite" class="favorite-icon btn btn-link p-0"><i class="far fa-heart m-0"></i></button>
        <h6 class="card-text movie-year">${data.Year}</h6>
    </div>`
        listMovies.appendChild(movie);
        document.querySelector(`#${data.imdbID}`).addEventListener("click", () => {
            window.location.href = `movie.html?id=${data.imdbID}`;

            localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
        });


        if (data.active === true) {

            document.querySelector(`#${data.imdbID} i`).classList.remove('far');
            document.querySelector(`#${data.imdbID} i`).classList.add('fas');
        }

        document.querySelector(`#${data.imdbID} button`).addEventListener("click", (event) => {
            event.stopPropagation();

            event.target.classList.toggle("active");
            if (event.target.classList.contains('active')) {
                event.target.classList.remove('far');
                event.target.classList.add('fas');
                data.active = true;
                var temp = false;
                for (let movie of favouriteMovies) {
                    if (movie.imdbID === data.imdbID) {
                        temp = true;
                    }
                }
                if (!temp) {
                    favouriteMovies.push(data);
                }
                // let prev = [...favouriteMovies];
                // favouriteMovies = movieData.filter(movie => movie.active === true);
                // favouriteMovies = [...prev,...favouriteMovies];
            }
            else {
                event.target.classList.remove('fas');
                event.target.classList.add('far');
                data.active = false;
            }

            localStorage.setItem('results', JSON.stringify(movieData));
            movieData.forEach(movie => {
                favouriteMovies.forEach(favMovie => {
                    if (movie.imdbID === favMovie.imdbID) {
                        favMovie.active = movie.active;
                    }
                })
            });
            localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
        });
    })
}

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", async (event) => {
    handleSearchResults(event);
});

document.getElementById("searchInput").addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});


async function handleSearchResults(event) {
    const query = event.target.value;
    if (query.length >= 3) {
        let results = [];
        try {
            results = await fetchMovieData(query);
        }
        catch {
            console.log("Error");
        }
        results.forEach(movie => {
            favouriteMovies.forEach(favMovie => {
                if (movie.imdbID === favMovie.imdbID) {
                    movie.active = true;
                }
            })
        });
        displaySearchResults(results);
        let temp = JSON.parse(localStorage.getItem("favouriteMovies")) || [];

        favouriteMovies = [...favouriteMovies, temp];
        favouriteMovies = favouriteMovies.filter(movie => movie.active === true);
        localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
        localStorage.setItem('results', JSON.stringify(results));
    }
}

document.getElementById("searchButton").addEventListener("click", () => {
    var storedMovies = localStorage.getItem('results');
    var parsedMovies = JSON.parse(storedMovies);
    displaySearchResults(parsedMovies);
});



//Favourite button

document.getElementById("favouriteButton").addEventListener("click", () => {
    let temp = JSON.parse(localStorage.getItem("results")) || []
    favouriteMovies = [...favouriteMovies, temp];
    favouriteMovies = favouriteMovies.filter(movie => movie.active === true);
    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
    displayFavResults(favouriteMovies);
    // window.location.href = "favourites.html";
});
function displayFavResults(movieData) {
    let listMovies = document.getElementById("listMovies");

    listMovies.innerHTML = "";
    movieData.forEach(data => {
        if (data.Poster === "N/A") {
            data.Poster = "./img/placeholder.png";
        }
        const movie = document.createElement("div");
        movie.classList.add("col-xs-6", "col-sm-4", "col-md-3", "col-lg-2");
        movie.innerHTML = `
    <div class="card" id=${data.imdbID} >
        <img src=${data.Poster}  class="card-img-top" alt="Movie 1" >
        <div class="card-img-overlay on">
            <h6 class="card-title movie-name">${data.Title}</h6>
        </div>
        <button id="favorite" class="favorite-icon btn btn-link p-0"><i class="far fa-heart m-0"></i></button>
        <h5 class="card-text movie-year">${data.Year}</h5>
    </div>`
        listMovies.appendChild(movie);
        document.querySelector(`#${data.imdbID}`).addEventListener("click", () => {
            window.location.href = `movie.html?id=${data.imdbID}`;

            localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
        });
        if (data.active === true) {
            document.querySelector(`#${data.imdbID} i`).classList.remove('far');
            document.querySelector(`#${data.imdbID} i`).classList.add('fas');
        }
        document.querySelector(`#${data.imdbID} button`).addEventListener("click", (event) => {
            handleFavouriteMovie(event, data);
        });
    })
}

function handleFavouriteMovie(event, data) {
    event.stopPropagation();
    data.active = false;
    favouriteMovies = favouriteMovies.filter(movie => movie.active === true);
    let updatedData = JSON.parse(localStorage.getItem("results")) || [];
    updatedData.filter(movie => {
        if (movie.imdbID === data.imdbID) {
            movie.active = false;
        }
    })
    localStorage.setItem('results', JSON.stringify(updatedData));
    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
    displayFavResults(favouriteMovies);
}

document.getElementById("clearButton").addEventListener("click", clearData);
function clearData() {
    localStorage.setItem('favouriteMovies', JSON.stringify([]));
    localStorage.setItem('results', JSON.stringify([]));
    window.location.href = "index.html";
    document.getElementById("searchInput").value = "";
    favouriteMovies = [];
    displaySearchResults([]);
    displayFavResults([]);
}