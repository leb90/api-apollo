module.exports = {
	"getUserLogin": `
		SELECT 
		    id,
		    name,
		    email,
			password,
			nickname
		FROM
		    user
		WHERE
		    nickname = :nickname
		        AND password = :password`
};
