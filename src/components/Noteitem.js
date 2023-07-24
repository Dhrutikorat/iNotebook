import { React, useContext } from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/noteContext';


function Noteitem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <>
            {/* <div className="card h-100">
                <div className="filter">
                    <a className="icon" href="/" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-ellipsis"></i></a>
                    <ul className="t1 dropdown-menu dropdown-menu-end dropdown-menu-arrow" >
                        <li><span className="dropdown-item" onClick={() => { updateNote(note); }}><i className="fa-regular fa-pen-to-square icon"></i>Edit</span></li>
                        <li><span className="dropdown-item" onClick={() => { deleteNote(note._id); props.showAleart("Note deleted successfully", "success"); }}><i className="fa-solid fa-trash icon"></i>Delete</span></li>
                    </ul>
                </div>
                <div className="card-body">
                    <p className="card-text"><small className="text-muted">{new Date(note.date).toLocaleDateString().split(",")[0]}</small></p>
                    <div className="row">
                        <div className="col">
                            <h3 className="card-title">{note.title}</h3>
                            <div className="card-text">
                                <div dangerouslySetInnerHTML={{ __html: note.description }} />
                                {
                                    note.tag && note.tag.split(",").length === 1
                                        ? <span className="badge rounded-pill bg-gradient-danger">{note.tag}</span>
                                        : note.tag.split(",").map((tag) => {
                                            return <span className="badge rounded-pill bg-gradient-danger m-1">{tag}</span>
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}

            <div className="card-big-shadow">
                <div className="card card-just-text" data-background="color" data-color={note.colorValue} data-radius="none">
                    <div className="content">
                        <h6 className="category">{new Date(note.date).toLocaleDateString().split(",")[0]}</h6>
                        <div className="row mb-4">
                            <div className="col-auto">
                                <h4 className="title">
                                    <Link to={{ pathname: `view/${note._id}` }}>{note.title}</Link>
                                </h4>
                            </div>
                            <div className="col">
                                <div style={{ cursor: 'pointer' }}>
                                    <i className="fa-regular fa-pen-to-square icon" onClick={() => { updateNote(note); }}></i>
                                    <i className="fa-solid fa-trash icon" onClick={() => { deleteNote(note._id); props.showAleart("Note deleted successfully", "success"); }}></i>
                                </div>
                            </div>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: note.description.slice(0, 250) }} />
                        <div className=' text-dark'>
                            <i className="fa-solid fa-tags pe-2 py-2"></i> 
                            {note.tag && note.tag.split(",").length === 1
                                ? <span className="badge btn btn-light text-dark m-1">{note.tag}</span>
                                : note.tag.split(",").map((tag, i) => {
                                    return <span className="badge btn btn-light text-dark m-1" key={i}>{tag}</span>
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
