import { Card, CardActionArea, CardContent, Grid, List, ListItem, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSurvey } from '../store/actions/surveyActions'

class ViewResponses extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            survey_name: "",
            survey_description: "",
            questions: [],
            responses: []
        }
    }

    async componentWillReceiveProps(nextProps) {
        let response = []
        let responses = []
        const { id } = this.props.match.params
        const { survey_name, survey_description, questions } = nextProps.survey
        const res = await axios.get('http://localhost:8000/responses')
        responses = await res.data
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].survey_id === id.toString()) {
                response.push(responses[i])
            }
        }
        this.setState({
            id,
            survey_name,
            survey_description,
            questions
        })
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        this.props.getSurvey(id)
        let answers
        let responses = []
        let dataArray = []
        // let r = []
        let whole_data = []
        const res = await axios.get('http://localhost:8000/responses')
        whole_data = await res.data
        answers = whole_data.filter(res => res.survey_id === id)
        // answers = answers[0]
        // const responses = answers.response
        // var dataArray = [];
        // for (var data in responses) {
        //     dataArray.push(responses[data]);
        // }
        answers.forEach(ans => {
            responses.push(ans.response)
            // for (var data in res) {
            //     r.push(res[data])
            //     // responses.push(r)
            // }
            // console.log(responses)
        })
        for (let data in responses) {
            dataArray.push(Object.values(responses[data]));
            // for(var d in data) {
            //     dataArray.push(d)
            // }
        }

        this.setState({
            responses: dataArray
        })
    }

    render() {
        console.log(this.state.responses)
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
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Survey Name: {this.state.survey_name}
                                    </Typography>
                                    <Typography gutterBottom variant='h5' style={{ fontSize: "20px" }}>Survey Description: {this.state.survey_description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    style={{ marginTop: "20px" }}
                    container
                    spacing={3}
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                >
                    {
                        this.state.questions.map((ques, i) => {
                            return (<Grid item lg={12} key={i}
                            >
                                <Card style={{ width: "1000px", background: "#e8f5e9" }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h5">
                                                {i+1}. {ques.name}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h6">
                                                Responses:
                                            </Typography>
                                            <List>
                                                {
                                                    this.state.responses.map((res, j) => {
                                                        return <ListItem style={{fontSize: "15px", background: "#EEEEEE"}} key={j}>{res[i]}</ListItem>
                                                    })
                                                }
                                            </List>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.surveyReducer.survey
})


export default connect(mapStateToProps, { getSurvey })(ViewResponses)

