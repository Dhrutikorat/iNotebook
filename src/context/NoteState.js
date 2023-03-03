import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const url = "http://localhost:5000";

    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [noteTags, setNoteTags] = useState([]);

    // Fetch user all notes
    const getAllNotes = async (search) => {
        if (search === undefined || search === "") {
            const responseData = await fetch(`${url}/api/notes/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const { data } = await responseData.json();
            setNotes(data)
        } else {
            const responseData = await fetch(`${url}/api/notes/all?search=${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const { data } = await responseData.json();
            setNotes(data)
        }

        // setStatus(status);
        // setMessage(response);
    }

    // Fetch user all note's by tagname
    const getNotesByTag = async (tag) => {
        const responseData = await fetch(`${url}/api/notes/tag/${tag}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const { data } = await responseData.json();
        setNotes(data);

    }

    // Fetch user all note's by tagname
    const getAllTags = async () => {
        const responseData = await fetch(`${url}/api/notes/tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const { data } = await responseData.json();
        // setNoteTags(data);
        let tagsArr = data.toString().split(",");

        setNoteTags(removeDuplicates(tagsArr));
        
    }

    const removeDuplicates = (arr)=> {
        return arr.filter((item, 
            index) => arr.indexOf(item) === index);
    }

    // Add note
    const addNote = async (title, description, tag, colorValue) => {

        // API call
        const responseData = await fetch(`${url}/api/notes/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, colorValue })
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
                'auth-token': localStorage.getItem('token')
            },
        });
        const { response, status } = await responseData.json();
        setStatus(status)
        setMessage(response) /// add if else based on API status
        const newNotes = notes.filter((note) => { return (note._id !== id) });
        setNotes(newNotes);
    }

    // Edit note
    const editNote = async (id, title, description, tag, colorValue) => {
        // API call
        const responseData = await fetch(`${url}/api/notes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, colorValue })
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
                newnotes[index].colorValue = colorValue;
                break;
            }
        }
        setNotes(newnotes);
    }

    return (
        <NoteContext.Provider value={{ notes, message, status, noteTags, setMessage, setNotes, addNote, editNote, deleteNote, getAllNotes, getNotesByTag, getAllTags }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;