import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import DataCard1 from '../components/data-card-1';
import IRPVChart from '../components/irpv-chart';

import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default function Indicators(){
  const theme = useTheme();
  const [irpdData, setIrpdData] = useState([])
  const [nationalOfferData, setNationalOfferData] = useState([])
  const [appartmentInterestRateData, setAppartmentInterestRateData] = useState([])
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
      .then((data) => setAppartmentInterestRateData(data));

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/consumer-credit-interest-rate')
      .then(data => data.json())
      .then((data) => {
        setConsumerCreditInterestRateData(data)
      });

    fetch('https://alf8ptidv9.execute-api.us-east-1.amazonaws.com/prod/commercial-interest-rate')
      .then(data => data.json())
      .then((data) => setCommercialInterestRateData(data));
  }, [])

  function buildData2(){
    var resp = []
    nationalOfferData.forEach(element => {
      resp.push({
        'name': `${element['name'][0]}`.slice(-2),
        'monthAppartments': Number(element['data'][2].toFixed(2)),
        'monthHouses': Number(element['data'][5].toFixed(2)),
      })
    })
    return resp
  }

  function buildData3(){
    var resp = []
    nationalOfferData.forEach(element => {
      resp.push({
        'name': `${element['name'][0]}`.slice(-2),
        'monthAppartments': Number(element['data'][2].toFixed(2)),
        'monthHouses': Number(element['data'][5].toFixed(2)),
      })
    })
    return resp
  }

  return (
    <Grid container>
      <Grid container justify="space-between" spacing={4}>
        <Grid item lg={4} md={6} xs={12}>
          <DataCard1
            title="Tasa apreciacion promedio (departamento)"
            bigNumber={4.56}
            otherItems={[
              {'title': 'Stgo Centro', 'value': 4.56},
              {'title': 'Stgo Centro', 'value': 4.56},
              {'title': 'Stgo Centro', 'value': 4.56},
              {'title': 'Stgo Centro', 'value': 4.56},
            ]}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <DataCard1
            title="Tasa apreciacion promedio (departamento)"
            bigNumber={4.56}
            otherItems={[
              {'title': 'Stgo Centro', 'value': 4.56},
              {'title': 'Stgo Centro', 'value': 4.56},
              {'title': 'Stgo Centro', 'value': "4.56%"},
            ]}
          />
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <DataCard1
            title="Tasa apreciacion promedio (departamento)"
            bigNumber={4.56}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between" spacing={4} style={{marginTop: theme.spacing(2)}}>
        <Grid item lg={6} md={12} xs={12}>
          <IRPVChart irpdData={irpdData}/>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Card style={{padding: theme.spacing(3)}}>
            <CardContent style={{padding: theme.spacing(0)}}>
              <Typography color="textSecondary" variant="h6" component="h2">
                Indice Oferta y Demanda
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={buildData2()}>
                  <Line name="Departamentos" type="monotone" dataKey="monthAppartments" stroke="#8884d8" dot={false}/>
                  <Line name="Casas" type="monotone" dataKey="monthHouses" stroke="#d96523" dot={false}/>
                  <XAxis dataKey="name" interval={11}/>
                  <YAxis type="number" domain={['dataMin', 'dataMax']}/>
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Card style={{padding: theme.spacing(3)}}>
            <CardContent style={{padding: theme.spacing(0)}}>
              <Typography color="textSecondary" variant="h6" component="h2">
                Tasa interes credito consumo
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={consumerCreditInterestRateData}>
                  <Line name="Credito consumo" type="monotone" dataKey="value" stroke="#8884d8" dot={false}/>
                  <XAxis dataKey="name" interval={11}/>
                  <YAxis type="number" domain={[0, 'dataMax']}/>
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Card style={{padding: theme.spacing(3)}}>
            <CardContent style={{padding: theme.spacing(0)}}>
              <Typography color="textSecondary" variant="h6" component="h2">
                Tasa interes credito hipotecario
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={appartmentInterestRateData}>
                  <Line name="Credito hipotecario" type="monotone" dataKey="value" stroke="#8884d8" dot={false}/>
                  <Tooltip />
                  <XAxis dataKey="name" interval={11}/>
                  <YAxis type="number" domain={[0, 'dataMax']}/>
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}