import { useParams } from "react-router";
import {TMDB_LARGE_IMAGE_SIZE, urlImagePoster, urlMovieById, urlVideosByMovie, urlVideoByKey } from "../config/constants"
import { useEffect, useState } from "react";

function MovieDescriptionPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    const [videoUrl, setVideoUrl]  = useState(0);

    const getMovieByIdFromApi = async function() {
        const response = await fetch(urlMovieById(movieId));
        const newMovie = await response.json();
        setMovie(newMovie);
    }

    const getMovieTrailerUrl = async function() {
        const response = await fetch(urlVideosByMovie(movieId));
        const newMovie = await response.json();
        const filteredResults = newMovie.results.filter(item => item.site="YouTube" && item.type==="Teaser");
        // maybe should also check Clip of Featurette if no teaser - we'll see later
        if (!filteredResults.length) {
            setVideoUrl("");
        } else {
            setVideoUrl(urlVideoByKey(filteredResults[0].key));
        }
    }

    getMovieByIdFromApi();

    getMovieTrailerUrl(movieId);

    const releaseYear = new Date(movie.release_date).getFullYear();

    return (<div className="movie-description-container">
        <h2>{movie.title + " ("+ releaseYear +")"}</h2>
        <div class="movie-and-video-container">
            <img src={urlImagePoster(TMDB_LARGE_IMAGE_SIZE, movie.poster_path)} />
            {videoUrl === "" ? null :
                <iframe src={videoUrl} width="1000" height="750" title="Teaser Trailer" 
                frameborder="0" allowFullScreen/>
            }
        </div>
        <p>{movie.overview}</p>
    </div> );
}

export default MovieDescriptionPage;