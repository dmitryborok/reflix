import { Link } from 'react-router-dom';

function NavBar() {
    return ( <div className="nav-bar">
        <Link to="/"><span className="spaced-word">Home</span></Link>
        <Link to="/catalog"><span className="nav-bar-item">Catalog</span></Link>
        <div className="top-right logo">REFLIX</div>
    </div> );
}

export default NavBar;