import React from 'react';
// eslint-disable-next-line
import Chart, { Doughnut } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import merge from 'lodash.merge';

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
          labels: [
            'Red',
            'Green',
            'Yellow'
          ],
          datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          }]
        };

        const options = { maintainAspectRatio: false };
          
        return (<Doughnut ref={this.chartReference} data={data} options={options} />)
    }
}

export default MyChart;
