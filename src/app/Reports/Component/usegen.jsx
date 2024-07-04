import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import { Button } from 'antd';
import React from 'react'
import { Chart } from "react-google-charts";



export default function Usegen({ data }) {




  const options = {
      title: "BOOK Types Quantity " ,
     };
  return (
    <div>
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"800px"}
      height={"450px"}
    />
    </div>
  )
}




