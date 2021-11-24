import React from 'react'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Typography } from '@material-ui/core'


export const Navbar = () => {
    return (
        <div>
            <AppBar position='static' color='primary' style={{color: "#fafafa"}}>
                <Toolbar>
                    <Typography variant='h4'>
                        Surveylytics
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
