import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import noteContext from '../context/noteContext';

export default function Viewnote(props) {
    const { id } = useParams();
    const context = useContext(noteContext);
    const { userNote, getUserNoteById, deleteNote } = context;

    const colorArr = {
        yellow: '#ffe28c',
        green: '#d5e5a3',
        brown: '#a47e65',
        purple: '#baa9ba',
        orange: '#ff8f5e',
        blue: '#b8d8d8'
    }
    // props.setBodyColor(colorArr[userNote.colorValue]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserNoteById(id);
        }
        // eslint-disable-next-line
    }, [colorArr]);


    return (
        // <div className='container'>
        <div className='row mt-4'>
            <div className="col-md-8 col-sm-6">
                <div className='card-big-shadow' style={{ maxWidth: '1450px', height: '700px' }}>
                    <div className="card card-just-text" style={{ maxWidth: '850px', height: '700px' }} data-background="color" data-color={userNote.colorValue} data-radius="none">
                        <div className="content">
                            <div className="row mb-4">
                                <div className="col-auto">
                                    {/* <div className="d-flex justify-content-start mt-2" style={{ position: 'relative' }}> */}
                                    <Link className='mx-1' style={{ color: 'black', textDecoration: 'none', fontSize: '25px' }} to="/"> &#11104;</Link>
                                    {/* </div> */}
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <i className="fa-regular fa-pen-to-square fa-lg icon mt-2 mx-1 mb-4"></i>
                                    <i className="fa-solid fa-trash icon" onClick={() => { deleteNote(userNote._id); props.showAleart("Note deleted successfully", "success"); }} ></i>
                                </div>
                            </div>
                            <div className="mx-4">

                                <div className="row">
                                    <div className="col">
                                        <h2 className="title mb-3">
                                            {userNote.title}
                                        </h2>
                                    </div>
                                    <div className="col-auto">
                                        <div className=" justify-content-start mb-1">
                                            <i className="fa-solid fa-calendar-days pe-2"></i>
                                            {new Date(userNote.date).toLocaleDateString().split(",")[0]}
                                        </div>

                                    </div>
                                    <div className="row justify-content-start mt-2">
                                        <div className='col-auto'>
                                            {userNote.tag !== undefined && userNote.tag.split(",").length > 0 &&  userNote.tag.split(",").map((tag, i) => {
                                                return <span className="badge bg-warning text-dark mx-1" key={i} style={{ fontSize: '15px' }}>{tag}</span>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="m-4" dangerouslySetInnerHTML={{ __html: userNote.description }} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        // </div >
    )
}
