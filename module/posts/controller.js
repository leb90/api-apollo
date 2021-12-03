"use strict";

const queries = require("./queries.js");
const BaseController = require("../baseController.js");
const hasher = require("../../helper/hasher");

const controllerPost = new BaseController({
  getPosts(callback) {
    this.executeQuery(queries.getPosts, (err, rows) => {
      if (err) throw err;
      callback(err, rows);
    });
  },

  getPost(id, callback) {
    this.executeQuery(queries.getPost({ postId: id }), [], (err, result) => {
      callback(err, result);
    });
  },

  getByIdTags(id, callback) {
    this.executeQuery(queries.getAllTags({ tagsId: id }), [], (err, result) => {
      callback(err, result);
    });
  },

  getTags(callback) {
    this.executeQuery(queries.getPosts, (err, rows) => {
      if (err) throw err;
      callback(err, rows);
    });
  },
  
  insertPost(postData, callback) {
    this.executeQuery(queries.insertPost, postData, (err, rows) => {
      callback(err, rows);
    });
  },

  insertTags(tagsData, callback) {
    this.executeQuery(queries.insertTags, tagsData, (err, rows) => {
      callback(err, rows);
    });
  },

  updatePost(postData, PostId, callback) {
    this.executeQuery(queries.updatePost, [postData, PostId], (err, rows) => {
      if (err || _.isEmpty(rows)) {
        return callback(err);
      }
      callback(null, rows);
    });
  },
});

module.exports = controllerPost;
