import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext.js'
import Noteitem from './Noteitem.js';
import { Link } from 'react-router-dom';

function Notes() {
    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;

    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="banner">
                                <img src={require('../note.gif')} className="img-fluid rounded-start" alt="" />
                            </div>
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder="Title" size="lg" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <textarea type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' placeholder="Description" rows="8" onChange={onChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text  bg-gradient-primary text-white" id="basic-addon1">#</span>
                                    <input type="text" className="form-control" id="etag" name='etag' placeholder="Tag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn-gradient-danger" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className='mb-4' style={{ fontSize: '24px', marginBottom: 0, fontWeight: 600 }}> My Notes </h2>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
                {notes.map((note) => {
                    return <div className="col" key={note._id}><Noteitem updateNote={() => { return updateNote(note) }} note={note} /></div>
                })}
                <div className="col">
                    {/* <div className="col-xl-2 col-md-4 card-div"> */}
                        <div className="card-box card-div">
                            <Link type="button" className="add-btn-gradient-danger" to="/addNote"><i className="fa-solid fa-square-plus fa-2xl fa-beat" style={{ '--fa-square-plus': '2.0' }}></i></Link>
                            <h3 className="card-title m-2">New</h3>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default Notes
