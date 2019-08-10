import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DividendWithInterestRateVariableChart from '../components/charts/dividend-with-interest-rate-variable-chart';
import SimulatorDividendForm from '../components/dividend-simulator-form';
import {calculateFinalMortgage, getCurrentMortgageRate} from '../utils';
import ExplainedDialog from '../components/explained-dialog';

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
    estateValue: '',
    mortgageCreditValue: '',
    debtYears: '',
  });

  const [openDialog, setOpenDialog] = React.useState(false)

  function toggleDialog(){
    setOpenDialog(!openDialog)
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  function isValid(){
    return values.estateValue && values.mortgageCreditValue && values.debtYears && props.mortgageInterestRateData.length > 0
  }

  function calculateDividend(){
    let dividend = calculateFinalMortgage(
      (getCurrentMortgageRate(props.mortgageInterestRateData)/100),
      values.debtYears,
      values.mortgageCreditValue,
      values.estateValue)
    return Number(dividend.toFixed(2))
  }

  return (
    <Grid container justify="center">
      <ExplainedDialog
        toggleDialog={toggleDialog}
        openDialog={openDialog}
        title={"Explicación"}
      />
      <Grid container spacing={3}>
        <Grid item lg={3}>
          <SimulatorDividendForm
            values={values}
            handleChange={handleChange}
            onHelpClick={toggleDialog}
          />
          {isValid() &&
            <Box mt={1} p={2} className={classes.resultBox}>
              <Typography>El valor de su mortgageValue mensual sera de <span className={classes.importantText}>{calculateDividend()} UF</span></Typography>
            </Box>
          }
        </Grid>
        <Grid item container lg={9}>
          <Grid container className={classes.chartContainerEmptyBox} style={{padding: theme.spacing(4)}}>
            {isValid() ? (
              <Box style={{height: '70%'}}>
                <DividendWithInterestRateVariableChart
                  estateValue={values.estateValue}
                  mortgageCreditValue={values.mortgageCreditValue}
                  debtYears={values.debtYears}
                  mortgageInterestRateData={props.mortgageInterestRateData}
                />
              </Box>
            ) : (
              <Grid container alignItems="center" justify="center" direction="column">
                <Typography style={{textAlign: 'center'}} variant="h4" color="textPrimary">
                  Una vez simulado el credito, aca mostraremos un grafico de como
                  influye el dividendo dependiendo de la tasa de interes de los bancos.
                  Importante destacar que esta simulacion es referencial.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}