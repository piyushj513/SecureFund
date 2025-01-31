import React, { Component } from 'react';
import factory from '../../contracts/factory';
import Project from '../../contracts/project';
import { Grid, GridColumn } from 'semantic-ui-react';
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, PolarArea, Line, Doughnut } from 'react-chartjs-2';
import Layout from '@/components/Layout';
var CryptoJS = require('crypto-js');
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);
class reportmain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      summary: null,
    };
  }
  static async getInitialProps() {
    const projects = await factory.methods.getDeployedProjects().call();
    return { projects };
  }
  async componentDidMount() {
    const c = Project(this.props.projects[0]);
    const summary = await Promise.all(
      this.props.projects.map((c, i) =>
        Project(this.props.projects[i]).methods.getDetails().call()
      )
    );
    this.setState({ summary });
  }
  render() {
    let summ;
    var fgen = 0;
    var tcnt = 0;
    var acnt = 0;
    var pcnt = 0;
    var tgt = 0;
    const items = this.props.projects.map((address, i) => {
      if (this.state.summary) summ = this.state.summary[i];
      else summ = { 0: 'null', 5: 'null', 7: 'null', 8: 'null' };
      for (var i = 0; i < 1; i++) {
        fgen += parseInt(summ[1] / 1000000000000000000);
        tcnt += parseInt(summ[2]);
        acnt += parseInt(summ[3]);
        tgt += parseInt(summ[8]);
        pcnt++;
      }
    });
    const data1 = {
      labels: [
        'Total Projects Created',
        'Total Contributors',
        'Total Funds Generated',
        'Total Transactions Made',
      ],
      datasets: [
        {
          label: '',
          data: [pcnt, acnt, fgen, tcnt],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
          ],
        },
      ],
    };
    const data2 = {
      labels: ['Funds Generated', 'Funds Requied'],
      datasets: [
        {
          label: '',
          data: [fgen, tgt],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4,
        },
      ],
    };
    const data3 = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Transactions Made',
          data: [0, 2, 1, 3, 2, 3, tcnt],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          hoverOffset: 4,
        },
      ],
    };
    var options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    return (
      <Layout>
        <h3 className="open-campaigns">App Statistics</h3>
        <Grid columns={2} padded>
          <GridColumn>
            <PolarArea data={data1} options={options} />
          </GridColumn>
          <GridColumn>
            <Doughnut data={data2} height={100} options={options} />
          </GridColumn>
          <Line data={data3} height={100} options={options} />
        </Grid>
      </Layout>
    );
  }
}

export default reportmain;
