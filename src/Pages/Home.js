import React from 'react'
import { Grid } from '@material-ui/core'
import { Login } from '../Components/Login'
import { Navbar } from '../Components/Navbar'

export const Home = () => {
    return (
        <div>
            <Navbar/>
            <Grid 
                container
                spacing={0}
                direction=''
                alignItems='center'
                justifyContent='center'
                style={{ minHeight: '50vh'}}
            >
                <Grid item xs={3}>
                    <Login/>
                </Grid>
            </Grid>
        </div>
    )
}
