import View from "@/app/Resources/View";
import { Button, Collapse, Flex } from "antd";
import Link from "next/link";
import React from "react";

function CollapseCard({ shelfNo, cupboardId }) {
  return (
    <>
      <Collapse
        items={[
          {
            key: "1",
            extra:<Button onClick={(e)=>e.stopPropagation()}><Link href={`/Resources/AddResources?cupboardId=${cupboardId}&shelfNo=${shelfNo}`}>Add a Book</Link></Button>,
            label: (
              <Flex align="center" justify="space-between">
                <div>Shelf - {shelfNo}</div>
                
              </Flex>
            ),
            children: (
              <>
                <View location={cupboardId + "-" + shelfNo} />
              </>
            ),
          },
        ]}
      />
      <br />
    </>
  );
}

export default CollapseCard;
