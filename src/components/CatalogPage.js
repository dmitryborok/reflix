import MovieList from "./MovieList";

function CatalogPage({user, movies, rentMovie}) {
    if (user) {
        return (<>
        {user.rentedMovies.length === 0 ? 
            null : 
            <MovieList user={user} movies={user.rentedMovies} showRented={true} rentMovie={rentMovie}/>}
        <MovieList user={user} movies={movies} showRented={false} rentMovie={rentMovie}/>
        </>  );
    } else {
        return (<>
            <MovieList user={user} movies={movies} showRented={false} rentMovie={rentMovie}/>
        </>  );
    }
}

export default CatalogPage;