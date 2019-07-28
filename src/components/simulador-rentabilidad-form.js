import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import {cuandoPuedoVender2} from '../utils';

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%'
  }
}));


export default function SimulatorProfitabilityForm(){

  const classes = useStyles();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [values, setValues] = React.useState({
    pie: '',
    valorDepartamento: '',
    valorArriendo: '',
    valorDividendo: '',
    compraAnios: '',
    calcularAnios: '',
  });

  const [open, setOpen] = React.useState(false)
  const [calculate, setCalculate] = React.useState(false)

  function onCalculate(){
    let value = cuandoPuedoVender2(values.pie, values.valorDepartamento, values.valorArriendo, values.valorDividendo, values.compraAnios, values.calcularAnios)
    setCalculate(value)
    setOpen(true)
  }

  function modal(){
    return (
      <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        {calculate}
      </Dialog>
    )
  }

  return (
    <Grid container>
      {modal()}
      <Typography variant="h5">Simluador rentabilidad</Typography>
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Pie"
        value={values.pie}
        onChange={handleChange('pie')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor departamento"
        value={values.valorDepartamento}
        onChange={handleChange('valorDepartamento')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor arriendo"
        value={values.valorArriendo}
        onChange={handleChange('valorArriendo')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Valor dividendo"
        value={values.valorDividendo}
        onChange={handleChange('valorDividendo')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Compra a cuantos años"
        value={values.compraAnios}
        onChange={handleChange('compraAnios')}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-name"
        className={classes.fullWidth}
        label="Calcular en cuantos años"
        value={values.calcularAnios}
        onChange={handleChange('calcularAnios')}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.fullWidth}
        onClick={() => onCalculate()}
        >
        Calcular
      </Button>
    </Grid>
  )
}