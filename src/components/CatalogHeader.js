import { useEffect, useState } from "react";
import {urlPopular, urlSearch} from "../config/constants"
import CatalogPage from "./CatalogPage";
import Budget from "./Budget";


function CatalogHeader({user, rentMovie}) {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([]);

    const updateQuery = function(event) {
        setQuery(event.target.value);
    }

    const clearSearch = function() {
        setQuery("");
    }

    const getMoviesFromApiData = function(apiData) {
        const newMovies = [...apiData.results];
        newMovies.forEach(movie => movie.rentPrice = 6); // fixed price so far 
        setMovies(newMovies);
    }

    useEffect(() => {
        const getData = async function() {
            let response;
            let data={};
            if (query.trim() === "") {
                response = await fetch(urlPopular());
                data = await response.json();
            } else {
                response = await fetch(urlSearch(query));
                data = await response.json();
            }
            getMoviesFromApiData(data);
        } 

        getData();

    }, [query])    

    return (<div>
        <span className="spaced-word">Search: </span><input type="text" className="text-input" value={query} onChange={updateQuery}></input>
        <button className="clear-search-btn" onClick={clearSearch}>X</button>
        {user ? <Budget user={user} /> : null}
        <CatalogPage user={user} movies={movies} rentMovie={rentMovie} />
    </div>  );
}

export default CatalogHeader;