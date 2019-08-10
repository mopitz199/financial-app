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
    <Grid container>
      <ExplainedDialog
        toggleDialog={toggleDialog}
        openDialog={openDialog}
        title={"Explicación"}
      />
      <Grid container spacing={4} style={{padding: -theme.spacing(4)}}>
        <Grid item lg={3}>
          <SimulatorProfitabilityForm
            onHelpClick={toggleDialog}
            values={values}
            handleChange={handleChange}
          />
          {isValid() &&
            <Box mt={1} p={2} className={classes.resultBox}>
              <Typography>Su inmueble sera rentable al mes <span className={classes.importantText}>{monthOfBreakEven()}</span></Typography>
            </Box>
          }
        </Grid>
        <Grid item container lg={9}>
          <Grid container className={classes.chartContainerEmptyBox} style={{padding: theme.spacing(4)}}>
            {isValid() ? (
              <Box style={{height: '70%'}}>
                <ProfitabilityChart
                  pie={values.pie}
                  estateValue={values.estateValue}
                  rentValue={values.rentValue}
                  mortgageValue={values.mortgageValue}
                  yearsOfDebt={values.yearsOfDebt}
                  profitability={getAppartmentProfitability()/100}
                />
              </Box>
            ) : (
              <Grid container alignItems="center" justify="center" direction="column">
                <Typography style={{textAlign: 'center'}} variant="h4" color="textPrimary">
                  Una vez simulada la rentabilidad, se mostrara un grafico que indica cual es la rentabilidad del inbueble con el pasar de los años
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}