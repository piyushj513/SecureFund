import React from 'react';
import { Grid, GridColumn} from 'semantic-ui-react';
import {Chart as ChartJS,BarElement, LinearScale, CategoryScale,ArcElement,Tooltip,Legend,PointElement,LineElement} from "chart.js";
import { Bar,Doughnut,Line } from 'react-chartjs-2';
import Layout from '@/components/Layout';
import fsPromises from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  return {
    props: objectData
  }
}
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
     Tooltip,
      Legend,
  );

export default function report(props) {
    const posts = props.posts;
    const labels =['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT','SUN'];
    const data1 = {
    labels: labels,
    datasets: [{
    label: 'Campaigns Created Daily',
    data: posts.map(post => post.id),
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
const data2 = {
  labels: labels,
  datasets: [{
  label: 'Funds Generated Daily',
  data: posts.map(post => post.funds),
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ],
  borderWidth: 1
}]
};
const data3 = {
  labels: labels,
  datasets: [{
  label: 'Payments Made Daily',
  data: posts.map(post => post.payments),
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ],
  hoverOffset: 4
}]
};
var options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  return (
    <Layout>
    <h3 className="open-campaigns">Weekly Statistics</h3>
    <Grid columns={2} padded>
    <GridColumn><Doughnut data={data3} radius={10} options={options}/>
      </GridColumn>
      <GridColumn><Line data={data2} height={100} width={200} options={options}/>
      <Bar data={data1} height={100} width={200} options={options} />
      </GridColumn>
    </Grid>
    </Layout>
  )
}
