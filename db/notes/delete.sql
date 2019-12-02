DELETE FROM notes
WHERE note_id = $2;

SELECT * FROM notes
WHERE contact_id = $1;