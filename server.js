const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const notes = require('./Develop/data/notes.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})