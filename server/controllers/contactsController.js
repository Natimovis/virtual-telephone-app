
module.exports = {
    verify: async (req, res) => {
        const {phone_number, first_name, last_name, user_email, contact_id } = req.body
        const db = req.app.get('db');

        const foundNumber = await db.contacts.checkForNumber(phone_number)

        if (!foundNumber[0]) {
            await db.contacts.addContact(phone_number, first_name, last_name, user_email, contact_id);
            const contacts = await db.contacts.getAll(user_email);           
            res.status(200).json(contacts);
        }
    },
    getAll: async (req, res) => {
        const db = req.app.get('db');
            const user_email = req.params.user_email;

            const contacts = await db.contacts.getAll(user_email);

            res.status(200).json(contacts);      
    },
    getOne: async (req, res) => {
        const contact_id = +req.params.contact_id;
        const db = req.app.get('db');

        const contact = await db.contacts.getOne(contact_id);

        res.status(200).json(contact[0])
    },
    edit: async (req, res) => {
        const {first_name, last_name, phone_number} = req.body;
        const contact_id = +req.params.contact_id;
        const user_email = req.params.user_email;
        const db = req.app.get('db');

        const contacts = await db.contacts.edit(contact_id, user_email, first_name, last_name, phone_number);

        res.status(200).json(contacts)
    },
    delete: async (req, res) => {
        const user_email = req.params.user_email;
        const contact_id = +req.params.contact_id;
        const db = req.app.get('db');

        const contacts = await db.contacts.delete(user_email, contact_id);

        res.status(200).json(contacts)
    }
}