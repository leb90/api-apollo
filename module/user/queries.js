module.exports = {
	"getUsers":`SELECT id, name, nickname, surname, email FROM user`,
	"getUser":`SELECT id, name, nickname, surname, email FROM user WHERE id = :id`,
	"insertUser": "INSERT INTO user SET ?",
	"updateUser": "UPDATE user SET ? WHERE id = ? ",
	"getPassword": "SELECT password FROM user WHERE id = :id",
	"getUserByEmail": `
		SELECT 
		    id, name, nickname, surname, email
		FROM
		    user
		WHERE
			email = :email`,
};