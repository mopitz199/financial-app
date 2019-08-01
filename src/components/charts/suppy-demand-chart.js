import React, {useState} from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import BaseChartCard from './base-chart-card';

export default function SuppyDemandChart(props){

  const [hideAppartments, setHideAppartments] = useState(false)
  const [hideHouses, setHideHouses] = useState(false)

  function buildData(){
    var resp = []
    props.nationalOfferData.forEach(element => {
      resp.push({
        'name': `${element['name'][0]}`.slice(-2),
        'month_appartments': Number(element['data'][2].toFixed(2)),
        'month_houses': Number(element['data'][5].toFixed(2)),
      })
    })
    return resp
  }

  const legendData = [
    {'key': 'month_appartments', 'color': 'blue', 'title': 'Departamentos'},
    {'key': 'month_houses', 'color': 'green', 'title': 'Casas'},
  ]

  function onLegendClick(key){
    switch (key) {
      case legendData[0].key:
        setHideAppartments(!hideAppartments)
        break;
      case legendData[1].key:
        setHideHouses(!hideHouses)
        break;
      default:
        break
    }
  }

  return(
    <BaseChartCard
      title="Indice oferta demanda"
      legendData={legendData}
      dataLength={props.nationalOfferData.length}
      onLegendClick={onLegendClick}
    >
      <LineChart data={buildData()}>

        {!hideAppartments &&
          <Line
          type="monotone"
          name={legendData[0].title}
          dataKey={legendData[0].key}
          stroke={legendData[0].color}
          dot={false}/>
        }

        {!hideHouses &&
          <Line
          type="monotone"
          name={legendData[1].title}
          dataKey={legendData[1].key}
          stroke={legendData[1].color}
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