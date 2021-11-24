import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core'
import React from 'react'



export const SurveyCard = ({survey}) => {
    return (
        <div>
            <Card style={{ maxWidth: 800 , background: "#b9f6ca"}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Survey Name: {survey.survey_name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
