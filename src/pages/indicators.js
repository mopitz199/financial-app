import React from 'react';

import Grid from '@material-ui/core/Grid';

import DataCard1 from '../components/data-card-1';

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

  return (
    <Grid container>
      <Grid container justify="space-between" spacing={4}>
        <Grid item lg={4}>
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
        <Grid item lg={4}>
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
        <Grid item lg={4}>
          <DataCard1
            title="Tasa apreciacion promedio (departamento)"
            bigNumber={4.56}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between" spacing={4} style={{marginTop: theme.spacing(2)}}>
        <Grid item lg={6}>
          <Card style={{padding: theme.spacing(3)}}>
            <CardContent style={{padding: theme.spacing(0)}}>
              <Typography color="textSecondary" variant="h6" component="h2">
                Indice Real Precio Viviendas
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  height={300}
                  data={data}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card style={{padding: theme.spacing(3)}}>
            <CardContent style={{padding: theme.spacing(0)}}>
              <Typography color="textSecondary" variant="h6" component="h2">
                Indice Oferta y Demanda
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  height={300}
                  data={data}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line name="pv of pages" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line name="uv of pages" type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}