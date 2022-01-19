import express from 'express';
var router = express.Router();

import auth from '../middleware/auth.js'

import {getPost, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';

router.get('/', auth, getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likepost', auth, likePost);

export default router;
