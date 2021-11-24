import React, { useEffect, useState } from 'react'
import { Button, FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { AppBar, Toolbar } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createSurvey } from '../store/actions/surveyActions'

const useStyles = makeStyles((theme) => {
    return {
        page: {
            padding: theme.spacing(2)
        },
        appbar: {
            flexGrow: 1
        },
        toolbar: theme.mixins.toolbar,
        paper: {
            padding: "10px",
            width: "1850px",
            background: "#e8f5e9",
            marginRight: "40px",
            marginBottom: "20px"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            width: 200
        },
    }
})

export const CreateForm = () => {
    const classes = useStyles()
    const [formName, setFormName] = useState("Untitled Survey")
    const [formDescription, setFormDescription] = useState("")
    const [choice, setChoice] = useState(false)
    const [choice1, setChoice1] = useState("")
    const [choice2, setChoice2] = useState("")
    const [choice3, setChoice3] = useState("")
    const [choice4, setChoice4] = useState("")
    const [question_name, setQuestion_name] = useState("")
    const [question_type, setQuestion_type] = useState("text")
    const [questions, setQuestions] = useState([])

    const navigate = useHistory()
    const dispatch = useDispatch()

    const addQuestion = () => {

        let choices = [choice1, choice2, choice3, choice4]
        const updatedQuestions = [...questions, { name: question_name, ch: choice, options: choices, type: question_type, answers: [] }]
        setQuestions(updatedQuestions)
    }

    useEffect(() => {
        if (formName === "") {
            setFormName("Untitled Survey")
        }
    }, [formName])

    const saveForm = async () => {
        let newSurvey = {
            survey_name: formName,
            survey_description: formDescription,
            questions: questions
        }
        console.log(newSurvey)
        // await axios.post('http://localhost:8000/survey_skeletons', newSurvey)
        dispatch(createSurvey(newSurvey, navigate))
    }

    return (
        <div className={classes.root}>
            <AppBar
                elevation={0}
                className={classes.appbar}
            >
                <Toolbar>
                    <Typography variant='h4' style={{ color: '#fafafa', flexGrow: 1 }}>
                        {formName}
                    </Typography>
                    <Button onClick={saveForm} variant='text' style={{ color: "#fafafa", marginRight: "20px" }}>
                        Save
                    </Button>
                    <Button variant='text' style={{ color: "#fafafa" }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <div className={classes.page}>
                <Grid
                    container
                    spacing={3}
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    style={{ minHeight: '50vh', marginTop: "40px" }}
                >
                    <Grid item lg={12}>
                        <Paper
                            color="primary"
                            style={{ marginBottom: "2px" }}
                            className={classes.paper}
                        >
                            <Grid>
                                <Grid item lg={12}>
                                    <TextField onChange={(e) => setFormName(e.target.value)} variant="outlined" label="Form Name" fullWidth style={{ marginBottom: "6px" }} />
                                    <TextField value={formDescription} onChange={(e) => setFormDescription(e.target.value)} variant="outlined" label="Form Description" fullWidth />
                                </Grid>


                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item lg={12}>
                        <Paper
                            color="primary"
                            className={classes.paper}
                        >
                            <Grid>
                                <Grid item lg={12}>
                                    <TextField id="question_name" value={question_name} onChange={(e) => setQuestion_name(e.target.value)} variant="outlined" label="QuestionName" fullWidth style={{ marginBottom: "6px" }} />
                                    <FormControl fullWidth className={classes.formControl}>
                                        <Select
                                            style={{ width: "100%" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={question_type}
                                            variant='outlined'
                                            fullWidth
                                            onChange={(e) => { if (e.target.value === "mulchoices") { setChoice(true) } else { setChoice("false") } return setQuestion_type(e.target.value) }}
                                        >
                                            <MenuItem value={"text"}>Text</MenuItem>
                                            <MenuItem value={"mulchoices"}>Multiple Choices</MenuItem>
                                            <MenuItem value={"date"}>Date</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {question_type === "mulchoices" ? <Grid container style={{ marginTop: "4px" }} spacing={2}>
                                        <Grid item spacing={3}><TextField variant='outlined' className={classes.textField} value={choice1} label="Enter option1" onChange={(e) => setChoice1(e.target.value)}></TextField></Grid>
                                        <Grid item spacing={3}><TextField variant='outlined' className={classes.textField} value={choice2} label="Enter option2" onChange={(e) => setChoice2(e.target.value)}></TextField></Grid>
                                        <Grid item spacing={3}><TextField variant='outlined' className={classes.textField} value={choice3} label="Enter option3" onChange={(e) => setChoice3(e.target.value)}></TextField></Grid>
                                        <Grid item spacing={3}><TextField variant='outlined' className={classes.textField} value={choice4} label="Enter option4" onChange={(e) => setChoice4(e.target.value)}></TextField></Grid>
                                    </Grid> : <div></div>}
                                </Grid>
                                <Button onClick={addQuestion} color='primary' variant='contained' style={{ marginTop: "6px" }}>Add Question</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Preview */}
                <div className={classes.page}>
                    <Grid
                        container
                        spacing={3}
                        direction='column'
                        style={{ minHeight: '50vh', marginTop: "4px" }}
                    >
                        <Grid item lg={12}><Typography variant='h3'>Preview</Typography></Grid>
                        { questions.length ? 
                            <Paper
                                className={classes.paper}
                            >
                                {
                                    questions.slice(0).map((question, index) => {
                                        return <Grid item lg={12} key={question.name}>
                                            <Grid>
                                                <Grid item lg={12}><Typography variant='h5'>{index + 1}.{question.name}</Typography></Grid>
                                                {question.type === "text" ? <Grid item lg={12}><TextField className={classes.textField} variant="standard" style={{ width: "200px" }}></TextField></Grid> : <div></div>}
                                                {question.type === "mulchoices" ? <FormControl component="fieldset">
                                                    <RadioGroup>
                                                        <FormControlLabel value={question.options[0]} control={<Radio />} label={question.options[0]} />
                                                        <FormControlLabel value={question.options[1]} control={<Radio />} label={question.options[1]} />
                                                        <FormControlLabel value={question.options[2]} control={<Radio />} label={question.options[2]} />
                                                        <FormControlLabel value={question.options[3]} control={<Radio />} label={question.options[3]} />
                                                    </RadioGroup>
                                                </FormControl> : <div></div>
                                                }
                                                {question.type === "date" ? <TextField
                                                    type="date"
                                                    fullWidth
                                                    defaultValue="2021-11-22"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} /> : <div></div>
                                                }
                                            </Grid>
                                        </Grid>
                                    })
                                }
                            </Paper> : <></>
                        }
                    </Grid>
                </div>
            </div>
        </div>
    )
}
