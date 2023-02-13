import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Addnote() {
    const context = useContext(NoteContext);
    let navigate = useNavigate();

    const { addNote, message } = context;

    const handleClick = (e) => {
        e.preventDefault();
        console.log(note.title);
        addNote(note.title, note.description, note.tag);
        toast.success(message, {
            theme: "colored", 
            autoClose: 2000
        });
        navigate('/')
    }

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const clearForm = (e) => {
        e.preventDefault();
        navigate('/')
        // setNote({ title: "", description: "", tag: "" });
    }
    return (
        <div className="col d-flex mt-4">
            <div className="col grid-margin">
                <div className="card mb-3" style={{ padding: '30px' }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h4 className="card-title mb-4" style={{ fontSize: '24px', marginBottom: 0, fontWeight: 600 }}>Type Note</h4>
                                <form>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="title" name='title' value={note.title} placeholder="Title" size="lg" onChange={onChange} required="required" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea type="text" className="form-control" id="description" name='description' value={note.description} placeholder="Description" rows="8" onChange={onChange} required="required" />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text  bg-gradient-primary text-white" id="basic-addon1">#</span>
                                        <input type="text" className="form-control" id="tag" name='tag' placeholder="Tag" onChange={onChange} value={note.tag} />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-light me-2" onClick={clearForm}>Cancel</button>
                                        <button disabled={note.title.length < 3 && note.description.length < 6} type="submit" className="btn-gradient-danger" onClick={handleClick}>Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src={require('../note.gif')} style={{ marginTop: '30px' }} className="img-fluid rounded-start" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addnote
