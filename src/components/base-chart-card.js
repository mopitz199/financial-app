import React from 'react';

import Typography from '@material-ui/core/Typography';
import {useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import {ResponsiveContainer} from 'recharts';
import Grid from '@material-ui/core/Grid';

export default function BaseChartCard(props){
  const theme = useTheme();

  return(
    <Card style={{padding: theme.spacing(3)}}>
      <CardContent style={{padding: theme.spacing(0)}}>
        <Typography color="textSecondary" variant="h6" component="h2">
          {props.title}
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          {props.children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}