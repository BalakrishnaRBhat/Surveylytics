import React, { useEffect } from 'react'
import { AppBar, Button, Container } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { SurveyCard } from '../Components/SurveyCard'
import { getSurveys } from '../store/actions/surveyActions'

const useStyles = makeStyles(() => ({
    appbar: {
        flexGrow: 1
    },
    container: {
        marginTop: "40px"
    }

}))

export const Dashboard = () => {

    const navigate = useHistory()

    const create = () => {
        navigate.push('/create')
    }
    const logout = () => {
        navigate.push('/')
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
            <AppBar position='static' color='primary' style={{ color: "#fafafa" }}>
                <Toolbar>
                    <Typography className={classes.appbar} variant='h4'>
                        My Forms
                    </Typography>
                    <Button onClick={create} variant='text' style={{ color: "#fafafa", marginRight: "20px" }}>
                        Create
                    </Button>
                    <Button onClick={logout} variant='text' style={{ color: "#fafafa" }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
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
