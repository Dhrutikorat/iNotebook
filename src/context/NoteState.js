import NoteContext from './noteContext'
import {useState} from 'react'

const NoteState = (props) => {

    const s = {
        "name":"Dhruti"
    }

    const [state, setState] = useState(s);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "iNotebook"
            })
        }, 3000);
    }

    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;