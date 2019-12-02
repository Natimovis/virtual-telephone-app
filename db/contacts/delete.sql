DELETE FROM contacts
WHERE contact_id = $2;

SELECT * FROM contacts
WHERE user_email = $1;