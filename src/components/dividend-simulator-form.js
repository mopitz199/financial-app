import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

  return (
    <Grid container>
      <Typography variant="h5">Simluador credito hipotecario</Typography>
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
        label="Monto credito(UF)"
        value={props.values.mortgageCreditValue}
        onChange={props.handleChange('mortgageCreditValue')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Compra a cuantos años"
        value={props.values.debtYears}
        onChange={props.handleChange('debtYears')}
        margin="normal"
        variant="outlined"
      />
    </Grid>
  )
}