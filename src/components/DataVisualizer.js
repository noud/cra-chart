import React from 'react';

import MyChart from './MyChart';
import MyTable from './MyTable';

import getRemainer from '../lib/getRemainer';
import setRemainer from '../lib/setRemainer';

const labels = [
  'Noud',
  'Balder',
];

class DataVisualizer extends React.Component {
  constructor(props) {
    super(props);
    const data = [40, 45];
    data.push(getRemainer(data));
    this.state = {data: data};
  }

  handleChange(value) {
    var data = this.state.data;
    data[parseInt(value.name)] = parseInt(value.value);
    data = setRemainer(data);
    this.setState({data});
  };

  render() {
    return (
      <div>
        <MyChart labels={labels} data={this.state.data}/>
        <br />
        <MyTable labels={labels} data={this.state.data} onChange={(e) => this.handleChange(e.target)}/>
      </div>
    );
  }
}

export default DataVisualizer;