import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfitabilityChart from '../components/charts/profitability-chart';
import SimulatorProfitabilityForm from '../components/simulate-profitability-form';
import {getAppreciationRate, whenIsProfitable} from '../utils';

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


export default function ProfitabilitySimulation(props){

  const theme = useTheme();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    pie: '',
    estateValue: '',
    rentValue: '',
    mortgageValue: '',
    yearsOfDebt: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  function isValid(){
    return values.pie && values.mortgageValue && values.yearsOfDebt && values.estateValue && values.rentValue && props.irpdData
  }

  function cuandoVender(){
    let mes = whenIsProfitable(
      Number(values.pie),
      Number((getRentabilidad()/100)),
      Number(values.estateValue),
      Number(values.rentValue),
      Number(values.mortgageValue),
      Number(values.yearsOfDebt))
    return Number(mes)
  }

  function getRentabilidad(){
    let data = getAppreciationRate(props.irpdData)
    return data['dpto_general']
  }

  return (
    <Grid container justify="center">
      <Grid container spacing={3}>
        <Grid item lg={2}>
          <SimulatorProfitabilityForm
            values={values}
            handleChange={handleChange}
          />
          {isValid() &&
            <Box mt={1} p={2} className={classes.resultBox}>
              <Typography>Su inmueble sera rentable al mes <span className={classes.importantText}>{cuandoVender()}</span></Typography>
            </Box>
          }
        </Grid>
        <Grid item lg={10}>
          {isValid() ? (
            <ProfitabilityChart
              pie={values.pie}
              estateValue={values.estateValue}
              rentValue={values.rentValue}
              mortgageValue={values.mortgageValue}
              yearsOfDebt={values.yearsOfDebt}
              profitability={getRentabilidad()/100}
            />
          ) : (
            <Box p={2} className={classes.chartContainerEmptyBox}>
              <Grid container className={classes.chartEmptyBox} justify="center" alignItems="center">
                <Typography style={{textAlign: 'center'}}>
                  Una vez simulada la rentabilidad, se mostrara un grafico que indica cual es la rentabilidad del inbueble con el pasar de los años
                </Typography>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}