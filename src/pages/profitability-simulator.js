import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfitabilityChart from '../components/charts/profitability-chart';
import SimulatorProfitabilityForm from '../components/profitability-simulator-form';
import {getAppreciationRate, whenIsProfitable} from '../utils';

import ExplainedDialog from '../components/explained-dialog';
import ExplainedButton from '../components/explained-button';

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
    backgroundColor: theme.palette.green[600],
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
  
  const classes = useStyles();
  const theme = useTheme()
  debugger
  const [values, setValues] = React.useState({
    pie: '',
    estateValue: '',
    rentValue: '',
    mortgageValue: '',
    yearsOfDebt: '',
  });

  const [openDialog, setOpenDialog] = React.useState(false)

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  function isValid(){
    return values.pie && values.mortgageValue && values.yearsOfDebt && values.estateValue && values.rentValue && props.irpdData
  }

  function toggleDialog(){
    setOpenDialog(!openDialog)
  }

  function monthOfBreakEven(){
    let month = whenIsProfitable(
      Number(values.pie),
      Number((getAppartmentProfitability()/100)),
      Number(values.estateValue),
      Number(values.rentValue),
      Number(values.mortgageValue),
      Number(values.yearsOfDebt))
    return Number(month)
  }

  function getAppartmentProfitability(){
    let data = getAppreciationRate(props.irpdData)
    return data['dpto_general']
  }

  return (
    <Grid item direction="column" justify="center">
      <ExplainedDialog
        toggleDialog={toggleDialog}
        openDialog={openDialog}
        title={"Explicación"}
      />
      <Grid container spacing={3}>
        <Grid item lg={2}>
          <SimulatorProfitabilityForm
            values={values}
            handleChange={handleChange}
          />
          {isValid() &&
            <Box mt={1} p={2} className={classes.resultBox}>
              <Typography>Su inmueble sera rentable al mes <span className={classes.importantText}>{monthOfBreakEven()}</span></Typography>
            </Box>
          }
        </Grid>
        <Grid item lg={10} style={{minHeight: '90vh'}} className={classes.chartContainerEmptyBox}>
          <Grid>
            {isValid() ? (
              <ProfitabilityChart
                pie={values.pie}
                estateValue={values.estateValue}
                rentValue={values.rentValue}
                mortgageValue={values.mortgageValue}
                yearsOfDebt={values.yearsOfDebt}
                profitability={getAppartmentProfitability()/100}
              />
            ) : (
              <Box p={2} >
                <Grid container className={classes.chartEmptyBox} justify="center" alignItems="center">
                  <Typography style={{textAlign: 'center'}} variant="h4" color="textPrimary">
                    Una vez simulada la rentabilidad, se mostrara un grafico que indica cual es la rentabilidad del inbueble con el pasar de los años
                  </Typography>
                </Grid>
              </Box>
            )}
          </Grid>
          <Grid container justify="center">
            <ExplainedButton onclick={toggleDialog} title={"Te explicamos como leer el grafico"}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}