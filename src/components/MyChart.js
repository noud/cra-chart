import { cloneDeep, merge } from 'lodash';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

import { Doughnut, defaults } from 'react-chartjs-2';

import getRemainer from '../lib/getRemainer';
import setRemainer from '../lib/setRemainer';

const startData = [40, 45];

const labels = [
  'Noud',
  'Balder',
];

const free = {
  color: 'gray',
  label: 'free'
};

const getState = () => ({
  labels: [],
  datasets: [{
    data: [],
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
});

merge(defaults, {
  global: {
    animation: {
      // steps: 50,
      // easing: "easeOut",
      rotate: true,
      // scale: false
  },
  responsive: true,
  line: {
      borderColor: '#F85F73',
    },
  },
});

class MyChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    let initialState = getState();
    initialState.labels = labels;
    initialState.datasets[0].data = cloneDeep(startData);
    initialState.datasets[0].data.push(getRemainer(initialState.datasets[0].data));
    this.state = cloneDeep(this.enriche(initialState));
    this.prevState = cloneDeep(this.state);
  }

  handleChange(enriche, state, value) {
    let defaultState = enriche(state);
    if (this !== undefined) {
      defaultState.datasets[0].data[parseInt(value.name)] = parseInt(value.value); // <<<<
      defaultState.datasets[0].data = setRemainer(defaultState.datasets[0].data);
      this.setState(defaultState);
    }
  };

  componentDidMount() {
    // Chart.pluginService.register({
    //   afterDraw: function (chart, easing) {
    //     // Plugin code.
    //   }
    // });
    //   console.log(this.chartReference); // returns a Chart.js instance reference
    this.setState(this.state);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(this.state.datasets[0].data) !== JSON.stringify(this.prevState.datasets[0].data)) {
      this.setState(this.state);
      this.prevState = cloneDeep(this.state);
    }
  }

  enriche(state) {
    // @todo improve
    // return state
    var { datasets: values, labels } = state;
    console.log('enrich',labels,values)
    let currentState = getState();

    const enrichedLabels = labels.slice(0);
    if (free.label !== enrichedLabels[labels.length - 1]) {
      enrichedLabels.push(free.label);
    }  
    currentState.labels = enrichedLabels;

    currentState.datasets[0].data = cloneDeep(values[0].data);

    return currentState;
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

    // const options = { maintainAspectRatio: false };

    // @todo redraw
    // https://github.com/jerairrest/react-chartjs-2/issues/90

    return (
      <div>
      <Doughnut data={this.state} redraw />
      <br />
      <form>
        <Container>
          {labels.map((value, index) => (
            <Row key={index}>
              <Col sm={2}></Col>
              <Col sm={2}>{labels[index]}</Col>
              <Col sm={4}>
                <input name={index}
                  value={this.state.datasets[0].data[index]}
                  onChange={(e) => this.handleChange(this.enriche, this.state, e.target)}
                />
              </Col>
            </Row>
          ))}
        </Container>
      </form>
      </div>
    );
  }
}

export default MyChart;