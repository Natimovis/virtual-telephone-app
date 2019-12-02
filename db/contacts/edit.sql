UPDATE contacts
SET first_name = $3, last_name=$4, phone_number=$5
WHERE contact_id = $1;

SELECT * FROM contacts
WHERE contact_id = $1;