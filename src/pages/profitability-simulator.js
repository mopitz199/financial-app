import React from 'react';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProfitabilityChart from '../components/charts/profitability-chart';
import SimulatorProfitabilityForm from '../components/profitability-simulator-form';
import {calculateFinalMortgage, getCurrentMortgageRate, getAppreciationRate, whenIsProfitable} from '../utils';
import { thisExpression } from '@babel/types';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

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
  },
  explaniationButton:{
    color: theme.palette.common.white,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.green[600],
    '&:hover': {
      backgroundColor: theme.palette.green[700],
    },
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

  function showDialog(){
    let style = {dialogPaper: {minHeight: '100vh', maxHeight: '100vh'}}
    return (
      <Dialog maxWidth={10} classes={{ paper: style}} onClose={toggleDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
        <DialogTitle id="simple-dialog-title">Explicación</DialogTitle>
        <DialogContent>
          <iframe width="800" height="450" src="https://www.youtube.com/embed/sTpvUc9U6f8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </DialogContent>
      </Dialog>
    )
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
    <Grid container justify="center">
      {showDialog()}
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
        <Grid item lg={10}>
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
      <Box mt={15}>
        <Grid container justify="center">
          <Button variant="contained" className={classes.explaniationButton} onClick={() => toggleDialog()}>
            Te explicamos como leer el grafico
          </Button>              
        </Grid>
      </Box>
    </Grid>
  )
}