import PostMessage from '../models/Post.js'
import mongoose from 'mongoose'

export const getPost = async (req, res) =>  {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) =>  {
    const post = req.body;
    const postMessage = new PostMessage( {...post, creator: req.userId });
    try {
        await postMessage.save();
        res.status(201).json(postMessage);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) =>  {
    const { id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {new:true})

    res.json(updatePost)
}

export const deletePost = async (req, res) =>  {
    const { id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');

    await PostMessage.findByIdAndRemove(_id)

    res.json({ message: 'Post delete successfully'});
}

export const likePost = async (req, res) => {
    const { id: _id} = req.params;
    if(!req.userId) return res.json({ message: 'Unauthenticated'});
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((_id) => _id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }
    else {
        post.likes = post.likes.filter((_id) => _id !== String(req.userId));
    }
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatePost);
}
