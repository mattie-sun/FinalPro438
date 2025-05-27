import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 location-sticky" aria-label="nav bar">
            <Link className="navbar-brand" to="/">Rate My Course</Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Schools">Something</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

