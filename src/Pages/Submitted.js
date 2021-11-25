import React from 'react'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core'


export const Submitted = () => {
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
                                        Thank you for filling the survey. Your responses are saved successfully.
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="div">
                                        Survelytics 
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
        </div>
    )
}
