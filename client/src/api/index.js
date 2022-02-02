// use axios to make api calls (can also use fetch)
import axios from 'axios';

//const url = '/api/posts'; // recall that this url goes to our posts routes in backend

// use baseURL instead, change axios. to API. below
const API = axios.create({ baseURL: "https://localhost:5000/api" });

// intercept all below requests and populate req with token if logged in
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
})

// used with get, this returns all posts
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// Note that Axios automatically serializes object to JSON

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData); 