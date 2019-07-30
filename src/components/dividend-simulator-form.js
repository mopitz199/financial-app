import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {cuandoPuedoVender2} from '../utils';

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%'
  },
  greenText:{
    color: 'green'
  },
  redText:{
    color: 'red'
  },
  importantText:{
    fontSize: '1.1em',
    fontWeight: '600'
  }
}));


export default function SimulatorDividendForm(props){

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false)

  function modal(){
    return (
      <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title" style={{backgroundColor: theme.palette.primary.main, color: theme.palette.common.white}}>Resultado</DialogTitle>
        <DialogContent>
          <Box pb={5} pt={5}>
            <Grid container alignItems="center" justify="center">
              <DialogContentText>hola</DialogContentText>
            </Grid>
          </Box>
        </DialogContent>        
      </Dialog>
    )
  }

  return (
    <Grid container>
      {modal()}
      <Typography variant="h5">Simluador credito hipotecario</Typography>
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor departamento(Uf)"
        value={props.values.valorDepartamento}
        onChange={props.handleChange('valorDepartamento')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Monto credito(Uf)"
        value={props.values.montoCredito}
        onChange={props.handleChange('montoCredito')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Compra a cuantos años"
        value={props.values.anios}
        onChange={props.handleChange('anios')}
        margin="normal"
        variant="outlined"
      />
    </Grid>
  )
}