import React from 'react';

import Typography from '@material-ui/core/Typography';
import {useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import {ResponsiveContainer} from 'recharts';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dot from './dot';


export default function BaseChartCard(props){
  const theme = useTheme();

  const legendRender = props.legendData.map((data, index) => {
    return (
      <Grid
        item
        key={index}
        style={{'cursor': 'pointer', 'marginRight': '15px'}}
        onClick={() => props.onLegendClick(data.key)}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography key={index} style={{'marginRight': '5px'}}>
            {data.title}
          </Typography>
          <Dot size={10} color={data.color}/>
        </Grid>
      </Grid>
    )
  })

  return(
    <Card style={{padding: theme.spacing(3)}}>
      <CardContent style={{padding: theme.spacing(0)}}>
        <Grid container justify="space-between" direction="column">
          <Typography color="textSecondary" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Box m={1}>
            <Grid container justify="center">
              {legendRender}
            </Grid>
          </Box>
        </Grid>
        <ResponsiveContainer width="100%" height={350}>
          {props.children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}