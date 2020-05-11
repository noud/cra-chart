import React from 'react';

// eslint-disable-next-line
import Chart, { Doughnut } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import merge from 'lodash.merge';

import getRemainer from '../lib/getRemainer';

const free = {
  color: 'gray',
  label: 'free'
};

// Disable animating charts by default.
defaults.global.animation = false;

merge(defaults, {
  global: {
    animation: false,
    line: {
    borderColor: '#F85F73',
    },
  },
});

class MyChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  componentWillMount() {
    // Chart.pluginService.register({
    //   afterDraw: function (chart, easing) {
    //     // Plugin code.
    //   }
    // });
  }

  componentDidMount() {
    console.log(this.chartReference); // returns a Chart.js instance reference
  }

  render() {
    var { data: dataValues, labels } = this.props;
    dataValues.push(getRemainer(dataValues));
    labels.push(free.label);
    
    // const data = (canvas) => {
    //     const ctx = canvas.getContext("2d")
    //     const gradient = ctx.createLinearGradient(0,0,100,0);
    //     // ...
    //     return {
    //         // ...
    //         backgroundColor: gradient
    //         // ...
    //     }
    // }

    const data = {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        free.color
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        free.color
        ]
      }]
    };

    const options = { maintainAspectRatio: false };
      
    return (<Doughnut ref={this.chartReference} data={data} options={options} />)
  }
}

export default MyChart;
