import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SimulatorProfitabilityForm from '../components/simulador-rentabilidad-form';


export default function Simulations(){

  const [values, setValues] = React.useState({
    pie: null,
    valorDepartamento: null,
    valorArriendo: null,
    valorDividendo: null,
    compraAnios: null,
    calcularAnios: null,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid>
      <Grid item lg={2}>
        <SimulatorProfitabilityForm />
      </Grid>
    </Grid>
  )
}