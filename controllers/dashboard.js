const User = require("../models/User");
const Commit = require("../models/Commited")

module.exports = {

  getDash: async (req,res) => {
    console.log(req.user)
    try{
      const commits = await Commit.find({userId:req.user.id}).sort({ title: 1 })
      res.render('dashboard.ejs', { user: req.user, commit: commits})
      console.log("Welcome to the dashboard")
    }catch(err){
        console.log(err)
    }
  },
  deleteCommited: async (req, res) => {
    try {
      await Commited.findByIdAndDelete({ id: req.body._id})
      console.log('Commit Deleted')
      res.json('Deleted Commit')
    }catch(error) {
      console.log(err)
    }
  },
  
};