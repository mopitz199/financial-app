import React, {useState} from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import BaseChartCard from './base-chart-card';

import {earningsAfterYears, toMoney} from '../../utils';

export default function ProfitabilityChart(props){

  function buildData(){
    var resp = []
    for(let year=1; year<=props.yearsOfDebt; year++){
      let result = earningsAfterYears(
        Number(props.pie),
        Number(props.profitability),
        Number(props.estateValue),
        Number(props.rentValue),
        Number(props.mortgageValue),
        Number(props.yearsOfDebt),
        year)

      resp.push({
        'name': `${year}`,
        'debt': result['debt'],
        'active': result['active'],
        'earning': result['earning']
      })
    }
    return resp
  }

  const legendData = [
    {'key': 'debt', 'color': 'red', 'title': 'Deuda'},
    {'key': 'active', 'color': 'blue', 'title': 'Activo'},
    {'key': 'earning', 'color': 'green', 'title': 'Ganancia'}
  ]

  return(
    <BaseChartCard
      title="Rentabilidad"
      legendData={legendData}
      dataLength={1}
      onLegendClick={null}
    >
      <LineChart data={buildData()}>
        
        <Line
          type="monotone"
          name={legendData[0].title}
          dataKey={legendData[0].key}
          stroke={legendData[0].color}
          dot={false}/>

        <Line
          type="monotone"
          name={legendData[1].title}
          dataKey={legendData[1].key}
          stroke={legendData[1].color}
          dot={false}/>

        <Line
          type="monotone"
          name={legendData[2].title}
          dataKey={legendData[2].key}
          stroke={legendData[2].color}
          dot={false}/>

        <XAxis dataKey="name"/>

        <YAxis type="number" domain={['dataMin', 'dataMax']}/>
        <Tooltip formatter={(value, name, props) => toMoney(value)}/>
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart>
    </BaseChartCard>
  )
}