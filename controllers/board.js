const User = require("../models/User");
const fetch = require("node-fetch")
// Using npm install node-fetch@2 as it supports require() older verisons use Import
const { Octokit, App } = require("octokit");
require('dotenv').config({path: './config/.env'})

// Get the GitHub token from the GITHUB_TOKEN environment variable.
const githubToken = process.env.GITHUB_TOKEN
if(!githubToken) {
  throw new Error("Error")
}

// Create a new octokit API client.
const octokit = new Octokit({
    auth: githubToken,
});

module.exports = {

  getBoard: async (req,res)=>{
     try{
       const info = await fetch(
        `https://api.github.com/search/issues?q=javascript+label:"good+first+issue"+is:"open"no:assignee&per_page=100`
      )
      .then((response) => response.json())
      .then((data) => {
          const issues = data.items.filter(e => !e["pull_request"])
          const recentIssues = issues.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
          const filter = recentIssues.filter(e => e["assignee"] === null)
          res.render('board.ejs', { user: req.user, data: filter})
          //console.log(data)
      console.log("Welcome to the Source Board")
      })
    
    }catch(err){
        console.log(err)
    }
  },

}


