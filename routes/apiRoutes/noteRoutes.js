const fs = require('fs');
const router = require('express').Router();
//Suggested by npm for accessing random ID
const { v4: uuidv4 } = require('uuid');
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if(err) {
            console.log("Unable to find notes.");
            res.json(err);
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    })
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            //Unique ID
            id: uuidv4(),
        };

        fs.readFile(`./db/db.json`, (err, data) => {
            if(err) {
                console.log("Unable to access notes.");
                res.json(err);
            }  else {
                const notes = JSON.parse(data);
    
                if (!notes) {
                    notes = [];
                    console.log("this is your first note");
                }
                notes.push(newNote);
                const notePackage = JSON.stringify(notes);

                fs.writeFile(`./db/db.json`, notePackage, (err) => {
                    if(err)
                    {
                        console.log("Unable to store note.")
                        res.json(err);
                    } else {
                        const response = {
                            status: 'sucess',
                            body: newNote,
                        };
                        console.log(response);
                        res.json(response);
                    }
                })
            }
        })
    } else {
        console.log("Note not properly filled out")
        res.json(err);
    }
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile(`./db/db.json`, (err, data) => {
        if(err) {
            console.log("Unable to access notes.");
            res.json(err);
        } else {
            const notes= JSON.parse(data);
            if (!notes) {
                res.send(console.log("No notest to delete"));
            }
            
            let newNotes = notes.filter(note => note.id !== req.params.id);
            const notePackage = JSON.stringify(newNotes);
            fs.writeFile(`./db/db.json`, notePackage, (err) => {
                if(err)
                {
                    console.log("Unable to store note.")
                    res.json(err);
                } else {
                    const response = {
                        status: 'sucess',
                    };
                    console.log(response);
                }
            })
        }
    })
    res.send('Got a DELETE requrest at /user');
})

module.exports = router
