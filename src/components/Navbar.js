import React from 'react'
import { Link, NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">test</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeclassname="active" to="/about">About</NavLink>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button type="button" className="btn-gradient-danger mx-1">Log in</button>
                            <button type="button" className="btn-gradient-primary">Sign up</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
