import { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../../actions/posts';

import useStyles from './styles';

const PostDetails = () => {

    // get states
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    console.log(posts);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postStyles = useStyles();
    const { id } = useParams();

    // fetch post from BE and put in redux instead
    // const [post] = useState(posts.find(p => p._id === id))

    // fetch the post to display
    useEffect(() => {
      dispatch(getPost(id));
    }, [id, dispatch])

    if (!post) {
      return <p>No post!</p>;
    }

    if (isLoading) {
        return (
        <Paper elevation={6} className={postStyles.loadingPaper}>
            <CircularProgress size="7em"/>
        </Paper>
        )
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={postStyles.card}>
        <div className={postStyles.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={postStyles.imageSection}>
          <img className={postStyles.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} size="7em"/>
        </div>
      </div>
      </Paper>
    );
};

export default PostDetails;
