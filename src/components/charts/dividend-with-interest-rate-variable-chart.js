import React, {useState} from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import BaseChartCard from './base-chart-card';

import {calculateFinalMortgage} from '../../utils';

export default function DividendWithInterestRateVariableChart(props){

  function buildData(){
    var resp = []
    props.mortgageInterestRateData.forEach(element => {
      resp.push({
        'name': `${element['name'].split(".")[1]}`.slice(-2),
        'mortgageValue': Number(calculateFinalMortgage(
          (element['value']/100),
          props.debtYears,
          props.mortgageCreditValue,
          props.estateValue).toFixed(2)),
        'tasa_interes': Number(element['value'])
      })
    })
    return resp
  }

  const legendData = [
    {'key': 'mortgageValue', 'color': 'red', 'title': 'Dividendo'},
    {'key': 'tasa_interes', 'color': 'green', 'title': 'Tasa interes'},
  ]

  return(
    <BaseChartCard
      title="Dividento por tasa de interes"
      legendData={legendData}
      dataLength={props.mortgageInterestRateData.length}
      onLegendClick={null}
    >
      <LineChart data={buildData()}>
        
        <Line
          type="monotone"
          name={legendData[0].title}
          dataKey={legendData[0].key}
          stroke={legendData[0].color}
          yAxisId="left"
          dot={false}/>

        <Line
          type="monotone"
          name={legendData[1].title}
          dataKey={legendData[1].key}
          stroke={legendData[1].color}
          yAxisId="right"
          dot={false}/>

        <XAxis dataKey="name" interval={11}/>

        <YAxis yAxisId="left" type="number" domain={['dataMin', 'dataMax']}/>
        <YAxis yAxisId="right" orientation="right" type="number" domain={['dataMin', 'dataMax']}/>
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart>
    </BaseChartCard>
  )
}