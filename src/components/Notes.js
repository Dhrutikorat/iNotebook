import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom';
import NoteContext from '../context/noteContext.js'
import Noteitem from './Noteitem.js';
import { useNavigate } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css'

function Notes(props) {
    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote, getNotesByTag, getAllTags, noteTags } = context;
    const [tag, setTags] = useState([]);
    // const [noteTags, setNoteTags] = useState([]);
    const [active, setActive] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
            getAllTags();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [navigate]);

    const [note, setNote] = useState({ id: "", etitle: "" });
    const [edescription, setEdescription] = useState("");
    const ref = useRef(null)
    const refClose = useRef(null)
    const [text, setText] = useState('');

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title })
        setTags(currentNote.tag.split(","));
        setEdescription(currentNote.description);
    }

    const handleChange = (tags) => {
        setTags(tags);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, edescription, tag.toString())
        props.showAleart("Note updated successfully", "success");
        refClose.current.click();
    }

    const handleTagclick = (noteTag) => {
        getNotesByTag(noteTag);
        console.log('-----')
        setActive(noteTag);
        console.log(noteTag)
    }

    return (
        <div>
            {/* <Addnote showAleart={props.showAleart}/> */}
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
                                    {/* <textarea type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' placeholder="Description" rows="8" onChange={onChange} /> */}
                                    <Editor
                                        apiKey='wn1qh18crw4ncaaehy36g8yjjvkyv8ivuawgyjsxzovvevop'
                                        // onInit={(evt, editor) => {
                                        //     setText(editor.getContent());
                                        // }}
                                        onEditorChange={(newValue, editor) => {
                                            setEdescription(newValue);
                                            setText(editor.getContent({ format: 'text' }))
                                        }}
                                        // outputFormat="text"

                                        value={edescription}
                                        init={{
                                            selector: 'textarea',
                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        }}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text  bg-gradient-primary text-white" id="basic-addon1">#</span>
                                    <TagsInput className="form-control" value={tag} onChange={handleChange} />
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
            <div className="row mb-4 mt-4">
                <div className="col-auto" style={{ marginLeft: '15px' }}>
                    <img src={require('../post-it.png')} height="50" alt="" />
                </div>
                <div className="col">
                    <h4>My Notes</h4>
                </div>

            </div>
            <div className="col d-flex">
                <div className='btn btn-warning rounded m-1' style={{
                    backgroundColor: (active === "") ? '#ffca2c' : 'transparent',
                    color: (active === "") ? 'white' : 'black'
                }} onClick={() => { getAllNotes(); setActive("") }}>All</div>
                {/* {notes.length > 0 && Array.from(new Set(notes.map((item) => item.tag))) // for remove array value dublications*/}
                {noteTags.length > 0 && noteTags
                    .map((noteTag, index) => {
                        return <div className="btn btn-outline-info rounded m-1" style={{
                            backgroundColor: (active === noteTag) ? '#ffca2c' : 'transparent',
                            borderColor: (active === noteTag) ? '#ffc720' : '#ffc107',
                            color: (active === noteTag) ? 'white' : 'black'
                        }} value={noteTag} key={index} onClick={() => handleTagclick(noteTag)}>
                            {noteTag}
                        </div>
                    })}
            </div>


            {/* <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
                {notes.length > 0 ? notes.map((note) => {
                    return <div className="col" key={note._id}>
                        <Noteitem updateNote={() => { return updateNote(note) }} note={note} showAleart={props.showAleart} />
                    </div>

                }) : <div className='text-right mx-2'>Notes not found</div>}
            </div> */}

            <div className="container bootstrap snippets bootdeys">
                <div className="row">
                    {notes.length > 0 ? notes.map((note) => {
                        return <div className="col-md-4 col-sm-6 content-card" key={note._id}>
                            <Noteitem updateNote={() => { return updateNote(note) }} note={note} showAleart={props.showAleart} />
                        </div>
                    }) : <>
                        <div className='text-center mx-2'>
                            <div className="col">
                                <img src={require('../not_found_2.png')} style={{ marginTop: '50px' }} className="img-fluid rounded-start" alt="" />
                            </div>
                            <div className="col">
                                <span className='text-muted'>Notes not found</span>
                            </div>
                        </div>
                    </>}

                </div>
            </div>
        </div>
    )
}

export default Notes
