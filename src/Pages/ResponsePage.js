import { Button, Card, CardActionArea, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSurvey } from '../store/actions/surveyActions'

const useStyles = makeStyles((theme) => {
    return {
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: 200
        }
    }
})

export const ResponsePage = (props) => {

    const classes = useStyles()
    let { id } = useParams()
    
    const survey = useSelector((state) => state.surveyReducer.survey)
    const [answers, setAnswers] = useState([])
    const [questions, setQuestions] = useState(["", ""])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSurvey(id))
        setQuestions(survey.questions)
        setAnswers(survey.answers)

    }, [dispatch, id, survey.questions, survey.answers])

    const submitResponse = () => {
        console.log(answers)
    }

    return (
        <div>
            <Grid
                style={{ marginTop: "20px" }}
                container
                spacing={3}
                direction='column'
                alignItems='center'
                justifyContent='center'
            >

                <Grid item lg={12}
                >
                    <Card style={{ width: "1000px" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Survey Name: {survey.survey_name}
                                </Typography>
                                <Typography gutterBottom variant='h5' style={{ fontSize: "20px" }}>Survey Description {survey.survey_description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <Grid
                container
                style={{ marginTop: "10px" }}
                spacing={3}
                direction='column'
                alignItems='center'
                justifyContent='center'
            >
                {
                    questions.map((ques, index) => {
                        return  <Grid item lg={12} key={index}>
                            <Card style={{ width: "1000px" }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                         {ques.name}
                                        </Typography>
                                        {ques.type === "text" ? <TextField className={classes.textField} variant="standard" style={{ width: "200px" }}></TextField> : <></>}
                                        {ques.type === "mulchoices" ? <FormControl component="fieldset">
                                            <RadioGroup>
                                                <FormControlLabel value={ques.options[0]} control={<Radio />} label={ques.options[0]} />
                                                <FormControlLabel value={ques.options[1]} control={<Radio />} label={ques.options[1]} />
                                                <FormControlLabel value={ques.options[2]} control={<Radio />} label={ques.options[2]} />
                                                <FormControlLabel value={ques.options[3]} control={<Radio />} label={ques.options[3]} />
                                            </RadioGroup>
                                        </FormControl> : <div></div>
                                        }
                                        {ques.type === "date" ? <TextField
                                            type="date"
                                            fullWidth
                                            defaultValue="2021-11-22"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }} /> : <div></div>
                                        }
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>})
                }
                <Grid item lg={12}>
                    <Button onClick={submitResponse} variant='contained' color='primary'>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}
