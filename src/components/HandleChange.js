import { cloneDeep } from 'lodash';
import React from 'react';

import { connect } from 'react-redux'
import handleChange from '../redux/actions'

// import getRemainer from '../lib/getRemainer';
import setRemainer from '../lib/setRemainer';

class HandleChange extends React.Component {
  // ... component implementation

  handleChange(enriche, state, value) {
    console.log('handleChange', state, value);
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

  enriche(state) {
    // @todo improve
    // return state
    const { datasets: values, labels } = state;
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
}

export default connect(
  null,
  { handleChange }
)(HandleChange)