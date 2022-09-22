const Post = require('../models/Post')

module.exports = {
    getPosts: async (req,res)=>{
        console.log(req.user)
        try{
            const postItems = await Post.find({userId:req.user.id})
            res.render('post.ejs', {posts: postItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createPost: async (req, res)=>{
        try{
            await Post.create({post: req.body.postItem, completed: false, userId: req.user.id})
            console.log('Post has been added!')
            res.redirect('/posts')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Post.findOneAndUpdate({_id:req.body.postId},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Post.findOneAndUpdate({_id:req.body.postId},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async (req, res)=>{
        console.log(req.body.postId)
        try{
            await Post.findOneAndDelete({_id:req.body.postId})
            console.log('Deleted Post')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    