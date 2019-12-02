UPDATE notes
SET note_text = $3
WHERE note_id = $2;

SELECT * FROM notes
WHERE contact_id = $1;