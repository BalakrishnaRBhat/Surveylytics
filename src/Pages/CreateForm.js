import React, { useEffect, useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Card, CardActionArea, CardContent, CardActions, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { AppBar, Toolbar } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createSurvey } from '../store/actions/surveyActions'
import { useLocation } from 'react-router-dom';

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

    const navigate = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    
    let preloadedState = location.state
    
    let preloadedName = preloadedState ? preloadedState.formName : "Untitled Survey"
    const [formName, setFormName] = useState(preloadedName)

    let preloadedDescription = preloadedState ? preloadedState.formDescription : ""
    
    const [formDescription, setFormDescription] = useState(preloadedDescription)
    const [choice, setChoice] = useState(false)
    const [options, setOptions] = useState([])
    const [optionValue, setOptionValue] = useState([""])
    const [question_name, setQuestion_name] = useState("")
    const [question_type, setQuestion_type] = useState("text")
    let preloadedQuestions = preloadedState ? preloadedState.questions : []
    const [questions, setQuestions] = useState(preloadedQuestions)

    

    const handleOptionAdd = () => {
        if (optionValue.trim().length === 0) return;
        setOptionValue("")
        setOptions([...options, optionValue])

    }

    const handleOptionDelete = (op) => {
        setOptions(options.filter(option => option !== op))
    }

    const addQuestion = () => {

        const updatedQuestions = [...questions, { name: question_name, ch: choice, options: options, type: question_type, answers: [] }]
        setQuestions(updatedQuestions)
    }

    const handlePreview = () => {
        navigate.push({
            pathname: '/preview',
            state: { formName: formName, formDescription: formDescription, questions: questions}
        })
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

                    {questions.length > 0 ? <Button onClick={handlePreview} variant='contained' color='secondary' style={{ color: "#111", marginRight: "20px" }}>
                        Preview
                    </Button> : <></>}
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
                                    <TextField onChange={(e) => setFormDescription(e.target.value)} variant="outlined" label="Enter Form Description" fullWidth />
                                </CardContent>
                            </CardActionArea>
                        </Card>
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
                                                {ques.name}
                                            </Typography>
                                            {ques.type === "text" ? <TextField variant="standard" fullWidth></TextField> : <></>}
                                            {ques.type === "mulchoices" ? <FormControl component="fieldset">
                                                <RadioGroup>
                                                    
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
                                        <CardActions>
                                            <Button variant='text' startIcon={<DeleteIcon/>} style={{color: "#d50000"}} onClick={() => handleDelete(ques.name)}>Delete</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>))
                        }

                    </Grid>

                    <Grid item lg={12}>
                        <Grid>
                            <Grid item lg={12}>
                                <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                    <CardContent>
                                        <TextField id="question_name" value={question_name} onChange={(e) => setQuestion_name(e.target.value)} variant="outlined" label="Enter Question" fullWidth style={{ marginBottom: "6px" }} />
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
                                        {question_type === "mulchoices" ? <Grid container style={{ marginTop: "4px" }} spacing={2}>
                                            <Grid item spacing={3}><TextField variant='outlined' className={classes.textField} value={optionValue} label="Enter option" onChange={(e) => setOptionValue(e.target.value)}></TextField></Grid>
                                            <Grid item spacing={3}><Button style={{ marginTop: "15px" }} variant='text' color='primary' onClick={handleOptionAdd}>Add option</Button></Grid>
                                            <Grid direction='column' container spacing={2}>{
                                                options.map(option => (
                                                    <Grid item style={{ marginLeft: "10px" }}><Button variant='text' onClick={() => handleOptionDelete(option)} endIcon={<DeleteIcon />}>{option}</Button></Grid>
                                                ))
                                            }</Grid>
                                        </Grid> : <div></div>}
                                        {question_type === "dropdown" ? <Grid container style={{ marginTop: "4px" }} spacing={2}>
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
                </Grid >
            </div >
        </div >
    )
}
