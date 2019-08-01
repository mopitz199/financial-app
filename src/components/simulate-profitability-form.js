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

import {pofitabilityAfterYears} from '../utils';

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


export default function SimulatorProfitabilityForm(props){

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container>
      <Typography variant="h5">Simluador profitability</Typography>
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Pie(UF)"
        value={props.values.pie}
        onChange={props.handleChange('pie')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor departamento(UF)"
        value={props.values.estateValue}
        onChange={props.handleChange('estateValue')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor arriendo(UF)"
        value={props.values.valorArriendo}
        onChange={props.handleChange('valorArriendo')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor mortgageValue(UF)"
        value={props.values.valorDividendo}
        onChange={props.handleChange('valorDividendo')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Compra a cuantos años"
        value={props.values.compraAnios}
        onChange={props.handleChange('compraAnios')}
        margin="normal"
        variant="outlined"
      />
    </Grid>
  )
}