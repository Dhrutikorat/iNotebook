import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/noteContext.js'
import { useNavigate } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import TagsInput from 'react-tagsinput'

function Addnote(props) {
    const context = useContext(NoteContext);
    let navigate = useNavigate();

    const { addNote } = context;
    const dataValue = localStorage.getItem('dataValue');

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTags] = useState([]);
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [text, setText] = useState("");
    const [color, setColor] = useState(localStorage.getItem('noteColor'));
    const [colorValue, setColorValue] = useState("");

    useEffect(() => {
        setColor(localStorage.getItem('noteColor'));
        if (Object.keys(error).length === 0 && isSubmit) {
            if(colorValue === "") {
                addNote(title, description, tag.toString(), dataValue);
            } else {
                addNote(title, description, tag.toString(), colorValue);
            }
            props.showAleart("Note added successfully", "success");
            navigate('/')
        }
    }, [error, navigate]);

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     addNote(note.title, description, tag.toString());
    //     props.showAleart("Note added successfully", "success");
    //     setNote({ title: "", tag: "" });
    //     setTags([]);
    //     navigate('/')
    // }

    const onChange = (e) => {
        // setNote({ ...note, [e.target.name]: e.target.value })
        setTitle(e.target.value);
    }

    const handleChange = (tags) => {
        setTags(tags);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validate(title, text));
        setIsSubmit(true)
    }

    const validate = (title, text) => {
        const errors = {};
        if (!title) {
            errors.title = "Title is required";
        } else if (title.length < 3) {
            errors.title = "Title must be atleast 3 characters";
        }

        if (!text) {
            errors.description = "Description is required";
        } else if (text.length < 5) {
            errors.description = "Description must be atleast 5 characters";
        }
        return errors;
    }

    const handleClick = (dataValue, color) => {
        localStorage.setItem('dataValue', dataValue);
        localStorage.setItem('noteColor', color);
        setColorValue(dataValue);
        setColor(color);
    }

    const clearForm = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <>
            <div className="col d-flex" style={{ marginTop: '50px' }}>
                <div className="col grid-margin">
                    {/* <pre> Title : {JSON.stringify(title, undefined, 2)}</pre>
                    <pre> Description : {JSON.stringify(description, undefined, 2)}</pre>
                    <pre> Tags : {JSON.stringify(tag, undefined, 2)}</pre> */}
                    <div className="card card-just-text" style={{ padding: '30px' }}>
                        <div className="content">
                            <div className="row g-0">
                                <div className="col-md-12">
                                    <div className="card-body">
                                        <h4 className="card-title mb-4" style={{ fontSize: '24px', marginBottom: 0, fontWeight: 600 }}>Type Note</h4>
                                        <form onSubmit={handleSubmit}>
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
                                                            className={`${color === props.colorNames[key] ? 'divActive ' :''}`}
                                                            onClick={() => handleClick(key, props.colorNames[key])} 
                                                            key={key}>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="mb-3" >
                                                <input type="text" className="form-control" id="title" name='title' value={title} placeholder="Title" size="lg" onChange={onChange} />
                                                {error.title && <span className="px-1" style={{ color: 'red' }}>{error.title}</span>}
                                            </div>
                                            <div className="mb-3">
                                                {/* <textarea type="text" className="form-control" id="description" name='description' value={description} placeholder="Description" rows="8" onChange={onChange} required="required" style={{ backgroundColor: `${noteColor}` }} /> */}
                                                <Editor
                                                    apiKey='wn1qh18crw4ncaaehy36g8yjjvkyv8ivuawgyjsxzovvevop'
                                                    onEditorChange={(newValue, editor) => {
                                                        setDescription(newValue);
                                                        setText(editor.getContent({ format: 'text' }))
                                                    }}

                                                    value={description}
                                                    init={{
                                                        selector: 'textarea',
                                                        advcode_inline: true,
                                                        toolbar_mode: 'sliding',
                                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat|forecolor backcolor',
                                                        content_style: `body{ font-family: 'Cedarville Cursive', cursive;}`
                                                    }}

                                                />
                                                {error.description && <span style={{ color: 'red' }}>{error.description}</span>}
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text tag" id="basic-addon1"><i className="fa-solid fa-tags"></i></span>
                                                <TagsInput className="form-control" value={tag} onChange={handleChange} />
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button className="btn btn-light me-2" onClick={clearForm}>Cancel</button>
                                                <button type="submit" className="btn btn-warning">Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* <div className="col-md-4">
                                <img src={require('../note.gif')} style={{ marginTop: '30px' }} className="img-fluid rounded-start" alt="" />
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addnote
