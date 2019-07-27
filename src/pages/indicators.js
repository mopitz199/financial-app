import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import DataCard1 from '../components/data-card-1';
import IDPVAppartmentChart from '../components/irpv-appartment-chart';
import IDPVHouseChart from '../components/irpv-house-chart';
import SuppyDemandChart from '../components/suppy-demand-chart';
import InterestRateChart from '../components/interest-rate-chart';

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function Indicators(){
  const theme = useTheme();
  const [irpdData, setIrpdData] = useState([])
  const [nationalOfferData, setNationalOfferData] = useState([])
  const [mortgageInterestRateData, setMortgageInterestRateData] = useState([])
  const [consumerCreditInterestRateData, setConsumerCreditInterestRateData] = useState([])
  const [commercialInterestRateData, setCommercialInterestRateData] = useState([])

  useEffect(() => {
    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/irpv-data')
      .then(data => data.json())
      .then((data) => setIrpdData(data));

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/national-offer')
      .then(data => data.json())
      .then((data) => setNationalOfferData(data));

    
    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/appartment-interest-rate')
      .then(data => data.json())
      .then((data) => setMortgageInterestRateData(data));

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/consumer-credit-interest-rate')
      .then(data => data.json())
      .then((data) => {
        setConsumerCreditInterestRateData(data)
      });

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/commercial-interest-rate')
      .then(data => data.json())
      .then((data) => setCommercialInterestRateData(data));
  }, [])

  function getAppreciationRate(){
    let resp = {
      'dpto_santiago_centro': 0,
      'dpto_nor_poniente': 0,
      'dpto_nor_oriente': 0,
      'dpto_sur': 0,
      'casa_nor_poniente': 0,
      'casa_nor_oriente': 0,
      'casa_sur': 0
    }
    let total_elements = 0
    irpdData.map((e, index) => {
      total_elements+=1
      resp['casa_nor_poniente'] += e.data[10]
      resp['casa_nor_oriente'] += e.data[11]
      resp['casa_sur'] += e.data[12]
      resp['dpto_santiago_centro'] += e.data[13]
      resp['dpto_nor_poniente'] += e.data[14]
      resp['dpto_nor_oriente'] += e.data[15]
      resp['dpto_sur'] += e.data[16]
    })

    for(let attrName in resp){
      if(resp.hasOwnProperty(attrName)){
        if(total_elements!==0){
          resp[attrName] = resp[attrName] / total_elements
        }else{
          resp[attrName] = '???'
        }
      }
    }

    if(total_elements!==0){
      resp['casa_general'] = (resp['casa_nor_poniente'] + resp['casa_nor_oriente'] + resp['casa_sur']) / 3
      resp['dpto_general'] = (resp['dpto_santiago_centro'] + resp['dpto_nor_oriente'] + resp['dpto_nor_oriente'] + resp['dpto_sur']) / 4
    }else{
      resp['casa_general'] = '???'
      resp['dpto_general'] = '???'
    }

    for(let attrName in resp){
      if(resp.hasOwnProperty(attrName)){
        if(total_elements!==0){
          resp[attrName] = Number(resp[attrName].toFixed(2))
          resp[attrName] = `${resp[attrName]}%`
        }else{
          resp[attrName] = '???'
        }
      }
    }

    return resp
  }

  const appreciationRateData = getAppreciationRate()

  return (
    <Grid container>
      <Grid container justify="space-between" spacing={4}>
        <Grid item lg={6} md={6} xs={12}>
          <DataCard1
            title="Tasa apreciacion promedio (departamento)"
            bigNumber={appreciationRateData['dpto_general']}
            otherItems={[
              {'title': 'Stgo Centro', 'value': appreciationRateData['dpto_santiago_centro']},
              {'title': 'Nor Poniente', 'value': appreciationRateData['dpto_nor_poniente']},
              {'title': 'Nor oriente', 'value': appreciationRateData['dpto_nor_oriente']},
              {'title': 'Sur', 'value': appreciationRateData['dpto_sur']},
            ]}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <DataCard1
            title="Tasa apreciacion promedio (casa)"
            bigNumber={appreciationRateData['casa_general']}
            otherItems={[
              {'title': 'Nor poniente', 'value': appreciationRateData['casa_nor_poniente']},
              {'title': 'Nor oriente', 'value': appreciationRateData['casa_nor_oriente']},
              {'title': 'Sur', 'value': appreciationRateData['casa_sur']},
            ]}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between" spacing={4} style={{marginTop: theme.spacing(2)}}>
        <Grid item lg={6} md={12} xs={12}>
          <IDPVAppartmentChart irpdData={irpdData}/>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <IDPVHouseChart irpdData={irpdData}/>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <SuppyDemandChart nationalOfferData={nationalOfferData}/>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <InterestRateChart
            mortgageInterestRateData={mortgageInterestRateData}
            consumerCreditInterestRateData={consumerCreditInterestRateData}
            commercialInterestRateData={commercialInterestRateData}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}