import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';


export const SurveyCard = ({ survey }) => {


    const share = (id) => {
        alert(`Survey link: http://localhost:3000/response/${id}`)
    }

    

    return (
        <div>
            <Card style={{ maxWidth: 800, background: "#e8f5e9" }}>
                <CardActionArea>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {survey.survey_name}
                        </Typography>
                        <Typography gutterBottom variant='subtitle1' component='div'>{survey.survey_description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Link style={{ textDecoration: 'none', color: 'unset' }} to={`/viewResponses/${survey.id}`}>
                            <Button variant='text' size="small" color="primary">
                                Responses
                            </Button></Link>
                        <Button onClick={() => share(survey.id)} variant='text' size="small" color="primary">
                            Share
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </div>
    )
}
