import {USDollarFormat} from "../services/services";
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

function Budget({user}) {
    return ( <div className="top-right">
                {user.name + "'s budget: " + USDollarFormat.format(user.budget)}
                <Link to="/addmoney">
                    <FontAwesomeIcon inverse icon={faCoins} />
                </Link>
            </div> );
}

export default Budget;