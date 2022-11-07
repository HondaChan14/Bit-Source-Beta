const fetch = require("node-fetch");
const Commit = require("../models/Commited");

module.exports = {
  getDash: async (req, res) => {
    try {
      let repos = [];
      const starRepos = await fetch(
        `https://api.github.com/search/repositories?q=javascript+sort:stars`
      )
        .then((res) => res.json())
        .then((data) => {
          for (let i = 0; i <= 9; i++) {
            repos.push(data.items[i]);
          }
        });
      const commits = await Commit.find({ userId: req.user.id }).sort({
        title: 1,
      });

      res.render("dashboard.ejs", {
        user: req.user,
        commit: commits,
        repoList: repos,
      });
    } catch (err) {
      console.log(err);
    }
  },

  deleteCommited: async (req, res) => {
    try {
      const result = await Commit.findOneAndDelete({
        _id: req.body.idFromMainJs,
      });
      if (result === null)
        throw new Error(`Unable to find ObjectId ${req.body.idFromMainJs}`);
      console.log("Deleted Commit");
      res.json("Deleted Commit");
    } catch (err) {
      console.log(err);
    }
  },
};
