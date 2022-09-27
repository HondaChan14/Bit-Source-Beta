const User = require("../models/User");
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
    //console.log(req.user)
    try{
      let obj = {}

    // List the top 100 JavaScript repos sorted by stars.
    let resp = await octokit.rest.search.repos({
        q: "language:javascript",
        order: "asc",
        per_page: 100,
    })

    // Iterate over each of the repos we received. We use a for loop here
    // instead of forEach because we still need to await inside.
    for (let i = 0; i < resp.data.items.length; i++) {

        // List all the open issues that are labeled with "good first issue".
        let issues = await octokit.rest.issues.listForRepo({
            owner: resp.data.items[i].owner.login,
            repo: resp.data.items[i].name,
            state: "open",
            labels: "good first issue",
            per_page: 100,
        })

        // Iterate over each of the issues we received (ignoring pull requests)
        // and print out its HTML URL. We use a for loop here instead of
        // forEach because we still need to await inside.
        for (let i = 0; i < issues.data.length; i++) {
            if ("pull_request" in issues.data[i]) {
                continue
            }
            
            obj[i] = {
            issueId : issues.data[i].id || "N/A",
            title : issues.data[i].title,
            creator : issues.data[i].user.login,
            htmlUrl : issues.data[i].html_url,
          }
          //console.log(obj)
            //console.log(issues.data[i].html_url)
            // obj[`${issues.data[i].id}`] = issues.data[i].id
            // obj[`${issues.data[i].title}`] = issues.data[i].title
            // obj[`${issues.data[i].labels}`] = issues.data[i].labels
            // obj[`${issues.data[i].login}`] = issues.data[i].login
            // obj[`${issues.data[i].html_url}`] = issues.data[i].html_url
        }
        
    }
    //console.log(Object.keys(obj).length)
    res.render('board.ejs', { user: req.user, obj: obj })
      console.log("Welcome to the Source Board")
    }catch(err){
        console.log(err)
    }
  },

}


