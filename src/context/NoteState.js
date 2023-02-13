import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const url = "http://localhost:5000";

    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    // Fetch user all notes
    const getAllNotes = async () => {

        // API call
        const responseData = await fetch(`${url}/api/notes/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjdkMjkyOTlhNTRkYzA0NGFhNzJkIn0sImlhdCI6MTY3NTMzMDk3NX0._ccC78ekudfNsu62bQP7pA0SNkVvQOcBdpL7g2ItVj8"
            },
        });
        const { response, data, status } = await responseData.json();

        setStatus(status);
        setMessage(response);
        setNotes(data)
    }

    // Add note
    const addNote = async (title, description, tag) => {

        // API call
        const responseData = await fetch(`${url}/api/notes/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjdkMjkyOTlhNTRkYzA0NGFhNzJkIn0sImlhdCI6MTY3NTMzMDk3NX0._ccC78ekudfNsu62bQP7pA0SNkVvQOcBdpL7g2ItVj8"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const { response, data, status } = await responseData.json();
        setStatus(status)
        setMessage(response)
        setNotes(notes.concat(data))
    }

    // Delete note
    const deleteNote = async (id) => {
        const responseData = await fetch(`${url}/api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjdkMjkyOTlhNTRkYzA0NGFhNzJkIn0sImlhdCI6MTY3NTMzMDk3NX0._ccC78ekudfNsu62bQP7pA0SNkVvQOcBdpL7g2ItVj8"
            },
        });
        const { response, status } = await responseData.json();
        setStatus(status)
        setMessage(response) /// add if else based on API status
        const newNotes = notes.filter((note) => { return (note._id !== id) });
        setNotes(newNotes);
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {
        // API call
        const responseData = await fetch(`${url}/api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkYjdkMjkyOTlhNTRkYzA0NGFhNzJkIn0sImlhdCI6MTY3NTMzMDk3NX0._ccC78ekudfNsu62bQP7pA0SNkVvQOcBdpL7g2ItVj8"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const { response, status } = await responseData.json();
        setMessage(response);
        setStatus(status);

        let newnotes = JSON.parse(JSON.stringify(notes));

        // update note
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setNotes(newnotes);
    }

    return (
        <NoteContext.Provider value={{ notes, message, status, setNotes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;