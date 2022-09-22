const User = require("../models/User");

module.exports = {

  getDash: async (req,res)=>{
    console.log(req.user)
    try{
      //const projects = await Project.find({userId:req.user.id}).sort({ status: 1, deadline: 1 } )
      res.render('dashboard.ejs')
      console.log("Welcome to the dashboard")
    }catch(err){
        console.log(err)
    }
  },
};