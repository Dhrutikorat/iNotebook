import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';

export default function Navbar(props) {

    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleAddClick = () => {
        setShow(true);
    }

    const handleClick = (dataValue, color) => {
        localStorage.setItem('dataValue', dataValue);
        localStorage.setItem('noteColor', color);
        setShow(false)
        navigate('/addNote');
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
                    <div className="container">
                        <Link className="navbar-brand" style={{ fontFamily: 'Marck Script, cursive', fontSize: '2.25rem' }} to="/">iNotebook</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <Search/>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Notes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/test">Sample notes</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto align-items-center">
                                <li className="nav-item pe-1">
                                </li>
                                {window.location.pathname !== '/addNote' && <li className="nav-item">
                                    <i className="fa fa-plus-circle fa-beat pe-1 fa-lg py-2" style={{'--fa-animation-duration': '1s'}} onClick={handleAddClick}></i> Note
                                </li>}
                                {show === true && <div className="d-flex" style={{ marginLeft: '10px' }}>
                                    {Object.keys(props.colorNames).map(key => {
                                        return (
                                            <div
                                                style={{
                                                    height: '25px',
                                                    width: '25px',
                                                    cursor: 'pointer',
                                                    backgroundColor: props.colorNames[key],
                                                    border: '2px solid white',
                                                    borderRadius: '50%',
                                                    marginRight: "5px"
                                                }} onClick={() => handleClick(key, props.colorNames[key])} key={key}>
                                            </div>
                                        );
                                    })}
                                </div>}
                                <li className="nav-item">
                                    <div className="nav-link mx-2"><i className="fas fa-heart pe-2"></i>Test</div>
                                </li>

                                {!localStorage.getItem('token') ?
                                    <li className="nav-item"><Link className="btn btn-warning" to="/login">Sign in</Link></li> :
                                    // <button onClick={handleLogout} className="btn btn-warning"> Log out</button>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fas fa-chevron-circle-down fa-lg"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><a className="dropdown-item" href="#"><i className="fa-solid fa-user-large pe-2"></i>Profile</a></li>
                                            <li><a className="dropdown-item" href="#"><i className="fa-solid fa-sliders pe-2"></i>Setting</a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li className="px-4"><button role="button" className="btn btn-warning" onClick={handleLogout} >Log out</button></li>
                                        </ul>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
