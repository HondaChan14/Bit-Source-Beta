const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
    createComment: async (req, res) => {
    try {
      //TODO add new properties to each document
        await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/" + req.params.id);
    } catch (err) {
        console.log(err);
    }
    },
    editComment: async (req, res) => {
    try {
        await Comment.updateOne({
        comment: req.body.comment,
        });
        console.log("Comment has been edited!");
        res.redirect("/post/" + req.params.id);
    } catch (err) {
        console.log(err);
    }
    },
    deleteComment: async (req, res) => {
    try {
        await Comment.deleteOne({_id: req.params.commentid})
        console.log("Deleted Comment");
        res.redirect("/post/" + req.params.postid)
    } catch (err) {
        console.log(err);
    }
    }
};