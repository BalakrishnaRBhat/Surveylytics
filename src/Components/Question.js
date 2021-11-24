import { Card, CardActionArea, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import React from 'react'

export const Question = ({ques, classes}) => {
    return (
        <div>
            <Grid item lg={12} key={ques.name}>
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
            </Grid>
        </div>
    )
}
