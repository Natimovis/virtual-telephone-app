INSERT INTO notes (contact_id, user_email, note_text, rating)
VALUES ($1, $2, $3, $4);

SELECT * FROM notes
WHERE contact_id = $1;