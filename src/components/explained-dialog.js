import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));


export default function ExplainedDialog(props){
  const classes = useStyles();
  const theme = useTheme()

  let style = {dialogPaper: {minHeight: '100vh', maxHeight: '100vh'}}

  return (
    <Dialog fullWidth={true} maxWidth={"md"} onClose={props.toggleDialog} aria-labelledby="simple-dialog-title" open={props.openDialog}>
      <DialogTitle id="simple-dialog-title">
        <Typography>{props.title}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.toggleDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{padding: '0px 24px 18px 24px'}}>
        <iframe width="100%" height="450" src="https://www.youtube.com/embed/sTpvUc9U6f8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </DialogContent>
    </Dialog>
  )
}