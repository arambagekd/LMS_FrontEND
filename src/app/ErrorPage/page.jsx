import React from 'react'
import { Button, Result } from 'antd';
import Link from 'next/link';

function page() {
  return (
    <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link href="/"><Button type="primary">Back Home</Button></Link>}
  />
  )
}

export default page