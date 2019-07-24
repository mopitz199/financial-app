import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BarChartIcon from '@material-ui/icons/BarChart';

const useStyles = makeStyles({
  bigNumber:{
    marginBottom: '15px',
    marginTop: '15px'
  },
  smallNumber:{
    marginTop: '5px'
  },
  barCharIcon:{
    verticalAlign: 'bottom',
    color: 'green',
    fontSize: '1.5em',
    marginLeft: '5px'
  }
});

export default function DataCard1(props) {
  const classes = useStyles();
  const theme = useTheme();

  const otherItems = props.otherItems || []
  return (
    <Card style={{padding: theme.spacing(3), height: '100%'}}>
      <CardContent style={{padding: theme.spacing(0)}}>
        <Typography color="textSecondary" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.bigNumber}>
          {props.bigNumber}
          <BarChartIcon className={classes.barCharIcon}/>
        </Typography>
        <Grid container justify="space-between">
          {otherItems.map((item, index) => {
            return (
              <Grid item key={index}>
                <Typography variant="body2" component="p">
                  {item.title}
                </Typography>
                <Typography variant="h6" component="p" className={classes.smallNumber}>
                  {item.value}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}