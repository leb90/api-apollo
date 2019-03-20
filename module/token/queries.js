module.exports = {
	"getUserLogin": `
		SELECT 
		    id, name, email, password, level, phone
		FROM
		    user
		WHERE
		    name = :name
		        AND password = :password`,
};