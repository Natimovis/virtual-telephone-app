module.exports = {
    getAll: async (req, res) => {
        console.log(req.body)
        const user_email = req.params.user_email;
        const db = req.app.get('db');

        let notes;
        try {
            notes = await db.notes.getAll(user_email);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).json(notes)
    },
    getNotes: async (req, res) => {
        const contact_id = +req.params.contact_id;
        console.log(req.body)
        const db = req.app.get('db');

        let notes;
        try {
            notes = await db.notes.getNotes(contact_id);
            // console.log(res);
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).json(notes)
    },
    add: async (req, res) => {
        const {contact_id, user_email, note_text, rating} = req.body;
        const db = req.app.get('db');
        console.log(req.body)
        console.log(user_email)

        const notes = await db.notes.add(contact_id, user_email, note_text, rating);

        res.status(200).json(notes)
    },
    edit: async (req, res) => {
        const { note_text } = req.body; 
        const contact_id = +req.params.contact_id;
        const note_id = +req.params.note_id;
        const db = req.app.get('db');

        const notes = await db.notes.edit(contact_id, note_id, note_text); 

        res.status(200).json(notes)
    },
    delete: async (req, res) => {
        const contact_id = +req.params.contact_id;
        const note_id = +req.params.note_id;
        const db = req.app.get('db');

        const notes = await db.notes.delete(contact_id, note_id);

        res.status(200).json(notes)
    }
}