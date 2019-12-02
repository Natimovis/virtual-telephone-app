SELECT n.*, c.first_name, c.last_name, c.phone_number
FROM contacts AS c
JOIN notes AS n
ON c.contact_id = n.contact_id
WHERE n.contact_id = $1