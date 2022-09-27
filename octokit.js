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

// I needed some async function because I want to await inside.
getData: async (req, res) => {

    let obj = {}

    // List the top 100 JavaScript repos sorted by stars.
    let resp = await octokit.rest.search.repos({
        q: "language:javascript",
        order: "asc",
        per_page: 10,
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
            per_page: 10,
        })

        // Iterate over each of the issues we received (ignoring pull requests)
        // and print out its HTML URL. We use a for loop here instead of
        // forEach because we still need to await inside.
        for (let i = 0; i < issues.data.length; i++) {
            if ("pull_request" in issues.data[i]) {
                continue
            }
            //console.log(issues.data[i].html_url)

            obj[`${resp.data.items[i].name}-${resp.data.items[i].number}`] = issues.data.items[i]

        }
        console.log(obj)
    }
    res.render('board.ejs', { issue : obj })
}

}
