import { Button, Card, CardMedia, CardActions, CardContent, Typography, makeStyles } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react'
import { Link } from 'react-router-dom';
import Form from './../img/form.jpeg'
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


export const SurveyCard = ({ survey }) => {

    const classes = useStyles()

    const share = (id) => {
        alert(`Survey link: http://localhost:3000/response/${id}`)
    }



    return (
        <div>
            <Card variant='outlined' className={classes.root} style={{ background: "#e8f5e9" }}>
                <CardMedia
                    className={classes.media}
                    image={Form}
                    title="Survey Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {survey.survey_name}
                    </Typography>
                    <Typography gutterBottom variant='subtitle1' component='div'>{survey.survey_description}</Typography>
                </CardContent>
                <CardActions>
                    <Link style={{ textDecoration: 'none', color: 'unset' }} to={`/viewResponses/${survey.id}`}>
                        <Button variant='outlined' size="small" color="primary" startIcon={<ListIcon/>}>
                            Responses
                        </Button></Link>
                    <Button onClick={() => share(survey.id)} variant='outlined' size="small" color="primary" startIcon={<ShareIcon/>}>
                        Share
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
