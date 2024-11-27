import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext';

export default function Search() {
    const context = useContext(noteContext);
    const { getAllNotes } = context;

    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.value === "") {
            window.location.reload(true);
        } else {
            setSearchTerm(e.target.value);
            getAllNotes(searchTerm);
            if(window.location.pathname !== '/') {
                navigate("/");
            }
        }
    };
    return (
        <form className="input-group w-auto my-auto d-none d-sm-flex">
            <input autoComplete="off" type="search" className="form-control rounded" placeholder="Search"
                style={{ minWidth: '130px' }} onChange={onChange} />
            <span className="input-group-text border-0 d-none d-lg-flex"><i className="fa fa-search"></i></span>
        </form>
    )
}
