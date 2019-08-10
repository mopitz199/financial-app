import React from 'react';

import Typography from '@material-ui/core/Typography';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import {ResponsiveContainer} from 'recharts';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dot from '../dot';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function BaseChartCard(props){
  const theme = useTheme();
  const classes = useStyles();

  function renderChart(){
    if(props.dataLength === null){
      return (
        <Grid container justify="center" alignItems="center" style={{'height': '100%'}}>
          <Typography>Error al cargar los datos</Typography>
        </Grid>
      )
    }else if(props.dataLength > 0){
      return (
        <ResponsiveContainer>
          {props.children}
        </ResponsiveContainer>
      )
    }else{
      return (
        <Grid container justify="center" alignItems="flex-start" style={{'height': '100%'}}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )
    }
  }

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

  return (
    <Grid container style={{height: '100%'}}>
      <Grid container justify="space-between" direction="column" style={{alignSelf: 'start'}}>
        <Typography color="textSecondary" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Box m={1}>
          <Grid container justify="center">
            {legendRender}
          </Grid>
        </Box>
      </Grid>
      <Grid container>
        {renderChart()}
      </Grid>
    </Grid>
  )
}