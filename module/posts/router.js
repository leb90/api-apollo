"use strict";

const express = require("express");
const hasher = require("../../helper/hasher");
const postController = require("./controller");

const router = express.Router();

router.get("/all", (req, res, next) => {
  postController.getUsers((err, data) => {
    if (err || _.isEmpty(data)) {
      return res.sender(new MessageHandler("server"), next);
    }
    res.sender(new MessageHandler(data, true), next);
  });
});

router.get("/id", (req, res, next) => {
  const id = req.query.id;
  if (_.isEmpty(id)) {
    res.sender(new MessageHandler("server"), next);
  }

  postController.getUser(id, (err, data) => {
    if (err || _.isEmpty(data)) {
      return res.sender(new MessageHandler("server"), next);
    }
    res.sender(new MessageHandler(data, true), next);
  });
});

router.get("/idTags", (req, res, next) => {
  const id = req.query.id;
  if (_.isEmpty(id)) {
    res.sender(new MessageHandler("server"), next);
  }

  postController.getByIdTags(id, (err, data) => {
    if (err || _.isEmpty(data)) {
      return res.sender(new MessageHandler("server"), next);
    }
    res.sender(new MessageHandler(data, true), next);
  });
});

router.get("/tags", (req, res, next) => {
	postController.getTags((err, data) => {
		if (err || _.isEmpty(data)) {
		  return res.sender(new MessageHandler("server"), next);
		}
		res.sender(new MessageHandler(data, true), next);
	  });
  });
router.get("/", (req, res, next) => {
  const id = req.session.userId;
  if (!id) {
    return res.sender(new MessageHandler("server"), next);
  }

  postController.getUser(id, (err, data) => {
    if (err || _.isEmpty(data)) {
      return res.sender(new MessageHandler("server"), next);
    }
    res.sender(new MessageHandler(data, true), next);
  });
});

router.post("/", (req, res, next) => {
  const postData = req.body;

  if (!_.isEmpty(postData)) {
    postController.insertPost(postData, (err, data) => {
      if (err || _.isEmpty(data)) {
        return res.sender(new MessageHandler(err), next);
      }
      return res.sender(new MessageHandler(data, true), next);
    });
  } else {
    return res.sender(new MessageHandler("server"), next);
  }
});

router.post("/Tags", (req, res, next) => {
  const tagsData = req.body;

  if (!_.isEmpty(tagsData)) {
    postController.insertTags(tagsData, (err, data) => {
      if (err || _.isEmpty(data)) {
        return res.sender(new MessageHandler(err), next);
      }
      return res.sender(new MessageHandler(data, true), next);
    });
  } else {
    return res.sender(new MessageHandler("server"), next);
  }
});

router.put("/", (req, res, next) => {
  const postData = req.body;
  const id = req.session.postId;
  if (_.isEmpty(postData)) {
    return res.sender(new MessageHandler("passwordIsEmpty"), next);
  }
  if (!_.isEmpty(postData.password)) {
    postData.password = hasher.password(postData.password);
  } else {
    delete postData.password;
  }

  postController.updatepost(postData, id, (err, data) => {
    if (err || _.isEmpty(data)) {
      return res.sender(new MessageHandler(err), next);
    }
    res.sender(new MessageHandler(postData, true), next);
  });
});

router.put("/password", (req, res, next) => {
  const userPassword = req.body;
  const id = req.session.userId;
  if (_.isEmpty(userPassword)) {
    return res.sender(new MessageHandler("passwordIsEmpty"), next);
  }

  postController.updatePassword(userPassword, id, (err, data) => {
    if (err || _.isEmpty(data)) {
      return res.sender(new MessageHandler(err), next);
    }
    res.sender(new MessageHandler({}, true), next);
  });
});

router.put("/id", (req, res, next) => {
  const userData = req.body;
  const id = req.query.id;

  if (!_.isEmpty(userData.password)) {
    userData.password = hasher.password(userData.password);
  } else {
    delete userData.password;
  }
  if (!_.isEmpty(userData)) {
    postController.updateUser(userData, id, (err, data) => {
      if (err || _.isEmpty(data)) {
        return res.sender(new MessageHandler(err), next);
      }
      res.sender(new MessageHandler(data, true), next);
    });
  }
});
module.exports = router;
