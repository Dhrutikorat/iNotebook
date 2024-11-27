const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body } = require('express-validator');
const {
    getAllNotes,
    getAllNoteTags,
    getAllUserByNoteId,
    getAllTags,
    addNote,
    updateNote,
    deleteNote
} = require('../controllers/notes');
const router = express.Router();

// Route:1 Get all notes Method:"GET" "/api/notes/all", Login required
router.get('/all', fetchuser, getAllNotes)

// Route:2 Get all tags by tag name |  Method:"GET" "/api/notes/tags/:tag", Login required
router.get('/tag/:tag', fetchuser, getAllNoteTags)

// Route:3 Get all tags Method:"GET" "/api/notes/:id", Login required
router.get('/get/:id', fetchuser, getAllUserByNoteId)

// Route:4 Get all tags Method:"GET" "/api/notes/tags", Login required
router.get('/tags', fetchuser, getAllTags)

// Route:5 Add notes Method:"POST" "/api/notes/add"
router.post('/add', [
    body('title', 'Title must be atleast 3 character').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 6 }),
], fetchuser, addNote)

// Route:6 update notes Method:"PUT" "/api/notes/update" , Login required
router.put('/update/:id', fetchuser, updateNote)

// Route:7 Delete existing note Method:"PUT" "/api/notes/delete", Login required
router.delete('/delete/:id', fetchuser, deleteNote)

module.exports = router