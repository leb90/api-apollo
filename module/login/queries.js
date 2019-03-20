module.exports = {
	"getUserLogin": `
		SELECT 
		    id,
		    name,
		    email,
		    password,
		    rol_id
		FROM
		    user
		WHERE
		    email = :email
		        AND password = :password`
};
