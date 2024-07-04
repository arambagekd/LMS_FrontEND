
import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { title } from 'process';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = (props) => {
  const { title } = props;
  const transformedData = props.data.map(item => ({
    label: item.day,
    y: item.y
  }));

  const options = {
    title: {
      text: title
    },
    data: [{
      type: "column",
      dataPoints: transformedData
    }]
  };
  
  return (
    <div style={{width:600,height:350 ,marginBottom:40}}>
      <CanvasJSChart  options={options} />
    </div>
  );
};

export default BarChart;
