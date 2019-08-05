import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  explaniationButton:{
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.green[600],
    '&:hover': {
      backgroundColor: theme.palette.green[700],
    },
  },
}));


export default function ExplainedButton(props){
  const classes = useStyles();

  return (
    <Button variant="contained" className={classes.explaniationButton} onClick={props.onclick}>
      {props.title}
    </Button>
  )
}