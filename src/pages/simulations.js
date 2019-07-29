import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SimulatorProfitabilityForm from '../components/simulador-rentabilidad-form';

import {getAppreciationRate} from '../utils';


export default function Simulations(props){

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

  function genericInterestRate(){
    let interestRates = getAppreciationRate(props.irpdData)
    return interestRates['dpto_general']
  }
  

  return (
    <Grid>
      <Grid item lg={2}>
        <SimulatorProfitabilityForm interestRate={genericInterestRate()}/>
      </Grid>
    </Grid>
  )
}