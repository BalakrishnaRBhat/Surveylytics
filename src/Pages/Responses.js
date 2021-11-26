import React, { Component } from 'react'
import { Button, Card, CardContent, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { getSurvey } from '../store/actions/surveyActions'
import axios from 'axios'


class Responses extends Component {

    constructor(props) {
        super(props)

        this.state = {
            survey_name: "",
            survey_description: "",
            questions: [],
            answers: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        const { survey_name, survey_description, questions } = nextProps.survey
        this.setState({
            survey_name,
            survey_description,
            questions
        })
    }

    handleChange = (e) => {
        this.setState({
            answers: { ...this.state.answers, [e.target.name]: e.target.value }
        })
    }

    handleSubmit = async () => {
        const { id } = this.props.match.params
        const newResponse = {
            survey_id: id,
            response: this.state.answers
        }
        await axios.post('http://localhost:8000/responses', newResponse)
        this.props.history.push('/submitted')
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.getSurvey(id)
    }


    render() {
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
                        <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Survey Name: {this.state.survey_name}
                                    </Typography>
                                    <Typography gutterBottom variant='h5' style={{ fontSize: "20px" }}>Survey Description: {this.state.survey_description}</Typography>
                                </CardContent>
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
                        this.state.questions.map((ques, index) => (
                            <Grid item lg={12} key={index}>
                                <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {ques.name}
                                            </Typography>
                                            {ques.type === "text" ? <TextField value={this.state.answers[`${ques.name}`]} name={ques.name} onChange={(e) => this.handleChange(e, index)} variant="standard" fullWidth></TextField> : <></>}
                                            {ques.type === "mulchoices" ? <FormControl component="fieldset">
                                                <RadioGroup value={this.state.answers[`${ques.name}`]} name={ques.name} onChange={(e) => this.handleChange(e, index)}>
                                                    {/* <FormControlLabel value={ques.options[0]} control={<Radio />} label={ques.options[0]} />
                                                <FormControlLabel value={ques.options[1]} control={<Radio />} label={ques.options[1]} />
                                                <FormControlLabel value={ques.options[2]} control={<Radio />} label={ques.options[2]} />
                                                <FormControlLabel value={ques.options[3]} control={<Radio />} label={ques.options[3]} /> */}
                                                    {
                                                        ques.options.map((option, index) => (
                                                            <div key={index}><FormControlLabel value={option} control={<Radio />} label={option} /></div>
                                                        ))
                                                    }
                                                </RadioGroup>
                                            </FormControl> : <div></div>
                                            }
                                            {ques.type === "date" ? <TextField
                                                name={ques.name}
                                                type="date"
                                                fullWidth
                                                value={this.state.answers[`${ques.name}`]}
                                                onChange={(e) => this.handleChange(e, index)}
                                                // className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }} /> : <div></div>
                                            }
                                            {
                                                ques.type === "dropdown" ? <FormControl fullWidth>
                                                    <Select
                                                        name={ques.name}
                                                        value={this.state.answers[`${ques.name}`]}
                                                        onChange={(e) => this.handleChange(e, index)}
                                                    >
                                                        {
                                                            ques.options.map((option, index) => (
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
                    <Grid item lg={12}>
                        <Button variant='contained' onClick={this.handleSubmit} style={{ color: "white" }} size='large' color='primary'>Submit</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.surveyReducer.survey
})



export default connect(mapStateToProps, { getSurvey })(Responses)
