const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: ture}));
app.use(express.json());

const allNotes = require('./Develop/data/notes.json');

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './Develop/data/notes.json'),
        JSON.stringify({ allNotes: notesArray }, null, 2)
    );
    return newNote;
}
app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = allNotes.length.toString();

    const newNote = createNewNote(req.body, allNotes);

    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})