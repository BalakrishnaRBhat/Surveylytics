import React, { useEffect } from 'react'
import { AppBar, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import { Toolbar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { SurveyCard } from '../Components/SurveyCard'
import { getSurveys } from '../store/actions/surveyActions'
import Blank from './../img/blankform.jpeg'

const useStyles = makeStyles(() => ({
    appbar: {
        flexGrow: 1
    },
    container: {
        marginTop: "40px"
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    }
}))

export const Dashboard = () => {

    const navigate = useHistory()

    const create = () => {
        navigate.push('/create')
    }


    const surveys = useSelector((state) => state.surveyReducer.surveys)
    const dispatch = useDispatch()
    const classes = useStyles()

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    useEffect(() => {
        dispatch(getSurveys())
    }, [dispatch])

    return (
        <div>
            <AppBar position='fixed' color='primary' style={{ color: "#fafafa" }}>
                <Toolbar>
                    <Typography className={classes.appbar} variant='h4'>
                        Survelytics
                    </Typography>
                    {/* <Button onClick={create} variant='contained' color='secondary' style={{ color: "#111", marginRight: "20px" }}>
                        Create
                    </Button> */}
                </Toolbar>
            </AppBar>
            <Grid
                style={{ marginTop: "60px" }}
                container
                spacing={3}
                alignItems='center'
                justifyContent='center'
            >
                <Grid item>
                    <Card variant='outlined' className={classes.root} style={{ background: "#e8f5e9" }}>
                        <CardActionArea onClick={create}>
                            <CardMedia
                                className={classes.media}
                                image={Blank}
                                title="Blank form"
                            />
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Button color='primary' startIcon={<CreateIcon/>} variant='text' size='large'>Create new Survey</Button>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>
            <Grid
                style={{ marginTop: "20px" }}
                container
                spacing={3}
                alignItems='center'
                justifyContent='center'
            >
                <Grid item >
                    <Typography variant='h3'>My Surveys</Typography>
                </Grid>

            </Grid>
            <Container className={classes.container}>
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {surveys.map(survey => (
                        <div key={survey.id}>
                            <SurveyCard survey={survey}></SurveyCard>
                        </div>
                    ))
                    }
                </Masonry>
            </Container>
        </div>
    )
}
