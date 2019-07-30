import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SimulatorProfitabilityForm from '../components/simulador-rentabilidad-form';
import DividendWithInterestRateVariableChart from '../components/dividend-with-interest-rate-variable';
import SimulatorDividendForm from '../components/dividend-simulator-form';
import {getAppreciationRate, calculoDividendoFinal, getCurrentMortgageRate} from '../utils';

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


export default function Simulations(props){

  const theme = useTheme();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    valorDepartamento: '',
    montoCredito: '',
    anios: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onCalculate = () => {
    console.log(values.valorDepartamento)
    console.log(values.montoCredito)
    console.log(values.anios)
  }

  function genericInterestRate(){
    let interestRates = getAppreciationRate(props.irpdData)
    return interestRates['dpto_general']
  }
  
  function isValid(){
    return values.valorDepartamento && values.montoCredito && values.anios
  }

  function calculateDividend(){
    let dividend = calculoDividendoFinal(
      (getCurrentMortgageRate(props.mortgageInterestRateData)/100),
      values.anios,
      values.montoCredito,
      values.valorDepartamento)
    return Number(dividend.toFixed(2))
  }

  return (
    <Grid container justify="center">
      <Grid container spacing={3}>
        <Grid item lg={2}>
          <SimulatorDividendForm
            values={values}
            onCalculate={onCalculate}
            handleChange={handleChange}
          />
          {isValid() &&
            <Box mt={1} p={2} style={{backgroundColor: "#3a8f3a", color: theme.palette.common.white, borderRadius: '5px'}}>
              <Typography>El valor de su dividendo mensual sera de <span className={classes.importantText}>{calculateDividend()} UF</span></Typography>
            </Box>
          }
        </Grid>
        <Grid item lg={10}>
          {isValid() ? (
            <DividendWithInterestRateVariableChart
              valorDepartamento={values.valorDepartamento}
              montoCredito={values.montoCredito}
              anios={values.anios}
              mortgageInterestRateData={props.mortgageInterestRateData}
            />
          ) : (
            <Grid container style={{'height': '350px', backgroundColor: theme.palette.common.white, borderColor: theme.palette.grey[300], borderWidth: '1px', borderStyle: 'solid'}} justify="center" alignItems="center">
              <Typography>Una vez simulado el credito, aca mostraremos un grafico de como influye el dividendo dependiendo de la tasa de interes de los bancos.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}