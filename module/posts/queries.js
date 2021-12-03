module.exports = {
  "getPosts": `SELECT id, img, postText, time, title FROM post`,
  "getPost": `SELECT id, img, postText, time, title FROM post WHERE id = :id`,
  "insertPost": "INSERT INTO post SET ?",
  "updatePost": "UPDATE post SET ? WHERE id = ? ",
  "getTags": "SELECT id, tags FROM tags;",
  "insertTags": "INSERT INTO tags SET ?",
  "getAllTags": `SELECT post.id, post.img, post.postText, post.time, tags.tags
		FROM post
		LEFT JOIN tags
		ON post.idTags = tags.id
		WHERE post.idTags = :id`,
};
