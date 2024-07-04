import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import React from 'react'
import { Chart } from "react-google-charts";



export default function Userreport({ data }) {

   const rep = [
    ["Book Type", "Quantity"],
    ["Free", data.free],
    ["Loan", data.loan],
    //["Others", 7],
  ];

  const options = {
      title: "Users Quantity "+ data.total ,
     };
  return (
    <div>
    <Chart
      chartType="PieChart"
      data={rep}
      options={options}
      width={"800px"}
      height={"450px"}
    />
    
    </div>
  )
}





