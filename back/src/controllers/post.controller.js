import { Post } from "../moduls/post.module.js";

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;
        if(!name || !description || !age) res.status(400).json({message:
             "Please provide all the required fields."});
        
        const post = await Post.create({
            name,
            description,
            age
        });
        res.status(201).json({
            message: "Post created successfully.",
            post
        })
        
    }catch(err) {
        return res.status(500).json({ message: `Internal server error: ${err.message}` })
    }
}

const getPosts = async (_, res) => {
    try {
        const posts = await Post.find();
        if(!posts) res.status(400).json({message: "Posts not found."});
        res.status(200).json({
            message: "Posts retrieved successfully.",
            posts
        })
    }catch(err){
        return res.status(500).json({ message: `Internal server error: ${err.message}` })
    }
}
const updatePost = async (req, res) => {
    try {
        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({message: "Please provide all the required fields."});
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
            {returnDocument: "after" });
        if(!post) return res.status(404).json({message: "Post not found."});
        res.status(200).json({
            message: "Post updated successfully.",
            post
        });
    } catch(err) {
        return res.status(500).json({ message: `Internal server error: ${err.message}` })
    }
}

const getPost = async (req, res) => {
    try {
        const {id } = req.params;
        if(!id) res.status(400).json({message: "Post not found."});
        const post = await Post.findById(id);
        if(!post) res.status(400).json({message: "Post not found."});
        res.status(200).json({
            message: "Post retrieved successfully.",
            post
        })
    }catch(err){
        return res.status(500).json({ message: `Internal server error: ${err.message}` })
    }
}

const deletePost = async (req, res) => {
    try {
        const deleted =  await Post.findByIdAndDelete(req.params.id);
        if(!deleted) res.status(404).json({message: "Post not found."});
        res.status(204).json({
            message: "Post deleted successfully."
        })
    }catch(err){
        return res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    getPost,
    deletePost
};