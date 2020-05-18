import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const free = {
  color: 'gray',
  label: 'free'
};

export const ChartAndFormContext = React.createContext({
  labels: [],
  datasets: [{
    data: [],
    tableData: [],
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
  }],
  handleChange: (enriche, state, value) => {},
  enriche: (state) => {},
});