import { useParams } from "react-router";
import {TMDB_LARGE_IMAGE_SIZE, urlImagePoster, urlMovieById } from "../config/constants"
import { useState } from "react";

function MovieDescriptionPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});

    const getMovieByIdFromApi = async function() {
        const response = await fetch(urlMovieById(movieId));
        const newMovie = await response.json();
        setMovie(newMovie);
    }

    getMovieByIdFromApi();

    const releaseYear = new Date(movie.release_date).getFullYear();

    return ( <div className="movie-description-container">
        <h2>{movie.title + " ("+ releaseYear +")"}</h2>
        <img src={urlImagePoster(TMDB_LARGE_IMAGE_SIZE, movie.poster_path)} />
        <p>{movie.overview}</p>
    </div> );
}

export default MovieDescriptionPage;