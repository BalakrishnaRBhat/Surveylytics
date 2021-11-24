import React, { Component } from 'react'
import { Button, Card, CardActionArea, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { getSurvey } from '../store/actions/surveyActions'


class Responses extends Component {

    constructor(props) {
        super(props)

        this.state = {
            survey_name: "",
            survey_description: "",
            questions: [],
            answers: []
        }
    }
    componentWillReceiveProps(nextProps) {
        const { survey_name, survey_description, questions } = nextProps.survey
        this.setState({
            survey_name,
            survey_description,
            questions,
        
        })
    }

    handleChange = (e, index) => {
        this.setState({
        
        })
    }

    handleSubmit = () => {
        console.log(this.state.answers)
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
                        <Card style={{ width: "1000px" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Survey Name: {this.state.survey_name}
                                    </Typography>
                                    <Typography gutterBottom variant='h5' style={{ fontSize: "20px" }}>Survey Description {this.state.survey_description}</Typography>
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
                    this.state.questions.map((ques, index) => (
                        <Grid item lg={12}>
                            <Card style={{ width: "1000px" }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                         {ques.name}
                                        </Typography>
                                        {ques.type === "text" ? <TextField value={""} onChange={(e) => this.handleChange(e, index)} variant="standard" style={{ width: "200px" }}></TextField> : <></>}
                                        {ques.type === "mulchoices" ? <FormControl component="fieldset">
                                            <RadioGroup value={""} onChange={(e) => this.handleChange(e, index)}>
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
                                            value=""
                                            onChange={(e) => this.handleChange(e, index)}
                                            // className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }} /> : <div></div>
                                        }
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>))
                }
                <Grid item lg={12}>
                    <Button variant='contained' fullWidth color='primary'>Submit</Button>
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