import { Link, NavLink } from 'react-router-dom'
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand mr-5" to="/">
                    MusicPy
                </Link>

                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink to="/search"
                            className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                        >
                            Search
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}