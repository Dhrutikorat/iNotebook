import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">test</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeclassname="active" to="/about">About</NavLink>
                        </li> */}
                    </ul>
                    <form className="d-flex justify-content-end">
                        <Link to="/login" type="button" className="btn-gradient-danger mx-2">Log in</Link>
                        <Link to="/signup" type="button" className="btn-gradient-primary">Sign up</Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}
