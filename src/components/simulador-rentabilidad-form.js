import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  }
}));


export default function SimulatorProfitabilityForm(props){

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
  const [calculate, setCalculate] = React.useState(0)

  function onCalculate(){
    let value = cuandoPuedoVender2(
      parseFloat(values.pie),
      parseFloat(props.interestRate/100),
      parseFloat(values.valorDepartamento),
      parseFloat(values.valorArriendo),
      parseFloat(values.valorDividendo),
      parseFloat(values.compraAnios),
      parseFloat(values.calcularAnios))

    setCalculate(value)
    setOpen(true)
  }

  function modal(){
    return (
      <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Resultado</DialogTitle>
        <DialogContent>
          <Grid container alignItems="center" justify="center">
            {calculate < 0 ? (
              <DialogContentText>
                Al cabo de {values.calcularAnios} años tendras una
                <span className={classes.redText}> deuda </span>
                de {Math.abs(parseInt(calculate))}
              </DialogContentText>
            ): (
              <DialogContentText>
                Al cabo de {values.calcularAnios} años tendras una
                <span className={classes.greenText}> ganancia </span>
                de {Math.abs(parseInt(calculate))}
              </DialogContentText>
            )}
          </Grid>
        </DialogContent>        
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