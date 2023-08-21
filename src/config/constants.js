export const TMDB_API_KEY="be817261b46c66fc3bf88946296e5380";
export const TMDB_API_ACCESS_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTgxNzI2MWI0NmM2NmZjM2JmODg5NDYyOTZlNTM4MCIsInN1YiI6IjY0ZGNkYjZlMDAxYmJkMDQxOTJkNzU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8sbAiAdX_ny0slXkywUnBm9ZuLTTKLQm-OeLJFTnN28";
const TMDB_IMAGE_PATH_PREFIX = "https://image.tmdb.org/t/p/w";
export const TMDB_LARGE_IMAGE_SIZE = 500;
export const TMDB_SMALL_IMAGE_SIZE = 300;

export const urlSearch=function(query) {
    return `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${TMDB_API_KEY}`
}

export const urlPopular=function() {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
}

export const urlMovieById=function(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
}

export const urlImagePoster=function(size, poster_path) {
    return TMDB_IMAGE_PATH_PREFIX + size + poster_path;
}

export const urlVideosByMovie=function(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;
}

export const urlVideoByKey=function(key) {
    return `https://www.youtube.com/embed/${key}`;
}

export const usersData = [
    {name: "Mona", budget: 10, color: "blue", rentedMovies: []},
    {name: "Jasmine", budget: 20, color: "red", rentedMovies: []},
    {name: "Aura", budget: 30, color: "green", rentedMovies: []},
    {name: "Tina", budget: 40, color: "yellow", rentedMovies: []}
]