import React from 'react';
import MyChart from './MyChart';

const data = [40, 45, 5];

function DataVisualizer() {
  return (
    <div>
      <MyChart data={data}/>
    </div>
  );
}

export default DataVisualizer;