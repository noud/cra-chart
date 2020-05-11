import React from 'react';

// eslint-disable-next-line
import Chart, { Doughnut } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import merge from 'lodash.merge';

const free = {
  color: 'gray',
  label: 'free'
};

merge(defaults, {
  global: {
    // Disable animating charts by default.
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
  
  componentDidMount() {
    // Chart.pluginService.register({
    //   afterDraw: function (chart, easing) {
    //     // Plugin code.
    //   }
    // });

    console.log(this.chartReference); // returns a Chart.js instance reference
  }

  render() {
    var { data: values, labels } = this.props;

    const enrichedLabels = labels.slice(0);
    if (free.label !== enrichedLabels[labels.length - 1]) {
      enrichedLabels.push(free.label);
    }

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
      labels: enrichedLabels,
      datasets: [{
        data: values,
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