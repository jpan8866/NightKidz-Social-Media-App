import useStyles from './styles'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { mergeClasses } from '@material-ui/styles';
import Input from './Input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../actions/types';

function Auth() {
    const authStyles = useStyles();

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        // toggle state of showPassword
        setShowPassword(!showPassword);
    };

    const switchMode = () => {
        setIsSignup(!isSignup);
        // reset show password
        handleShowPassword();
    };

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const googleSuccess = (res) => {
        // the response comes back with user details from google, which we can use to log the user in
        // use the optional chaining operator to get properties returned by login, return undefined if reference invalid
        // note that profileObj is itself an object named result
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            // dispatch the data to redux state manager so that we can obtain the information in other components e.g. Form
            dispatch({ type: AUTH, payload: { result, token } });
            // navigate back to home page after successfully logging in
            navigate('/');
        } catch (error) {
            console.log(error);
        }
        console.log(res);
    };

    const googleFailure = (error) => {
        console.log(error)
        console.log('Google sign in was unsuccessful. Try again.');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={authStyles.paper} elevation={3}>
                <Avatar className={authStyles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={authStyles.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && ( // ask for first and last name if signing up
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="Last Name" label="Last Name" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {/* If this is signing up, then we need a confirm password field */}
                    { isSignup && <Input name="confirmPassword" label="repeat Password" handleChange={handleChange} />}
                </Grid>
                <Button type="submit" fullwidth="true" variant="contained" color="primary" className={authStyles.submit}>
                    {isSignup ? "Sign Up" : "Log In"}
                </Button>
                <GoogleLogin
                    clientId="204745316346-dqj9d5f1rct95bgchn5i43vvo8gjhlk1.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button 
                            className={authStyles.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant="contained"
                        >
                        Google Log in
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
    )
}

export default Auth