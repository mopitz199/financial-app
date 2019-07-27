import React, {useState} from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import BaseChartCard from './base-chart-card';

export default function IDPVHouseChart(props){

  const [hideNorPoniente, setHideNorPoniente] = useState(false)
  const [hideNorOriente, setHideNorOriente] = useState(false)
  const [hideSur, setHideSur] = useState(false)

  function buildData(){
    var resp = []
    props.irpdData.forEach(element => {
      resp.push({
        'name': `${element['name'][0]}`.slice(-2),
        'nor_poniente': Number(element['data'][0].toFixed(2)),
        'nor_oriente': Number(element['data'][1].toFixed(2)),
        'sur': Number(element['data'][2].toFixed(2)),
      })
    })
    return resp
  }

  const legendData = [
    {'key': 'nor_poniente', 'color': 'blue', 'title': 'Nor Poniente'},
    {'key': 'nor_oriente', 'color': 'green', 'title': 'Nor Oriente'},
    {'key': 'sur', 'color': 'pink', 'title': 'Sur'},
  ]

  function onLegendClick(key){
    switch (key) {
      case legendData[0].key:
        setHideNorPoniente(!hideNorPoniente)
        break;
      case legendData[1].key:
        setHideNorOriente(!hideNorOriente)
        break;
      case legendData[2].key:
        setHideSur(!hideSur)
        break;
      default:
        break
    }
  }

  return(
    <BaseChartCard
      title="Indice Real Precio Viviendas (casas)"
      legendData={legendData}
      dataLength={props.irpdData.length}
      onLegendClick={onLegendClick}
    >
      <LineChart data={buildData()}>

        {!hideNorPoniente &&
          <Line
          type="monotone"
          name={legendData[0].title}
          dataKey={legendData[0].key}
          stroke={legendData[0].color}
          dot={false}/>
        }

        {!hideNorOriente &&
          <Line
          type="monotone"
          name={legendData[1].title}
          dataKey={legendData[1].key}
          stroke={legendData[1].color}
          dot={false}/>
        }
        
        {!hideSur &&
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