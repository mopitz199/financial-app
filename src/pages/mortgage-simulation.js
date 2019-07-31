import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DividendWithInterestRateVariableChart from '../components/dividend-with-interest-rate-variable-chart';
import SimulatorDividendForm from '../components/dividend-simulator-form';
import {calculoDividendoFinal, getCurrentMortgageRate} from '../utils';

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
  },
  resultBox:{
    backgroundColor: "#3a8f3a",
    color: theme.palette.common.white,
    borderRadius: '5px'
  },
  chartContainerEmptyBox:{
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.grey[300],
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  chartEmptyBox:{
    height: '350px'
  }
}));


export default function MortgageSimulation(props){

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
  
  function isValid(){
    return values.valorDepartamento && values.montoCredito && values.anios && props.mortgageInterestRateData.length > 0
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
            handleChange={handleChange}
          />
          {isValid() &&
            <Box mt={1} p={2} className={classes.resultBox}>
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
            <Box p={2} className={classes.chartContainerEmptyBox}>
              <Grid container className={classes.chartEmptyBox} justify="center" alignItems="center">
                <Typography style={{textAlign: 'center'}}>
                  Una vez simulado el credito, aca mostraremos un grafico de como
                  influye el dividendo dependiendo de la tasa de interes de los bancos.
                  Importante destacar que esta simulacion es referencial.
                </Typography>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}