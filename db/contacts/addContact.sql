INSERT INTO contacts (phone_number, first_name, last_name, user_email)
VALUES ($1, $2, $3, $4)
RETURNING *;