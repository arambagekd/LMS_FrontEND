'use client'

import React from 'react';
import { Line } from '@ant-design/plots';
import { Card } from 'antd';




function Chart(props) {
  const data = props.data
  const config = {
    data,
    height:250,
    xField: 'day',
    yField: 'y',
    xAxis: {
      type: 'timeCat',
      tickCount: 2,
    },
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };


return (
  <div >
    <Card >

      <center>
        <h4>{props.topic}</h4>
        <Line  {...config} />
      </center>
    </Card>
  </div>
)
}

export default Chart



