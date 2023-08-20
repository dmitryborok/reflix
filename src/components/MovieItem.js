import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import {TMDB_SMALL_IMAGE_SIZE, urlImagePoster} from "../config/constants"
import {USDollarFormat} from "../services/services";




function MovieItem({user, movie, isRented, rentMovie}) {
    const rentDisabled = function() {
        return !isRented && (user.budget < movie.rentPrice);
    }

    return (<>
            <div className="movie-container">
                <Link to={"/movies/" + movie.id}>
                    <img src={urlImagePoster(TMDB_SMALL_IMAGE_SIZE, movie.poster_path)}/>
                </Link>
                <div className="plus-minus-icon">
                    {user ? 
                    <FontAwesomeIcon size="2xl" inverse 
                        icon={isRented ? faCircleMinus : faCirclePlus}
                        onClick={() => rentMovie(movie)}
                        className={rentDisabled() ? "fa-disabled" : "fa-enabled"} />
                    : null}
                </div>
                <div>Rent price: {USDollarFormat.format(movie.rentPrice)}</div>
            </div>
    </>  );
}

export default MovieItem;