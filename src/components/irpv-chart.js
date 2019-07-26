import React, {useState} from 'react';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import BaseChartCard from './base-chart-card';

export default function IDPVChart(props){

  const [hideSantiagoCentro, setHideSantiagoCentro] = useState(false)
  const [hideNorPoniente, setHideNorPoniente] = useState(false)
  const [hideNorOriente, setHideNorOriente] = useState(false)
  const [hideSur, setHideSur] = useState(false)

  function buildData(){
    var resp = []
    props.irpdData.forEach(element => {
      resp.push({
        'name': `${element['name'][0]}`.slice(-2),
        'santiago_centro': Number(element['data'][3].toFixed(2)),
        'nor_poniente': Number(element['data'][4].toFixed(2)),
        'nor_oriente': Number(element['data'][5].toFixed(2)),
        'sur': Number(element['data'][6].toFixed(2)),
      })
    })
    return resp
  }

  function onLegendClick(data){
    switch (data.dataKey) {
      case 'santiago_centro':
        setHideSantiagoCentro(!hideSantiagoCentro)
        break;
      case 'nor_poniente':
        setHideNorPoniente(!hideNorPoniente)
        break;
      case 'nor_oriente':
        setHideNorOriente(!hideNorOriente)
        break;
      case 'sur':
        setHideSur(!hideSur)
        break;
      default:
        break
    }
  }

  return(
    <BaseChartCard title="Indice Real Precio Viviendas (departamentos)">
      <LineChart data={buildData()}>
        {!hideSantiagoCentro &&
          <Line
          name="Santiago Centro"
          type="monotone"
          dataKey="santiago_centro"
          stroke="#ff1100"
          dot={false}/>
        }

        {!hideNorPoniente &&
          <Line
          name="Nor Poniente"
          type="monotone"
          dataKey="nor_poniente"
          stroke="#22ff00" dot={false}/>
        }

        {!hideNorOriente &&
          <Line
          name="Nor Oriente"
          type="monotone"
          dataKey="nor_oriente"
          stroke="#0800ff" dot={false}/>
        }
        
        {!hideSur &&
          <Line
          name="Sur"
          type="monotone"
          dataKey="sur"
          stroke="#f200ff" dot={false}/>
        }

        <XAxis dataKey="name" interval={11}/>
        <YAxis orientation="left"  type="number" domain={[0, 'dataMax']}/>
        <Legend/>
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart>
    </BaseChartCard>
  )
}