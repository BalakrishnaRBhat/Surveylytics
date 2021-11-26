import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import grey from '@material-ui/core/colors/grey';
import { Card, CardActionArea, CardContent, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, TextField, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { AppBar, Toolbar } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useHistory } from 'react-router-dom'
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

export const Preview = () => {

    const classes = useStyles()

    const navigate = useHistory();
    const location = useLocation();

    const { formName, formDescription, questions } = location.state

    const handleGoBack = () => {
        navigate.push({
            pathname: '/create',
            state: { formName: formName, formDescription: formDescription, questions: questions }
        })
    }


    return (
        <div>
            <AppBar position='static' color='primary' style={{ color: "#fafafa" }}>
                <Toolbar>
                    <IconButton onClick={handleGoBack} edge='start' style={{ marginRight: "4px" }}>
                        <ArrowBackIcon fontSize='large' style={{ color: grey[50] }} />
                    </IconButton>
                    <Typography style={{ flexGrow: 1 }} variant='h4'>
                        {formName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid
                container
                style={{ marginTop: "10px" }}
                spacing={3}
                direction='column'
                alignItems='center'
                justifyContent='center'
            >
                <Grid item lg={12}
                >
                    <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Survey Name: {formName}
                                </Typography>
                                <Typography gutterBottom variant='h5' style={{ fontSize: "20px" }}>Survey Description: {formName}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
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
        </div>
    )
}
