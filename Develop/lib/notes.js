const fs = require('fs');
const path = require('path');

function addNote(body, noteArray) {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFilesSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({notes: noteArray}, null, 2)
    );
    return newNote;
};