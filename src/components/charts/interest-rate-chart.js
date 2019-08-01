import React, {useState} from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import BaseChartCard from './base-chart-card';

export default function InterestRateChart(props){

  const [hideMortgageCreditInterestRate, setHideMortgageCreditInterestRate] = useState(false)
  const [hideConsumerCreditRate, setHideConsumerCreditRate] = useState(false)
  const [hideCommercialCreditRate, setHideCommercialCreditRate] = useState(false)
  
  function buildData(){
    var auxResp = {}
    props.mortgageInterestRateData.forEach(element => {
      const name = element['name']
      if(auxResp.hasOwnProperty(name)){
        auxResp[name]['mortgage_interest_rate'] = element['value']
      }else{
        auxResp[name] = {'mortgage_interest_rate': element['value']}
      } 
    })

    props.consumerCreditInterestRateData.forEach(element => {
      const name = element['name']
      if(auxResp.hasOwnProperty(name)){
        auxResp[name]['consumer_interest_rate'] = element['value']
      }else{
        auxResp[name] = {'consumer_interest_rate': element['value']}
      } 
    })

    props.commercialInterestRateData.forEach(element => {
      const name = element['name']
      if(auxResp.hasOwnProperty(name)){
        auxResp[name]['commercial_interest_rate'] = element['value']
      }else{
        auxResp[name] = {'commercial_interest_rate': element['value']}
      } 
    })

    let resp = []
    for (var name in auxResp) {
      if (auxResp.hasOwnProperty(name)) {
        let dataObject = auxResp[name]
        dataObject['name'] = name.split(".")[1].slice(-2)
        resp.push(dataObject)
      }
    }

    return resp
  }

  const legendData = [
    {'key': 'mortgage_interest_rate', 'color': 'red', 'title': 'Credito Hipotecario'},
    {'key': 'consumer_interest_rate', 'color': 'blue', 'title': 'Credito Consumo'},
    {'key': 'commercial_interest_rate', 'color': 'green', 'title': 'Credito Comercial'},
  ]

  function onLegendClick(key){
    switch (key) {
      case legendData[0].key:
        setHideMortgageCreditInterestRate(!hideMortgageCreditInterestRate)
        break;
      case legendData[1].key:
        setHideConsumerCreditRate(!hideConsumerCreditRate)
        break;
      case legendData[2].key:
        setHideCommercialCreditRate(!hideConsumerCreditRate)
        break;
      default:
        break
    }
  }

  return(
    <BaseChartCard
      title="Tasas de interes"
      legendData={legendData}
      dataLength={props.commercialInterestRateData.length}
      onLegendClick={onLegendClick}
    >
      <LineChart data={buildData()}>
        {!hideMortgageCreditInterestRate &&
          <Line
          type="monotone"
          name={legendData[0].title}
          dataKey={legendData[0].key}
          stroke={legendData[0].color}
          dot={false}/>
        }

        {!hideConsumerCreditRate &&
          <Line
          type="monotone"
          name={legendData[1].title}
          dataKey={legendData[1].key}
          stroke={legendData[1].color}
          dot={false}/>
        }

        {!hideCommercialCreditRate &&
          <Line
          type="monotone"
          name={legendData[2].title}
          dataKey={legendData[2].key}
          stroke={legendData[2].color}
          dot={false}/>
        }

        <XAxis dataKey="name" interval={11}/>
        <YAxis orientation="left"  type="number" domain={[0, 'dataMax']}/>
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart>
    </BaseChartCard>
  )
}