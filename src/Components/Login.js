import React from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    field: {
        display: 'block',
        marginTop: 20,
        marginBottom: 20
    },
    button: {
        marginBottom: 10,
        color: "#fafafa"
    },
    container: {
        paddingTop: 40,
        paddingLeft: 40,
        paddingBottom: 40,
        paddingRight: 40,
        alignItems: 'center'
    },
    heading: {
        alignContent: 'center',
        fontWeight: "bold"
    }
}))

export const Login = () => {
    const navigate = useHistory()

    const login = () => {
        navigate.push('/dashboard')
    }

    const classes = useStyles()

    return (
        <div>
            <Paper elevation={3} className={classes.container} style={{background: "#e8f5e9"}}>
                <form noValidate className={classes.root}>
                    <Grid container
                        spacing={2}
                        direction='column'
                        alignItems='center'
                        justifyContent='center'

                    >
                        <Typography variant='h4' className={classes.heading}>Login</Typography>
                        <TextField fullWidth className={classes.field} label='Username' variant='outlined' />
                        <TextField fullWidth className={classes.field} label='Password' variant='outlined' />
                        <Button className={classes.button} color='primary' size='large' variant="contained" onClick={login}>Login</Button>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
