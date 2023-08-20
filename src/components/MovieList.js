import MovieItem from "./MovieItem";

function MovieList({user, movies, showRented, rentMovie}) {
    const shouldDisplayMovie = function(movie) {
        if (!user) return true; // no need for the function if no user is selected

        // in the main section, should not show movies that are already in the Rented section
        return (showRented || !user.rentedMovies.some(m => m.id === movie.id))
    }

    return (<> 
        <hr style={{"z-index": "-2"}}/>
        <div className="movie-list-container-header spaced-word">{showRented ? "Rented movies" : "Popular movies"}</div>
        <div className="movie-list-container">
            {movies.map((movie, index) => 
                            shouldDisplayMovie(movie) ?
                            <MovieItem user={user} movie={movie} isRented={showRented} rentMovie={rentMovie} key={index}/> :
                            null )}
        </div>
    </> );
}

export default MovieList;