import { Link, NavLink } from 'react-router-dom'
import './Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link className="navbar-brand" to="/">
                MusicPy
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink to="/search"
                        className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                    >
                        Search song
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}