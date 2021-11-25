import { AppBar, Card, CardActionArea, CardContent, Grid, IconButton, List, ListItem, Toolbar, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSurvey } from '../store/actions/surveyActions'
import * as xlsx from 'xlsx'
import ExportMenu from '../Components/ExportMenu';
import * as converter from 'json-2-csv'
import * as fs from 'fs'

class ViewResponses extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            survey_name: "",
            survey_description: "",
            questions: [],
            responses: [],
            export_data: []
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
        let answers = []
        let responses = []
        let dataArray = []
        let whole_data = []
        const res = await axios.get('http://localhost:8000/responses')
        whole_data = await res.data
        answers = whole_data.filter(res => res.survey_id === id)
        answers.forEach(ans => {
            responses.push(ans.response)
        })
        for (let data in responses) {
            dataArray.push(Object.values(responses[data]));
        }

        this.setState({
            responses: dataArray,
            export_data: responses
        })
    }

    backButton = () => {
        this.props.history.push('/')
    }

    to_excel = () => {
        console.log(this.state.export_data)
        const filename = `${this.state.survey_name}.xlsx`
        const ws = xlsx.utils.json_to_sheet(this.state.export_data)
        const wb = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(wb, ws, 'test')
        xlsx.writeFile(wb, filename)
    }
    
    to_csv = () => {
        const filename = `${this.state.survey_name}.csv`
        converter.json2csv(this.state.export_data, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFileSync(filename, csv)
            
        })
        alert("Exported Successfully")
    }

    render() {
            console.log(this.state.responses)
        return(
            <div>
                <AppBar position='static' color='primary' style={{ color: "#fafafa" }}>
                    <Toolbar>
                        <IconButton onClick={this.backButton} edge='start' style={{marginRight: "4px"}}>
                            <ArrowBackIcon fontSize='large' style={{ color: grey[50] }}/>
                        </IconButton>
                        <Typography style={{flexGrow: 1}} variant='h4'>
                            {this.state.survey_name}
                        </Typography>
                        <ExportMenu to_excel={this.to_excel} to_csv={this.to_csv}/>
                    </Toolbar>
                </AppBar>

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
                                                {i + 1}. {ques.name}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" component="h6">
                                                Responses:
                                            </Typography>
                                            <List>
                                                {
                                                    this.state.responses.map((res, j) => {
                                                        return <ListItem style={{ fontSize: "15px", background: "#EEEEEE" }} key={j}>{j+1}.  {res[i]}</ListItem>
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
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    survey: state.surveyReducer.survey
})


export default connect(mapStateToProps, { getSurvey })(ViewResponses)

