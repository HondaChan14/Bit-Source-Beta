const User = require("../models/User");
const Commited = require("../models/Commited")
const fetch = require("node-fetch")
// Using npm install node-fetch@2 as it supports require() older verisons use Import


;

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
  postCommited: async (req, res) => {
    try{
      await Commited.create({title: req.body.title, link: req.body.link, completed: false, userId: req.user.id})
      console.log('Commit has been added!')
      res.redirect('/board')
    }catch(err){
      console.log(err)
    }
  },

}


