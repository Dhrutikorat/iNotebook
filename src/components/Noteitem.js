import React, { useContext } from 'react'
import NoteContext from '../context/noteContext.js'
import Moment from 'react-moment';

function Noteitem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const toUpperCaseFilter = (d) => {
        const lower = d.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (

        <>
            <div className="card h-100 bg-card position-relative">
                <div className="card-body">
                    <div className="row ">
                        <p className="card-text"><small className="text-muted">{new Date(note.date).toLocaleDateString().split(",")[0]}</small></p>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3 className="card-title">{note.title}</h3>
                            <hr />
                            <div className="card-text">
                                <p>{note.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col">
                            <small className="text-muted"><Moment toNow filter={toUpperCaseFilter}>{note.created_at}</Moment></small>
                        </div>
                        <div className="col-auto">
                            <span className='edit-icon'>
                                <i className="fa-regular fa-pen-to-square fa-lg mx-2" onClick={updateNote}></i></span>
                            <span className='edit-icon'>
                                <i className="fa-solid fa-trash-can fa-lg" data-bs-toggle="modal" data-bs-target="#delete"></i>
                                <span class="visually-hidden">New alerts</span>
                            </span>
                        </div>
                        <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Delete Note ( {note.title} )</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete this note?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn-gradient-danger" onClick={() => { deleteNote(note._id) }} >Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
