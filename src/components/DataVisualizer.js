import React from 'react';
import MyChart from './MyChart';

const data = [40, 45];

function DataVisualizer() {
  return (
    <div>
      <MyChart data={data}/>
    </div>
  );
}

export default DataVisualizer;