import React, { useState } from 'react'
import { Avatar, Button, Typography, Container, Grid, Paper } from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import Input from './Input'
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as actions from '../../constants/actionTypes'
import { signup, signin } from '../../actions/auth'

const initialState = {
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const Auth = () => {

    const classes = useStyles()

    const [formData, setFormData] = useState(initialState)

    const history = useHistory()

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState()
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]:value })
    }

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type:actions.AUTH, data:{ result, token }})
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessfull. Try Again Later");
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId='187161626104-n5nnegb9u6mhthjalfh45brhbkat5lam.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                // disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant='contained'
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Dont have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
