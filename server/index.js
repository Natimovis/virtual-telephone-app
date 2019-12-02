require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const authController = require('./controllers/authController');
const contactsController = require('./controllers/contactsController');
const notesController = require('./controllers/notesController');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow_Methods', 'GET');
    next();
  });

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('The database is currently running');
});

// CAPABILITY TOKEN 
app.get('/token', authController.capability);
app.post('/voice', authController.voice);

// AUTH ENDPOINTS
app.post('/auth/contacts/new', contactsController.verify); // registering
app.get('/contacts/:user_email', contactsController.getAll); //fetching contacts
app.get('/contact/:contact_id', contactsController.getOne); //get one contact for edit and delete
app.put('/contact/:contact_id/:user_email', contactsController.edit); // edit contact
app.delete('/contact/:user_email/:contact_id/', contactsController.delete); // delete contact

// Notes Endpoints
app.post('/api/notes', notesController.add) // user can add notes
app.get('/api/notes/:user_email', notesController.getAll) // get all notes
app.get('/api/contact/notes/:contact_id', notesController.getNotes) // get notes about a specific contact
app.put('/api/notes/:contact_id/:note_id', notesController.edit) // user can edit their notes
app.delete('/api/notes/:contact_id/:note_id', notesController.delete) // user can delete notes


app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));