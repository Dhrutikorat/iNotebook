const { validationResult } = require("express-validator");
const Note = require("../models/Note");

const getAllNotes = async (req, res) => {
    try {
        const q = req.query.search;

        if (q === undefined || q === "") {
            const notes = await Note.find({ user: req.user.id }).sort('title');
            res.json({ status: 200, response: "Notes found", data: notes });
        } else {
            const notes = await Note.find({
                user: req.user.id,
                $or: [
                    {
                        title: { $regex: '.*' + q + '.*', $options: 'i' },
                    },
                    {
                        tag: { $regex: '.*' + q + '.*', $options: 'i' },
                    }
                ],
                // title: { $regex: '.*' + q + '.*', $options: 'i' }
                // $text: { $search: q }
            });
            res.json({ status: 200, response: "Notes found", data: notes });
        }
    } catch (error) {
        res.json({ status: 500, response: "Something went wrong" })
    }
}


const getAllNoteTags = async (req, res) => {
    try {
        let tag = req.params.tag;
        const notes = await Note.find({ user: req.user.id, tag: { $regex: '.*' + tag + '.*', $options: 'i' } });
        res.json({ status: 200, response: "Note's tags found", data: notes });
    } catch (error) {
        res.json({ status: 500, response: "Something went wrong" })
    }
}


const getAllUserByNoteId = async (req, res) => {
    try {
        let noteId = req.params.id;
        console.log(noteId)
        const note = await Note.findOne({ _id: noteId });
        res.json({ status: 200, response: "Note found", data: note });
    } catch (error) {
        res.json({ status: 500, response: "Something went wrong" })
    }
}

const getAllTags = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).distinct('tag');
        res.json({ status: 200, response: "Note's tags found", data: notes });
    } catch (error) {
        console.log(error)
        res.json({ status: 500, response: error })
    }
}


const addNote = async (req, res) => {

    try {
        const errors = validationResult(req);
        //if data is not valid, then throw errors..
        if (!errors.isEmpty()) {
            return res.json({ response: errors.array(), status: 400 });
        }

        const { title, description, tag, colorValue, colorCode } = req.body
        const note = new Note({
            title, description, tag, user: req.user.id, colorValue, colorCode
        });

        const savedNote = await note.save();
        res.json({ status: 200, response: "Note added", data: savedNote })
    } catch (error) {
        console.log(error.message)
        res.json({ status: 500, response: "Something went wrong" })
    }
}

const updateNote = async (req, res) => {
    try {
        // Create new note object
        const newNote = {}
        const { title, description, tag, colorValue } = req.body

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        if (colorValue) { newNote.colorValue = colorValue }

        // Note exists or not....
        noteId = req.params.id;

        let note = await Note.findById(noteId)
        if (!note) {
            return res.json({ response: "Note not found", status: 404 })
        }

        //allow deletion if user owns this note..
        if (note.user.toString() !== req.user.id) {
            return res.json({ response: "Not Allowed", status: 401 })
        }

        // Update note...
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ status: 200, response: "Note updated", data: note });
    } catch (error) {
        res.json({ status: 500, response: "Something went wrong" })
    }

}

const deleteNote = async (req, res) => {
    try {
        // find a note...
        let noteId = req.params.id;
        let note = await Note.findById(noteId)

        if (!note) {
            return res.json({ response: "Note not found", status: 404 })
        }
        // allow deletion if user owns this note..
        if (note.user.toString() !== req.user.id) {
            return res.json({ response: "Not Allowed", status: 401 })
        }
        // Update note...
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ status: 200, response: "User note deleted", data: note })

    } catch (error) {
        console.log(error.message)
        res.json({ status: 500, response: "Something went wrong" })
    }

}
module.exports = { getAllNotes, getAllNoteTags, getAllUserByNoteId, getAllTags, addNote, updateNote, deleteNote }