import React,{useContext} from 'react'
import NoteContext from '../context/noteContext.js'
import Noteitem from './Noteitem.js';


function Notes() {
    const context = useContext(NoteContext);
    const { notes } = context;

    return (
        <div>
            <h2 className='mb-4 display-4'> My notes </h2>
            <div className="row">
                {notes.map((note, i) => {
                    return <div className="col-md-4 grid-margin" key={i}><Noteitem note={note}/></div>
                })}
            </div>
        </div>
    )
}

export default Notes
