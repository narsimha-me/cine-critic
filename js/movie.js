// Function to fetch movie details from Omdb API by ID
async function fetchMovieDetails(id) {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=39dc70e`);
    const data = await response.json();
    return data;
}

// Function to display movie details
function displayMovieDetails(movieDetails) {
    const movieDetailsContainer = document.getElementById("movieDetails");
    if (movieDetails.Poster === "N/A") {
        movieDetails.Poster = "./img/placeholder.png";
    }
    movieDetailsContainer.innerHTML = `
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center"">
        <div class="col-md-4 col-xs-6  col-md-3">
        <img src=${movieDetails.Poster}
            class="img-fluid rounded" alt="Movie Poster">
        </div>
        <div class="col-md-8 col-xs-6 col-md-3">
        <h2 class="mb-4">${movieDetails.Title} (${movieDetails.Year})</h2>
        <ul class="list-group mb-4">
        <ul class="list-group mb-4">
                        <li class="list-group-item"><strong>Rated:</strong> ${movieDetails.Rated}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movieDetails.Released} </li>
                        <li class="list-group-item"><strong>Runtime:</strong> ${movieDetails.Runtime}</li>
                        <li class="list-group-item"><strong>Genre:</strong> ${movieDetails.Genre}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movieDetails.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movieDetails.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movieDetails.Actors}</li>
                    </ul>
                    <p class="mb-4"><strong>Plot:</strong> ${movieDetails.Plot}</p>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Language:</strong> ${movieDetails.Language}</p>
                        <p><strong>Country:</strong> ${movieDetails.Country}</p>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-2"><strong>IMDb Rating:</strong> ${movieDetails.imdbRating}</p>
                        <div class="progress mb-4">
                            <div class="progress-bar" style="width: ${movieDetails.imdbRating * 10}%;"> ${movieDetails.imdbRating}/10</div>
                        </div>
                        <p><strong>IMDb Votes:</strong> ${movieDetails.imdbVotes}</p>
                    </div>
                </div>
            </div>
</div>
        </div>
        
      `;
}

// Get movie ID from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Fetch and display movie details
window.onload = async () => {
    var theme = localStorage.getItem('theme') || 'light';
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
    const movie = await fetchMovieDetails(movieId);
    displayMovieDetails(movie);
};

function goBack() {
    window.history.back();

}
