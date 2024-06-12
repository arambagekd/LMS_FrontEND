import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page




// 'use client'
// import { Button, Form, Input } from 'antd'
// import React, { useEffect } from 'react'
// import { getFirebaseToken, onMessageListener } from './firebase-config';

// function page() {
//     useEffect(() => {
//         const fetchToken = async () => {
//           const token = await getFirebaseToken();
//           console.log(token);
//         };
    
//         fetchToken();
    
//     onMessageListener()
//           .then((payload) => {
//             console.log('Message received. ', payload);
//           })
//           .catch((err) => console.log('Failed to receive message. ', err));
//       }, []);

//   return (
//     <div>
//         <Form>
//         <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the notification description!' }]}>
//           <Input></Input>
//           <Button>submit</Button>
//         </Form.Item>
//         </Form>
//     </div>
//   )
// }

// export default page