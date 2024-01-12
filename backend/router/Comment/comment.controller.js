const Comment = require('../../Model/comment.mongo')

async function postComment(req,res){
    const body = req.body;
    if(!body) res.status(400).json({message:'Bad Request'})
    try {
        const response = await Comment.create(body);

        res.status(200).json(response)
    } catch (error) {

        res.status(500).json({message:"Internal Server Error !!!"})
    }
}

async function getComment(req,res){
    try {
        const response = await Comment.find({},{__v:0})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:"Internal Server Error !!!"})
    }
}

async function getCommentByTodoId(req,res){
    const id = req.params.id

    try {
        const response = await Comment.find({todoId:id},{__v:0})
        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error !!!"})
    }
}


module.exports = {
    postComment,
    getComment,
    getCommentByTodoId
}