import React, { useContext, useEffect, useState, useRef } from 'react'
// import { Link } from 'react-router-dom';
import NoteContext from '../context/noteContext.js'
import Noteitem from './Noteitem.js';
import { useNavigate } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css'

function Notes(props) {
    const context = useContext(NoteContext);
    const { notes, getAllNotes, getAllTags, noteTags, getNotesByTag, editNote } = context;
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
    const [noteColor, setNoteColor] = useState("");
    const reload = () => window.location.reload();

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title })
        setTags(currentNote.tag.split(","));
        setEdescription(currentNote.description);
        setNoteColor(currentNote.colorValue);
    }

    const handleChange = (tags) => {
        setTags(tags);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, edescription, tag.toString(), noteColor);
        props.showAleart("Note updated successfully", "success");
        // refClose.current.click();
        reload();
    }

    const handleTagclick = (noteTag) => {
        getNotesByTag(noteTag);
        setActive(noteTag);
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary btn-floating btn-lg d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* <div className="banner">
                                <img src={require('../note.gif')} className="img-fluid rounded-start" alt="" />
                            </div> */}
                            <form>
                                <div className="mb-3">
                                    <div className='justify-content-start d-flex mb-4' >
                                        {Object.keys(props.colorNames).map(key => {
                                            return (
                                                <div
                                                    style={{
                                                        height: '25px',
                                                        width: '25px',
                                                        cursor: 'pointer',
                                                        backgroundColor: props.colorNames[key],
                                                        border: '2px solid rgb(255, 248, 220)',
                                                        borderRadius: '50%',
                                                        marginRight: "5px"
                                                    }}
                                                    className={`${noteColor === key ? 'divActive ' : ''}`}
                                                    onClick={() => setNoteColor(key)}
                                                    key={key}>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder="Title" size="lg" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    {/* <textarea type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' placeholder="Description" rows="8" onChange={onChange} /> */}
                                    <Editor
                                        apiKey='lnyvvpneof9cn4kor1wd6q6olt9svw64xogxmndyql76bxqf'
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
                                            advcode_inline: true,
                                            toolbar_mode: 'sliding',
                                            plugins: 'anchor autolink  codesample  image link lists media wordcount',
                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat|forecolor backcolor',
                                            content_style: `body{ font-family: 'Cedarville Cursive', cursive;}`
                                        }}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text tag" id="basic-addon1"><i className="fa-solid fa-tags"></i></span>
                                    <TagsInput className="form-control" value={tag} onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-light me-2" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                </div>
            </div >
            <div className="row mb-4 mt-4">
                {/* <div className="col-auto" style={{ marginLeft: '15px' }}>
                    <img src={require('../post-it.png')} height="50" alt="" />
                </div> */}
                <div className="col">
                    <h4>My Notes</h4>
                </div>
            </div>
            <div className="col d-flex">

                {noteTags[0] !== "" && <div className='btn btn-warning rounded m-1' style={{
                    backgroundColor: (active === "") ? '#ffca2c' : 'transparent',
                    color: (active === "") ? 'white' : 'black'
                }} onClick={() => { getAllNotes(); setActive("") }}>All</div>}

                {/* {notes.length > 0 && Array.from(new Set(notes.map((item) => item.tag))) // for remove array value dublications*/}
                {noteTags[0] !== "" && noteTags.length > 0 && noteTags
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
                            {/* updateNote={() => { return updateNote(note) }} */}
                            <Noteitem updateNote={updateNote} note={note} showAleart={props.showAleart} />
                        </div>
                    }) : <>
                        <span className='text-muted mt-2'>Notes not found</span>
                    </>}

                </div>
            </div>

        </div >
    )
}

export default Notes
