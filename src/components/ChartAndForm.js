import { cloneDeep, merge } from 'lodash';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap'

import { Doughnut, defaults } from 'react-chartjs-2';

import getRemainer from '../lib/getRemainer';
import setRemainer from '../lib/setRemainer';

const startData = [40, 45];

const free = {
  color: 'gray',
  label: 'free'
};

const labels = [
  'Noud',
  'Balder',
];

const colors = [
  'red',
  'blue',
  free.color
]

const total = {
  label: 'Total'
};

const getState = () => ({
  labels: [],
  datasets: [{
    // label: '# of Votes',
    data: [],
    tableData: [],
    backgroundColor: colors,
    hoverBackgroundColor: colors
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
    legend: {
      display: false,
      // positioin: 'right',
      labels: {
        fontColor: 'black',
      }
    }
  },
});

class ChartAndForm extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    let initialState = getState();
    initialState.labels = labels;
    initialState.datasets[0].data = cloneDeep(startData);
    initialState.datasets[0].data.push(getRemainer(initialState.datasets[0].data));
    initialState.datasets[0].tableData = cloneDeep(initialState.datasets[0].data);
    this.state = cloneDeep(this.enriche(initialState));
    this.prevState = cloneDeep(this.state);
  }

  handleChange(enriche, state, value) {
    let defaultState = enriche(state);
    if (this !== undefined) {
      defaultState.datasets[0].tableData[parseInt(value.name)] = parseInt(value.value); // <<<<
      defaultState.datasets[0].tableData = setRemainer(defaultState.datasets[0].tableData);
      defaultState.datasets[0].data = cloneDeep(defaultState.datasets[0].tableData);
      if (value.value > 100) {
        const othersData = cloneDeep(defaultState.datasets[0].data);
        othersData.splice(parseInt(value.name), 1);
        const others = othersData.reduce((accumulator, currentValue) => accumulator + currentValue);
        defaultState.datasets[0].data[parseInt(value.name)] = parseInt(100 - others); // <<<<
      }
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
    if (JSON.stringify(this.state.datasets[0].tableData) !== JSON.stringify(this.prevState.datasets[0].tableData)) {
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
    currentState.datasets[0].tableData = cloneDeep(values[0].tableData);

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

    total.value = this.state.datasets[0].tableData.reduce((accumulator, currentValue) => accumulator + currentValue);
    total.color = total.value > 100 ? 'text-danger' : null;

    return (
      <Container>
        <br />
        <Doughnut data={this.state} redraw />
        <br />
        <Container>
          <Col xs={{ span: 10, offset: 3 }}>
            <Form className="Form">
              {labels.map((value, index) => (
                <Form.Group as={Row} className="Form-Group-left" controlId={index}>
                  <Col xs={1}>
                    <Form.Label className={colors[index]} >{labels[index]}</Form.Label>
                  </Col>
                  <Col xs={{ span: 3, offset: 1 }}>
                    <Form.Control className="Form-Control-numeric"
                      name={index}
                      type="number"
                      min="0"
                      max="99"
                      value={this.state.datasets[0].tableData[index]}
                      onChange={(e) => this.handleChange(this.enriche, this.state, e.target)}
                    />
                  </Col>
                </Form.Group>
              ))}
              <Form.Group as={Row} className="Form-Group-left" controlId={labels.length+1}>
                <Col xs={1} sm={1} md={1}>
                  <Form.Label>{total.label}</Form.Label>
                </Col>
                <Col xs={{ span: 3, offset: 1 }}>
                  <Form.Control className={total.color + " Form-Control-numeric" }
                    name={"total"}
                    disabled
                    type="number"
                    value={total.value}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Container>
      </Container>
    );
  }
}

export default ChartAndForm;