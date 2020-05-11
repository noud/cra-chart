import React from 'react';
import MyChart from './MyChart';
import MyTable from './MyTable';

const labels = [
  'Noud',
  'Balder',
];

const data = [40, 45];

function DataVisualizer() {
  return (
    <div>
      <MyChart labels={labels} data={data}/>
      <br />
      <MyTable labels={labels} data={data}/>
    </div>
  );
}

export default DataVisualizer;