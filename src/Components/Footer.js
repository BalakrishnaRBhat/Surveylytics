import { Typography } from '@material-ui/core';
import React from 'react';
import '../App.css';

export default function Footer(){
    return (
        <div className="footer">
            <div className="footer_center">
                <Typography style={{  paddingTop:"14px", color: "#fafafa", fontWeight: "200"}} variant='h6' component='h6'> © {new Date().getFullYear()} Surveylytics.</Typography>
            </div>

        </div>
    )
}