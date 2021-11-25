import React, { useEffect, useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Card, CardActionArea, CardContent, CardActions, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, TextField, CardHeader, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
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
    // const [choice1, setChoice1] = useState("")
    // const [choice2, setChoice2] = useState("")
    // const [choice3, setChoice3] = useState("")
    // const [choice4, setChoice4] = useState("")
    const [options, setOptions] = useState([])
    const [optionValue, setOptionValue] = useState([""])
    const [question_name, setQuestion_name] = useState("")
    const [question_type, setQuestion_type] = useState("")
    const [questions, setQuestions] = useState([])

    const navigate = useHistory()
    const dispatch = useDispatch()

    const handleOptionAdd = () => {
        if (optionValue.trim().length === 0) return;
        setOptionValue("")
        setOptions([...options, optionValue])

    }

    const handleOptionDelete = (op) => {
        setOptions(options.filter(option => option !== op))
    }

    const addQuestion = () => {

        // let choices = [choice1, choice2, choice3, choice4]
        const updatedQuestions = [...questions, { name: question_name, ch: choice, options: options, type: question_type, answers: [] }]
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
    const cancelForm = () => {
        navigate.push('/')
    }

    const handleDelete = (name) => {
        setQuestions(questions.filter(item => item.name !== name))
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

                    {questions.length > 0 ? <Button onClick={saveForm} variant='contained' color='secondary' style={{ color: "#111", marginRight: "20px" }}>
                        Save
                    </Button> : <></>}
                    <Button onClick={cancelForm} variant='contained' color='secondary' style={{ color: "#111" }}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>

            <div>
                <Grid
                    container
                    spacing={3}
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    style={{ marginTop: "60px" }}
                >
                    <Grid item lg={12}>
                        <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                            <CardActionArea>

                                <CardContent>
                                    <TextField onChange={(e) => setFormName(e.target.value)} variant="outlined" label="Enter Form Name" fullWidth style={{ marginBottom: "6px" }} />
                                    <TextField value={formDescription} onChange={(e) => setFormDescription(e.target.value)} variant="outlined" label="Enter Form Description" fullWidth />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    {/* Form display */}

                    <Grid
                        container
                        style={{ marginTop: "10px" }}
                        spacing={3}
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {
                            questions.map((ques, index) => (
                                <Grid item lg={12} key={index}>
                                    <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                        <CardHeader
                                            action={
                                                <IconButton onClick={() => handleDelete(ques.name)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {ques.name}
                                            </Typography>
                                            {ques.type === "text" ? <TextField variant="standard" fullWidth></TextField> : <></>}
                                            {ques.type === "mulchoices" ? <FormControl component="fieldset">
                                                <RadioGroup>
                                                    {/* <FormControlLabel value={ques.options[0]} control={<Radio />} label={ques.options[0]} />
                                                        <FormControlLabel value={ques.options[1]} control={<Radio />} label={ques.options[1]} />
                                                        <FormControlLabel value={ques.options[2]} control={<Radio />} label={ques.options[2]} />
                                                        <FormControlLabel value={ques.options[3]} control={<Radio />} label={ques.options[3]} /> */}
                                                    {
                                                        ques.options.map(option => (
                                                            <FormControlLabel value={option} control={<Radio />} label={option} />
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </FormControl> : <div></div>
                                            }
                                            {ques.type === "date" ? <TextField
                                                type="date"
                                                fullWidth
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} /> : <div></div>
                                            }
                                            {
                                                ques.type === "dropdown" ? <FormControl fullWidth>
                                                    <Select 
                                                    >
                                                        {
                                                            ques.options.map(option => (
                                                                <MenuItem fullWidth value={option}>{option}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl> : <></>
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>))
                        }

                    </Grid>


                    {/* Form display */}


                    <Grid item lg={12}>
                        <Grid>
                            <Grid item lg={12}>
                                <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                    <CardContent>
                                        <TextField id="question_name" value={question_name} onChange={(e) => setQuestion_name(e.target.value)} variant="outlined" label="QuestionName" fullWidth style={{ marginBottom: "6px" }} />
                                        <FormControl fullWidth>
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
                                                <MenuItem value={"dropdown"}>Dropdown</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {question_type === "mulchoices" || "dropdown" ? <Grid container style={{ marginTop: "4px" }} spacing={2}>
                                            <Grid item spacing={3}><TextField variant='outlined' className={classes.textField} value={optionValue} label="Enter option" onChange={(e) => setOptionValue(e.target.value)}></TextField></Grid>
                                            <Grid item spacing={3}><Button style={{ marginTop: "15px" }} variant='text' color='primary' onClick={handleOptionAdd}>Add option</Button></Grid>
                                            <Grid direction='column' container spacing={2}>{
                                                options.map(option => (
                                                    <Grid item style={{ marginLeft: "10px" }}><Button variant='text' onClick={() => handleOptionDelete(option)} endIcon={<DeleteIcon />}>{option}</Button></Grid>
                                                ))
                                            }</Grid>
                                        </Grid> : <div></div>}

                                    </CardContent>
                                    <CardActions>
                                        <Button startIcon={<AddCircleIcon />} onClick={addQuestion} color='primary' variant='contained' style={{ marginTop: "6px", color: "#fafafa" }}>Add Question</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12}>
                        <Typography variant='h4'>Live Preview</Typography>
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
                            questions.map((ques, index) => (
                                <Grid item lg={12} key={index}>
                                    <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {index + 1}. {ques.name}
                                            </Typography>
                                            {ques.type === "text" ? <TextField variant="standard" fullWidth></TextField> : <></>}
                                            {ques.type === "mulchoices" ? <FormControl component="fieldset">
                                                <RadioGroup>
                                                    {/* <FormControlLabel value={ques.options[0]} control={<Radio />} label={ques.options[0]} /> */}
                                                    {/* <FormControlLabel value={ques.options[1]} control={<Radio />} label={ques.options[1]} />
                                                        <FormControlLabel value={ques.options[2]} control={<Radio />} label={ques.options[2]} />
                                                        <FormControlLabel value={ques.options[3]} control={<Radio />} label={ques.options[3]} /> */}
                                                    {
                                                        ques.options.map(option => (
                                                            <FormControlLabel value={option} control={<Radio />} label={option} />
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </FormControl> : <div></div>
                                            }
                                            {ques.type === "date" ? <TextField
                                                type="date"
                                                fullWidth
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} /> : <div></div>
                                            }
                                            {
                                                ques.type === "dropdown" ? <FormControl fullWidth>
                                                    <Select
                                                    >
                                                        {
                                                            ques.options.map(option => (
                                                                <MenuItem value={option}>{option}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl> : <></>
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>))
                        }

                    </Grid>
                </Grid >

            </div >
        </div >
    )
}
