// put everything related to posts (i.e. cards) here
 import express from 'express'
 import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost, deleteComment } from '../controllers/posts.js'
 import auth from "../middleware/auth.js";
// note in NodeJS, need to include the file extension (in react (i.e. client folder) we don't)

// create router element
const router = express.Router();

// add routes
// path '/' is localhost:5000/api/posts as we have set in the mount in server side index.js
// declutter routes by extracting the middleware functions
router.get('/search', getPostsBySearch)
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
router.patch('/:id/deleteComment', auth, deleteComment);

export default router;